const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8080;

// Lista de carpetas posibles donde NetBeans guarda los archivos web
const possibleFolders = [
  __dirname,
  path.join(__dirname, 'Site Root'),
  path.join(__dirname, 'public_html'),
  path.join(__dirname, 'web'),
  path.join(__dirname, 'www')
];

// Encuentra la carpeta que contenga index.html
let staticDir = __dirname;
for (const folder of possibleFolders) {
  if (fs.existsSync(path.join(folder, 'index.html'))) {
    staticDir = folder;
    break;
  }
}

// Servir archivos estáticos (CSS, JS, imágenes)
app.use(express.static(staticDir));

// Servir el index.html principal
app.get('*', (req, res) => {
  const indexPath = path.join(staticDir, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('index.html no encontrado.');
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
