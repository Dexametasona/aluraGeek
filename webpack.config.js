const path = require('path');

module.exports = {
  entry: './src/index.js', // Archivo de entrada principal
  output: {
    filename: 'main.js', // Nombre del archivo de salida
    path: path.resolve(__dirname, 'dist'), // Carpeta de salida
  },
  devtool:"inline-source-map",
  mode: 'development',
};
