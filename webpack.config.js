const path = require('path');
const pkg = require('./package.json');
const camelcase = require('camelcase');
const process = require('process');
const env = process.env;
const NODE_ENV = env.NODE_ENV;
const MIN = env.MIN == 'true';
const PACK = env.PACK == 'true';
const PROD = NODE_ENV === 'production';

let config = {
  mode: NODE_ENV,
  devtool: PROD ? false : 'inline-source-map',
  entry: './src/index.js',
  output: {
    path: path.join( __dirname ),
    filename: MIN ? PACK ? pkg.name + ".min.pack.js" : pkg.name + ".min.js" : pkg.name + '.js',
    library: camelcase( pkg.name ),
    libraryTarget: 'umd',
    globalObject: "this"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use:
        {
          loader: 'babel-loader',
          options: {
            "presets": ["@babel/preset-env"],
            "plugins": ["@babel/plugin-proposal-private-methods", "@babel/plugin-proposal-class-properties"]
          }
        }
      }
    ]
  },
  externals: PACK ? [] : ["dagre"] ,
  optimization: {
    minimize: MIN
  }
};

module.exports = config;
