
const fs = require('fs');
const uiFile = fs.readFileSync('app/admin/monitoring/actions.ts', 'utf-8');
console.log('UI Actions file snippet:');
console.log(uiFile.substring(0, 300));

