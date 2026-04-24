const fs = require('fs');
const file = 'src/components/home/ProgramsSection.jsx';
const content = fs.readFileSync(file, 'utf8');
const lines = content.split('\n');
// We drop the first 18 lines which contain the HEAD conflict marker and old emojis
const fixed = lines.slice(18).join('\n');
fs.writeFileSync(file, fixed);
console.log('Successfully resolved merge conflict in ProgramsSection.jsx');
