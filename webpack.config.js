// webpack.config.js

const path = require('path');

module.exports = {
  entry: './src/index.js', // Entry point for your app (adjust if necessary)
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js', // Output file name
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Transpile JavaScript and JSX files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i, // Image files
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]', // Keep the original file structure and name
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Allow importing JS and JSX files without specifying the extension
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'), // Serve content from the 'dist' directory
    compress: true,
    port: 9000, // Port for the dev server
  },
  mode: 'development', // Set to 'production' for production builds
};
