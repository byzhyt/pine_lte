const { resolve } = require('path');

module.exports = () => {
  return {
    entry: './src/main.ts',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },
    output: {
      filename: 'index.js',
      path: resolve(__dirname, 'dist')
    }
  };
};
