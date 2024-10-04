const path = require('path');

module.exports = {
  entry: './src/index.ts', // Asegúrate de que la ruta sea correcta
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          'to-string-loader', // Convierte el CSS en una cadena de texto
          'css-loader',       // Resuelve las dependencias de CSS
        ],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
