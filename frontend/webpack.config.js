const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js', // Entry point for your application
  output: {
    filename: 'bundle.js', // The name of the bundled file
    path: path.resolve(__dirname, 'dist'), // The output directory for the bundled files
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Apply this rule to .js files
        exclude: /node_modules/, // Exclude the node_modules directory
        use: {
          loader: 'babel-loader', // Use Babel to transpile JavaScript
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], // Use the env and react presets
          },
        },
      },
      {
        test: /\.css$/, // Apply this rule to .css files
        use: ['style-loader', 'css-loader'], // Use style-loader and css-loader to handle CSS files
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, // Apply this rule to image files
        type: 'asset/resource', // Treat images as assets
        generator: {
          filename: 'assets/[name][ext]', // Output path for images
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(), // Clean the output directory before each build
    new HtmlWebpackPlugin({
      template: './src/index.html', // Template for generating the HTML file
      filename: 'index.html', // Name of the output HTML file
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'dist'), // Serve files from the dist directory
    compress: true, // Enable gzip compression
    port: 9000, // Use port 9000 for the dev server
    hot: true, // Enable Hot Module Replacement
    open: true, // Automatically open the browser
  },
  resolve: {
    extensions: ['.js', '.jsx'], // Resolve these extensions
  },
  mode: 'development', // Set mode to 'development' for easier debugging
};

