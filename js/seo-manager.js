import { db, doc, getDoc } from "../supabase-init.js";

window.updateSEOMeta = async function(customPath) {
    try {
        let path = customPath || window.location.pathname;
        let pageId = 'home';
        let isProduct = false;

        const cleanPath = path.split('?')[0];

        if (cleanPath === '/' || cleanPath === '/index.html') {
            pageId = 'home';
        } else if (cleanPath.startsWith('/product/')) {
            pageId = cleanPath.split('/product/')[1];
            isProduct = true;
        } else {
            let segment = cleanPath.split('/').pop().split('.')[0];
            if (segment) {
                pageId = segment;
            }
        }

        let data = null;

        if (isProduct && pageId) {
            const prodRef = doc(db, "products", pageId);
            const prodSnap = await getDoc(prodRef);
            if (prodSnap.exists()) {
                const p = prodSnap.data();
                data = {
                    title: p.seoTitle || p.name || 'NexaLight Product',
                    description: p.seoDesc || p.desc || ''
                };
            }
        } else {
            const docRef = doc(db, "seo_settings", pageId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                data = docSnap.data();
            }
        }

        if (data) {
            if (data.title) {
                document.title = data.title;
                const ogTitle = document.querySelector('meta[property="og:title"]');
                if (ogTitle) ogTitle.setAttribute('content', data.title);

                const twTitle = document.querySelector('meta[name="twitter:title"]');
                if (twTitle) twTitle.setAttribute('content', data.title);
            }

            if (data.description) {
                let metaDesc = document.querySelector('meta[name="description"]');
                if (!metaDesc) {
                    metaDesc = document.createElement('meta');
                    metaDesc.name = "description";
                    document.head.appendChild(metaDesc);
                }
                metaDesc.setAttribute('content', data.description);

                const ogDesc = document.querySelector('meta[property="og:description"]');
                if (ogDesc) ogDesc.setAttribute('content', data.description);

                const twDesc = document.querySelector('meta[name="twitter:description"]');
                if (twDesc) twDesc.setAttribute('content', data.description);
            }
        }
    } catch (err) {
        console.error("Error fetching SEO metadata:", err);
    }
}

// Initial run
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.updateSEOMeta());
} else {
    window.updateSEOMeta();
}
