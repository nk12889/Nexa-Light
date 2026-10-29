const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

function replaceAll(str, find, replace) {
  return str.split(find).join(replace);
}

// Global Replaces to fix colors
html = replaceAll(html, 'text-4xl md:text-[6rem] font-bold tracking-tighter text-white leading-none uppercase\">Architectural<br>Disciplines.', 'text-4xl md:text-[6rem] font-bold tracking-tighter text-primary leading-none uppercase\">Architectural<br>Disciplines.');
html = replaceAll(html, '<h2 class=\"text-4xl md:text-[5rem] font-bold tracking-tighter text-white leading-none uppercase\">Technical<br>Instruments.</h2>', '<h2 class=\"text-4xl md:text-[5rem] font-bold tracking-tighter text-primary leading-none uppercase\">Technical<br>Instruments.</h2>');
html = replaceAll(html, '<a href=\"/products\" class=\"text-xs md:text-sm font-bold uppercase tracking-widest text-accent border-b border-accent pb-1 route-link\">Master Inventory</a>', '<a href=\"/products\" class=\"text-xs md:text-sm font-bold uppercase tracking-widest text-primary border-b border-primary pb-1 route-link\">Master Inventory</a>');
html = replaceAll(html, 'border-white/10', 'border-black/10');
html = replaceAll(html, 'border border-white/5', 'border border-black/5');
html = replaceAll(html, 'border-b border-white/5', 'border-b border-black/5');
html = replaceAll(html, 'border-r border-white/5', 'border-r border-black/5');
html = replaceAll(html, 'hover:border-white/10', 'hover:border-black/10');

// Products heading
html = replaceAll(html, 'class=\"text-5xl md:text-[9.5rem] font-bold tracking-tighter mb-6 anim-title text-white uppercase leading-[0.8]\"><span>Performance<br>Database.</span>', 'class=\"text-5xl md:text-[9.5rem] font-bold tracking-tighter mb-6 anim-title text-primary uppercase leading-[0.8]\"><span>Performance<br>Database.</span>');
// Products search text
html = replaceAll(html, 'placeholder:text-white/20', 'placeholder:text-secondary');
html = replaceAll(html, 'bg-white/5 text-white', 'bg-black/5 text-primary');
html = replaceAll(html, 'hover:bg-white/5', 'hover:bg-black/5');
html = replaceAll(html, '<span class=\"text-[10px] bg-white/5 border border-white/5', '<span class=\"text-[10px] bg-black/5 border border-black/5');

// Navigation mode
html = replaceAll(html, 'class=\"fixed w-full top-0 z-[60] glass-nav translate-y-[-100%] dark-mode\"', 'class=\"fixed w-full top-0 z-[60] glass-nav translate-y-[-100%]\"');

fs.writeFileSync('index.html', html);
