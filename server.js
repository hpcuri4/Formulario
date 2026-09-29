const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;

// Busca la carpeta donde está index.html (raíz, public_html, web, etc.)
function findPublicDir(dir) {
  if (fs.existsSync(path.join(dir, 'index.html'))) {
    return dir;
  }
  const subdirs = fs.readdirSync(dir, { withFileTypes: true })
                    .filter(d => d.isDirectory() && d.name !== 'node_modules' && !d.name.startsWith('.'));
  for (const subdir of subdirs) {
    const found = findPublicDir(path.join(dir, subdir.name));
    if (found) return found;
  }
  return dir;
}

const staticDir = findPublicDir(__dirname);

app.use(express.static(staticDir));

app.get('*', (req, res) => {
  const indexPath = path.join(staticDir, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.send('index.html no encontrado.');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor iniciado en puerto ${PORT}`);
});
