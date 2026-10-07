const fs=require('fs');fs.mkdirSync('dist',{recursive:true});
const calc=fs.readFileSync('src/calc.js','utf8').replace(/if \(typeof module[^\n]*\n?/,'');
fs.writeFileSync('dist/index.html',fs.readFileSync('src/app.template.html','utf8').replace('/*CALC*/',()=>calc));
for(const f of ['manifest.webmanifest','sw.js','icon.svg'])fs.copyFileSync('public/'+f,'dist/'+f);console.log('built dist/index.html');
