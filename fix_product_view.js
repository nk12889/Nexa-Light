const fs = require('fs');

function replaceAll(str, find, replace) {
  return str.split(find).join(replace);
}

let html = fs.readFileSync('index.html', 'utf8');

// Find the start of generateProductView block
let startIndex = html.indexOf('function generateProductView(productId) {');
if (startIndex !== -1) {
  let before = html.substring(0, startIndex);
  let block = html.substring(startIndex);
  
  // Do selective replacements only in the product view
  block = replaceAll(block, 'text-white', 'text-primary');
  block = replaceAll(block, 'border-white/5', 'border-black/5');
  block = replaceAll(block, 'hover:text-white', 'hover:text-primary');
  block = replaceAll(block, 'bg-white/5', 'bg-black/5');
  block = replaceAll(block, 'text-gray-400', 'text-secondary');
  block = replaceAll(block, 'bg-black text-white hover:bg-white hover:text-black', 'bg-primary text-white hover:bg-surface hover:text-primary'); // For any buttons
  // Inside Buy Bar
  block = replaceAll(block, 'bg-white text-black', 'bg-primary text-white'); // Inquire button contrast
  
  html = before + block;
  fs.writeFileSync('index.html', html);
  console.log('Successfully fixed generateProductView block');
} else {
  console.log('Error finding generateProductView');
}
