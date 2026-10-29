const fs = require("fs");
let js = fs.readFileSync("admin/admin.js", "utf8");

const renderGalleryAndBlogs = `
    else if (tabName === "gallery") {
        const galList = Object.values(galleryData);
        container.innerHTML = \`
            <div class="flex flex-col md:flex-row justify-between md:items-end mb-8 gap-4">
                <div>
                    <h2 class="text-3xl font-medium tracking-tight">Gallery Management</h2>
                    <p class="text-secondary mt-1">Manage project installations.</p>
                </div>
                <div class="flex items-center gap-3">
                    <button onclick="openGalleryModal()" class="bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-black/80 transition-colors shadow-md flex items-center gap-2">
                        <span>+ Add Gallery Project</span>
                    </button>
                </div>
            </div>
            <div class="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden overflow-x-auto">
                <table class="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                        <tr class="bg-surfaceLight/50 text-[10px] uppercase tracking-widest text-secondary border-b border-black/5">
                            <th class="px-6 py-4 font-semibold">Project Title</th>
                            <th class="px-6 py-4 font-semibold">Location</th>
                            <th class="px-6 py-4 font-semibold">Category</th>
                            <th class="px-6 py-4 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        \${galList.map(g => \`
                            <tr class="border-b border-black/5 hover:bg-black/[0.02] transition-colors group">
                                <td class="px-6 py-4 font-medium text-sm flex items-center gap-3">
                                    <img src="\${g.image}" class="w-10 h-10 rounded bg-surface object-cover">
                                    <span>\${g.title}</span>
                                </td>
                                <td class="px-6 py-4 text-sm text-secondary">\${g.location} (\${g.year})</td>
                                <td class="px-6 py-4 text-sm text-secondary">\${g.category}</td>
                                <td class="px-6 py-4 text-right">
                                    <button onclick="openGalleryModal('\${g.id}')" class="text-primary hover:text-accent p-2">Edit</button>
                                    <button onclick="deleteGallery('\${g.id}')" class="text-red-400 hover:text-red-600 p-2">Delete</button>
                                </td>
                            </tr>
                        \`).join("")}
                        \${galList.length === 0 ? \`<tr><td colspan="4" class="p-8 text-center text-secondary">No gallery projects found.</td></tr>\` : ""}
                    </tbody>
                </table>
            </div>
        \`;
    }
    else if (tabName === "blogs") {
        const blogList = Object.values(blogsData);
        container.innerHTML = \`
            <div class="flex flex-col md:flex-row justify-between md:items-end mb-8 gap-4">
                <div>
                    <h2 class="text-3xl font-medium tracking-tight">Studio Journal</h2>
                    <p class="text-secondary mt-1">Manage blog articles.</p>
                </div>
                <div class="flex items-center gap-3">
                    <button onclick="openBlogModal()" class="bg-primary text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-black/80 transition-colors shadow-md flex items-center gap-2">
                        <span>+ Add Article</span>
                    </button>
                </div>
            </div>
            <div class="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden overflow-x-auto">
                <table class="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                        <tr class="bg-surfaceLight/50 text-[10px] uppercase tracking-widest text-secondary border-b border-black/5">
                            <th class="px-6 py-4 font-semibold">Article Title</th>
                            <th class="px-6 py-4 font-semibold">Author</th>
                            <th class="px-6 py-4 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        \${blogList.map(b => \`
                            <tr class="border-b border-black/5 hover:bg-black/[0.02] transition-colors group">
                                <td class="px-6 py-4 font-medium text-sm flex items-center gap-3">
                                    <img src="\${b.image}" class="w-10 h-10 rounded bg-surface object-cover">
                                    <span>\${b.title}</span>
                                </td>
                                <td class="px-6 py-4 text-sm text-secondary">\${b.author}</td>
                                <td class="px-6 py-4 text-right">
                                    <button onclick="openBlogModal('\${b.id}')" class="text-primary hover:text-accent p-2">Edit</button>
                                    <button onclick="deleteBlog('\${b.id}')" class="text-red-400 hover:text-red-600 p-2">Delete</button>
                                </td>
                            </tr>
                        \`).join("")}
                        \${blogList.length === 0 ? \`<tr><td colspan="3" class="p-8 text-center text-secondary">No articles found.</td></tr>\` : ""}
                    </tbody>
                </table>
            </div>
        \`;
    }
`;

