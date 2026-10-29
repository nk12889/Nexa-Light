const fs = require("fs");
let js = fs.readFileSync("admin/admin.js", "utf8");

const uploadFunc = `
window.uploadImageToServer = async function(inputElement, targetInputId) {
    const file = inputElement.files[0];
    if (!file) return;
    const targetInput = document.getElementById(targetInputId);
    const origVal = targetInput.value;
    targetInput.value = "Uploading...";
    const formData = new FormData();
    formData.append("image", file);
    try {
        const res = await fetch("/api/upload.php", { method: "POST", body: formData });
        const data = await res.json();
        if (data.success) {
            targetInput.value = data.url;
            targetInput.dispatchEvent(new Event("change"));
            showToast("Image uploaded successfully!");
        } else {
            targetInput.value = origVal;
            showToast(data.error || "Upload failed", "error");
        }
    } catch (e) { targetInput.value = origVal; showToast("Network error", "error"); }
};
`;

// Only add if not present
if (!js.includes("window.uploadImageToServer =")) {
    js = js.replace("window.handleLogin =", uploadFunc + "\nwindow.handleLogin =");
} else {
    // Replace existing if any
    js = js.replace(/window\.uploadImageToServer = async function[\s\S]*?\};\n/, uploadFunc);
}

// Fix Gallery Image Input
const newGalleryHTML = `
                    <div>
                        <label class="block text-xs font-semibold uppercase tracking-widest text-secondary mb-2">Main Image (Upload or Paste URL)</label>
                        <div class="flex gap-2">
                            <input type="text" id="g-image" value="\${g.image}" required placeholder="/uploads/img.jpg" class="flex-1 bg-surfaceLight border border-black/10 rounded-lg px-4 py-3 text-sm focus:border-primary transition-colors">
                            <label class="cursor-pointer bg-primary text-white px-4 py-3 rounded-lg text-sm font-medium hover:bg-black/80 transition-colors flex items-center justify-center">
                                Upload File
                                <input type="file" class="hidden" accept="image/*" onchange="uploadImageToServer(this, 'g-image')">
                            </label>
                        </div>
                    </div>`;

// Replace from <div> before g-image to the closing </div>
js = js.replace(/<div>\s*<label class="block text-xs font-semibold uppercase tracking-widest text-secondary mb-2">Main Image .*?<\/label>[\s\S]*?id="g-image"[\s\S]*?<\/div>/, newGalleryHTML.trim());

// Fix Blog Image Input
const newBlogHTML = `
                    <div>
                        <label class="block text-xs font-semibold uppercase tracking-widest text-secondary mb-2">Main Image (Upload or Paste URL)</label>
                        <div class="flex gap-2">
                            <input type="text" id="b-image" value="\${b.image}" required placeholder="/uploads/blog1.jpg" class="flex-1 bg-surfaceLight border border-black/10 rounded-lg px-4 py-3 text-sm focus:border-primary transition-colors">
                            <label class="cursor-pointer bg-primary text-white px-4 py-3 rounded-lg text-sm font-medium hover:bg-black/80 transition-colors flex items-center justify-center">
                                Upload File
                                <input type="file" class="hidden" accept="image/*" onchange="uploadImageToServer(this, 'b-image')">
                            </label>
                        </div>
                    </div>`;

js = js.replace(/<div>\s*<label class="block text-xs font-semibold uppercase tracking-widest text-secondary mb-2">Main Image URL \(Hostinger uploads\/\)<\/label>[\s\S]*?id="b-image"[\s\S]*?<\/div>/, newBlogHTML.trim());

// Fix Product Image Input
const oldProdInput = `
                const input = document.createElement('input');
                input.type = 'text';
                input.className = 'w-full bg-surfaceLight border border-black/10 rounded-lg px-4 py-2 text-sm focus:border-primary transition-colors';
                input.value = img;
                input.placeholder = i === 0 ? 'Hero Image URL' : 'Gallery Image URL';
                input.onchange = (e) => updateImageValue(i, e.target.value);
                
                const removeBtn = document.createElement('button');
`;

const newProdInput = `
                const inputWrapperDiv = document.createElement('div');
                inputWrapperDiv.className = 'flex gap-2 flex-1';

                const input = document.createElement('input');
                input.type = 'text';
                input.id = 'prod-img-' + i;
                input.className = 'flex-1 bg-surfaceLight border border-black/10 rounded-lg px-4 py-2 text-sm focus:border-primary transition-colors';
                input.value = img;
                input.placeholder = i === 0 ? 'Hero Image URL' : 'Gallery Image URL';
                input.onchange = (e) => updateImageValue(i, e.target.value);
                
                const uploadBtn = document.createElement('label');
                uploadBtn.className = 'cursor-pointer bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-black/80 transition-colors flex items-center justify-center m-0';
                uploadBtn.innerHTML = 'Upload <input type="file" class="hidden" accept="image/*" onchange="uploadImageToServer(this, \\'prod-img-' + i + '\\')">';
                
                inputWrapperDiv.appendChild(input);
                inputWrapperDiv.appendChild(uploadBtn);

                const removeBtn = document.createElement('button');
`;

js = js.replace(oldProdInput, newProdInput);
js = js.replace(/wrapper\.appendChild\(input\);/g, "wrapper.appendChild(inputWrapperDiv);");

fs.writeFileSync("admin/admin.js", js);
console.log("Successfully wired up the UI!");
