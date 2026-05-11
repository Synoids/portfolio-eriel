const si = require('react-icons/si');
Object.keys(si).forEach(key => {
  if (key.toLowerCase().includes('css') || key.toLowerCase().includes('visual') || key.toLowerCase().includes('code')) {
    console.log(key);
  }
});