const renderIdx = js.indexOf("function renderTabContent(tabName) {");
const nextFuncIdx = js.indexOf("function filterAdminTable(query) {");
const endOfRender = js.lastIndexOf("}", nextFuncIdx);

js = js.substring(0, endOfRender) + renderGalleryAndBlogs + js.substring(endOfRender);

const newCrud = `
window.openGalleryModal = function(id = "") {
    const isEdit = !!id;
    const g = isEdit ? galleryData[id] : { id: "", title: "", desc: "", location: "", year: "", category: "Facade & Exterior", product: "", specs: "", image: "" };
    
    const container = document.getElementById("admin-main-content");
    container.innerHTML = \`
        <div class="max-w-3xl mx-auto">
            <button type="button" onclick="switchTab('gallery')" class="text-secondary hover:text-primary mb-6 flex items-center gap-2 text-sm font-semibold transition-colors">← Back to Gallery</button>
            <div class="bg-white p-8 rounded-2xl shadow-sm border border-black/5">
                <h2 class="text-2xl font-medium tracking-tight mb-8">\${isEdit ? "Edit Gallery Project" : "New Gallery Project"}</h2>
                <form onsubmit="saveGallery(event, \${isEdit})" class="space-y-6">
                    <div>
                        <label class="block text-xs font-semibold uppercase tracking-widest text-secondary mb-2">Project ID (Unique slug)</label>
                        <input type="text" id="g-id" value="\${g.id}" \${isEdit ? "disabled" : ""} required class="w-full bg-surfaceLight border border-black/10 rounded-lg px-4 py-3 text-sm focus:border-primary transition-colors">
                    </div>
                    <div>
                        <label class="block text-xs font-semibold uppercase tracking-widest text-secondary mb-2">Project Title</label>
                        <input type="text" id="g-title" value="\${g.title}" required class="w-full bg-surfaceLight border border-black/10 rounded-lg px-4 py-3 text-sm focus:border-primary transition-colors">
                    </div>
                    <div class="grid grid-cols-2 gap-6">
                        <div>
                            <label class="block text-xs font-semibold uppercase tracking-widest text-secondary mb-2">Location</label>
                            <input type="text" id="g-location" value="\${g.location}" required class="w-full bg-surfaceLight border border-black/10 rounded-lg px-4 py-3 text-sm focus:border-primary transition-colors">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold uppercase tracking-widest text-secondary mb-2">Year</label>
                            <input type="text" id="g-year" value="\${g.year}" required class="w-full bg-surfaceLight border border-black/10 rounded-lg px-4 py-3 text-sm focus:border-primary transition-colors">
                        </div>
                    </div>
                    <div>
                        <label class="block text-xs font-semibold uppercase tracking-widest text-secondary mb-2">Category</label>
                        <select id="g-cat" class="w-full bg-surfaceLight border border-black/10 rounded-lg px-4 py-3 text-sm focus:border-primary transition-colors">
                            <option value="Facade & Exterior" \${g.category === "Facade & Exterior" ? "selected" : ""}>Facade & Exterior</option>
                            <option value="Landscape & Public Space" \${g.category === "Landscape & Public Space" ? "selected" : ""}>Landscape & Public Space</option>
                            <option value="Indoor Luxury" \${g.category === "Indoor Luxury" ? "selected" : ""}>Indoor Luxury</option>
                            <option value="Fiber Optic Immersive" \${g.category === "Fiber Optic Immersive" ? "selected" : ""}>Fiber Optic Immersive</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-xs font-semibold uppercase tracking-widest text-secondary mb-2">Main Image URL (Hostinger uploads/ folder)</label>
                        <input type="text" id="g-image" value="\${g.image}" required placeholder="e.g. /uploads/gallery1.jpg" class="w-full bg-surfaceLight border border-black/10 rounded-lg px-4 py-3 text-sm focus:border-primary transition-colors">
                    </div>
                    <div>
                        <label class="block text-xs font-semibold uppercase tracking-widest text-secondary mb-2">Description</label>
                        <textarea id="g-desc" rows="3" required class="w-full bg-surfaceLight border border-black/10 rounded-lg px-4 py-3 text-sm focus:border-primary transition-colors">\${g.desc}</textarea>
                    </div>
                    <div class="grid grid-cols-2 gap-6">
                        <div>
                            <label class="block text-xs font-semibold uppercase tracking-widest text-secondary mb-2">Product Specified</label>
                            <input type="text" id="g-product" value="\${g.product}" required class="w-full bg-surfaceLight border border-black/10 rounded-lg px-4 py-3 text-sm focus:border-primary transition-colors">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold uppercase tracking-widest text-secondary mb-2">Product Specs (Short)</label>
                            <input type="text" id="g-specs" value="\${g.specs}" class="w-full bg-surfaceLight border border-black/10 rounded-lg px-4 py-3 text-sm focus:border-primary transition-colors">
                        </div>
                    </div>
                    <div class="flex justify-end gap-3 pt-6 border-t border-black/5 mt-8">
                        <button type="button" onclick="switchTab('gallery')" class="px-6 py-3 rounded-lg text-sm font-semibold text-secondary bg-white border border-black/10 hover:bg-gray-50 transition-colors">Cancel</button>
                        <button type="submit" class="px-6 py-3 rounded-lg text-sm font-semibold text-white bg-primary hover:bg-black/80 transition-colors">Save Project</button>
                    </div>
                </form>
            </div>
        </div>
    \`;
};

window.saveGallery = async function(e, isEdit) {
    e.preventDefault();
    const id = document.getElementById("g-id").value.trim().toLowerCase().replace(/\\s+/g, "-");
    const data = {
        id: id,
        title: document.getElementById("g-title").value.trim(),
        location: document.getElementById("g-location").value.trim(),
        year: document.getElementById("g-year").value.trim(),
        category: document.getElementById("g-cat").value,
        image: document.getElementById("g-image").value.trim(),
        desc: document.getElementById("g-desc").value.trim(),
        product: document.getElementById("g-product").value.trim(),
        specs: document.getElementById("g-specs").value.trim()
    };
    try {
        await setDoc(doc(db, "gallery", id), data);
        showToast("Gallery Project saved!");
        loadDatabase();
    } catch(err) { showToast("Error saving", "error"); }
};

window.deleteGallery = async function(id) {
    if(confirm("Delete gallery project?")) {
        try {
            await deleteDoc(doc(db, "gallery", id));
            showToast("Project deleted");
            loadDatabase();
        } catch(err) { showToast("Error", "error"); }
    }
};

window.openBlogModal = function(id = "") {
    const isEdit = !!id;
    const b = isEdit ? blogsData[id] : { id: "", title: "", excerpt: "", content: "", author: "", authorAvatar: "", readTime: "", date: "", image: "", tags: [] };
    
    const container = document.getElementById("admin-main-content");
    container.innerHTML = \`
        <div class="max-w-3xl mx-auto">
            <button type="button" onclick="switchTab('blogs')" class="text-secondary hover:text-primary mb-6 flex items-center gap-2 text-sm font-semibold transition-colors">← Back to Blogs</button>
            <div class="bg-white p-8 rounded-2xl shadow-sm border border-black/5">
                <h2 class="text-2xl font-medium tracking-tight mb-8">\${isEdit ? "Edit Article" : "New Article"}</h2>
                <form onsubmit="saveBlog(event, \${isEdit})" class="space-y-6">
                    <div>
                        <label class="block text-xs font-semibold uppercase tracking-widest text-secondary mb-2">Article ID (Unique slug)</label>
                        <input type="text" id="b-id" value="\${b.id}" \${isEdit ? "disabled" : ""} required class="w-full bg-surfaceLight border border-black/10 rounded-lg px-4 py-3 text-sm focus:border-primary transition-colors">
                    </div>
                    <div>
                        <label class="block text-xs font-semibold uppercase tracking-widest text-secondary mb-2">Article Title</label>
                        <input type="text" id="b-title" value="\${b.title}" required class="w-full bg-surfaceLight border border-black/10 rounded-lg px-4 py-3 text-sm focus:border-primary transition-colors">
                    </div>
                    <div>
                        <label class="block text-xs font-semibold uppercase tracking-widest text-secondary mb-2">Main Image URL (Hostinger uploads/)</label>
                        <input type="text" id="b-image" value="\${b.image}" required placeholder="/uploads/blog1.jpg" class="w-full bg-surfaceLight border border-black/10 rounded-lg px-4 py-3 text-sm focus:border-primary transition-colors">
                    </div>
                    <div class="grid grid-cols-2 gap-6">
                        <div>
                            <label class="block text-xs font-semibold uppercase tracking-widest text-secondary mb-2">Author Name</label>
                            <input type="text" id="b-author" value="\${b.author}" required class="w-full bg-surfaceLight border border-black/10 rounded-lg px-4 py-3 text-sm focus:border-primary transition-colors">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold uppercase tracking-widest text-secondary mb-2">Author Avatar URL</label>
                            <input type="text" id="b-avatar" value="\${b.authorAvatar}" required class="w-full bg-surfaceLight border border-black/10 rounded-lg px-4 py-3 text-sm focus:border-primary transition-colors">
                        </div>
                    </div>
                    <div class="grid grid-cols-2 gap-6">
                        <div>
                            <label class="block text-xs font-semibold uppercase tracking-widest text-secondary mb-2">Publish Date</label>
                            <input type="text" id="b-date" value="\${b.date}" placeholder="Oct 12, 2026" required class="w-full bg-surfaceLight border border-black/10 rounded-lg px-4 py-3 text-sm focus:border-primary transition-colors">
                        </div>
                        <div>
                            <label class="block text-xs font-semibold uppercase tracking-widest text-secondary mb-2">Read Time</label>
                            <input type="text" id="b-read" value="\${b.readTime}" placeholder="6 MIN READ" required class="w-full bg-surfaceLight border border-black/10 rounded-lg px-4 py-3 text-sm focus:border-primary transition-colors">
                        </div>
                    </div>
                    <div>
                        <label class="block text-xs font-semibold uppercase tracking-widest text-secondary mb-2">Tags (Comma separated)</label>
                        <input type="text" id="b-tags" value="\${(b.tags||[]).join(", ")}" required class="w-full bg-surfaceLight border border-black/10 rounded-lg px-4 py-3 text-sm focus:border-primary transition-colors">
                    </div>
                    <div>
                        <label class="block text-xs font-semibold uppercase tracking-widest text-secondary mb-2">Excerpt (Short description)</label>
                        <textarea id="b-excerpt" rows="2" required class="w-full bg-surfaceLight border border-black/10 rounded-lg px-4 py-3 text-sm focus:border-primary transition-colors">\${b.excerpt}</textarea>
                    </div>
                    <div>
                        <label class="block text-xs font-semibold uppercase tracking-widest text-secondary mb-2">Full Content (HTML/Markdown support)</label>
                        <textarea id="b-content" rows="6" required class="w-full bg-surfaceLight border border-black/10 rounded-lg px-4 py-3 text-sm focus:border-primary transition-colors">\${b.content}</textarea>
                    </div>
                    <div class="flex justify-end gap-3 pt-6 border-t border-black/5 mt-8">
                        <button type="button" onclick="switchTab('blogs')" class="px-6 py-3 rounded-lg text-sm font-semibold text-secondary bg-white border border-black/10 hover:bg-gray-50 transition-colors">Cancel</button>
                        <button type="submit" class="px-6 py-3 rounded-lg text-sm font-semibold text-white bg-primary hover:bg-black/80 transition-colors">Save Article</button>
                    </div>
                </form>
            </div>
        </div>
    \`;
};

window.saveBlog = async function(e, isEdit) {
    e.preventDefault();
    const id = document.getElementById("b-id").value.trim().toLowerCase().replace(/\\s+/g, "-");
    const data = {
        id: id,
        title: document.getElementById("b-title").value.trim(),
        image: document.getElementById("b-image").value.trim(),
        author: document.getElementById("b-author").value.trim(),
        authorAvatar: document.getElementById("b-avatar").value.trim(),
        date: document.getElementById("b-date").value.trim(),
        readTime: document.getElementById("b-read").value.trim(),
        tags: document.getElementById("b-tags").value.split(",").map(s => s.trim()).filter(Boolean),
        excerpt: document.getElementById("b-excerpt").value.trim(),
        content: document.getElementById("b-content").value.trim()
    };
    try {
        await setDoc(doc(db, "blogs", id), data);
        showToast("Blog Article saved!");
        loadDatabase();
    } catch(err) { showToast("Error saving", "error"); }
};

window.deleteBlog = async function(id) {
    if(confirm("Delete blog article?")) {
        try {
            await deleteDoc(doc(db, "blogs", id));
            showToast("Article deleted");
            loadDatabase();
        } catch(err) { showToast("Error", "error"); }
    }
};

window.openGalleryModal = openGalleryModal;
window.saveGallery = saveGallery;
window.deleteGallery = deleteGallery;
window.openBlogModal = openBlogModal;
window.saveBlog = saveBlog;
window.deleteBlog = deleteBlog;
`;

js += "\n" + newCrud;
fs.writeFileSync("admin/admin.js", js);
console.log("Success");
