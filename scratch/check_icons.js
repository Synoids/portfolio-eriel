const si = require('react-icons/si');
const icons = ['SiCss3', 'SiVisualstudiocode', 'SiHtml5', 'SiJavascript', 'SiTypescript', 'SiNextdotjs', 'SiReact', 'SiTailwindcss', 'SiPhp', 'SiLaravel', 'SiMysql', 'SiPostgresql', 'SiGit', 'SiGithub', 'SiFigma'];
icons.forEach(icon => {
  console.log(`${icon}: ${si[icon] ? 'Found' : 'NOT FOUND'}`);
});
