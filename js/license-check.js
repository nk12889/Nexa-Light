/**
 * Nexalite Remote Activation System
 *
 * Checks the central configuration endpoint to verify if the website is active.
 * If inactive, it locks the UI immediately.
 */

(function() {
    // =========================================================================
    // CONFIGURATION
    // =========================================================================
    // Replace this URL with your actual remote JSON endpoint.
    // Replace this URL with your actual remote JSON endpoint.
    const ACTIVATION_ENDPOINT = 'https://firestore.googleapis.com/v1/projects/nexa-83944/databases/(default)/documents/config/license';
    const CHECK_INTERVAL_MS = 5 * 60 * 1000; // Check every 5 minutes

    // =========================================================================
    // INTERNAL STATE & UI
    // =========================================================================
    let isLocked = false;
    let lockScreenElement = null;

    function createLockScreen() {
        if (lockScreenElement) return lockScreenElement;

        lockScreenElement = document.createElement('div');
        lockScreenElement.id = 'nexalite-activation-lock';

        // Inline styles to ensure it cannot be easily overridden by external CSS
        lockScreenElement.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background-color: #f8f8f6; /* Matching Nexalite bg */
            color: #0a0a0a; /* Matching Nexalite text */
            font-family: 'Inter', sans-serif;
            z-index: 2147483647; /* Maximum z-index */
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 2rem;
            box-sizing: border-box;
        `;

        lockScreenElement.innerHTML = `
            <div style="max-width: 600px; padding: 3rem; background: #ffffff; box-shadow: 0 20px 40px -15px rgba(0,0,0,0.05); border-radius: 12px;">
                <h1 style="font-size: 2rem; font-weight: 600; margin-bottom: 1rem; color: #0a0a0a; letter-spacing: -0.03em;">Website Temporarily Unavailable</h1>
                <h2 style="font-size: 1.25rem; font-weight: 500; margin-bottom: 2rem; color: #d4af37;">Payment Pending</h2>
                <p style="font-size: 1rem; color: #555555; line-height: 1.6; margin-bottom: 2rem;">
                    This website is currently unavailable because the project payment is pending.
                </p>
                <p style="font-size: 0.9rem; color: #555555;">
                    Please contact the website administrator to restore access.
                </p>
            </div>
        `;

        return lockScreenElement;
    }

    function applyLock() {
        if (isLocked) return;
        isLocked = true;

        // Hide the main content
        if (document.body) {
            Array.from(document.body.children).forEach(child => {
                if (child.id !== 'nexalite-activation-lock' && child.tagName !== 'SCRIPT') {
                    child.setAttribute('data-original-display', getComputedStyle(child).display);
                    child.style.display = 'none';
                }
            });
            document.body.appendChild(createLockScreen());
        }
    }

    function removeLock() {
        if (!isLocked) return;
        isLocked = false;

        if (lockScreenElement && lockScreenElement.parentNode) {
            lockScreenElement.parentNode.removeChild(lockScreenElement);
        }

        if (document.body) {
            Array.from(document.body.children).forEach(child => {
                if (child.hasAttribute('data-original-display')) {
                    child.style.display = child.getAttribute('data-original-display');
                    child.removeAttribute('data-original-display');
                }
            });
        }
    }

    async function checkActivation() {
        try {
            // Constructing absolute URL if it is relative
            const url = new URL(ACTIVATION_ENDPOINT, window.location.origin + window.location.pathname);

            const response = await fetch(url.toString(), {
                method: 'GET',
                cache: 'no-store',
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                // Parse Firestore REST API structure
                const isActive = data?.fields?.active?.booleanValue;

                if (isActive === false) {
                    applyLock();
                } else {
                    removeLock();
                }
            } else if (response.status === 404) {
                // If document doesn't exist yet, assume unlocked
                removeLock();
            }
        } catch (error) {
            // If the endpoint is unreachable, fail open (do not lock)
            console.warn('Activation check failed.', error);
        }
    }

    // =========================================================================
    // INITIALIZATION
    // =========================================================================

    // Check as soon as possible
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', checkActivation);
    } else {
        checkActivation();
    }

    // Set up periodic polling
    setInterval(checkActivation, CHECK_INTERVAL_MS);

})();
