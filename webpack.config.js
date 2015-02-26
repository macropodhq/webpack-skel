var webpack = require('webpack');

var release = (process.env.NODE_ENV === 'production');

var plugins = [
  new webpack.NormalModuleReplacementPlugin(/^react$/, 'react/addons'),
  //new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
];

var jsxLoader = ['babel-loader'];

if (release)  {
  plugins.push(new webpack.DefinePlugin({
    'process.env': {
      // This has effect on the react lib size
      'NODE_ENV': JSON.stringify('production'),
    },
  }));

  plugins.push(new webpack.optimize.DedupePlugin());
  plugins.push(new webpack.optimize.UglifyJsPlugin());
} else {
  jsxLoader = ['react-hot', 'babel-loader'];
}

var config = module.exports = {
  debug: !release,
  cache: !release,
  devtool: !release && 'inline-source-map',
  entry: {
    'app': './app',
    //vendor: ['react/addons', 'react-router', 'bows', 'fluxxor', 'lodash'] //, 'lunr', 'moment', 'node-uuid', 'superagent', 'tcomb-validation', 'react-textarea-autosize', 'react-playground']
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name].js',
  },
  plugins: plugins,
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss'],
  },
  module: {
    loaders: [
    { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
    { test: /\.jsx$/, loaders: jsxLoader },
    {
      test: /\.scss$/,
      loaders: [
      'style-loader',
      'css-loader',
      'autoprefixer-loader',
      'sass-loader?includePaths[]=./app/base/style,includePaths[]=./node_modules'
      ],
    },
    { test: /\.css$/,   loader: 'style-loader!css-loader' },
    { test: /\.png$/,   loader: 'url-loader' },
    { test: /\.woff$/,  loader: 'url-loader?mimetype=application/font-woff' },
    { test: /\.ttf$/,   loader: 'url-loader?' },
    { test: /\.eot$/,   loader: 'url-loader?' },
    { test: /\.svg$/,   loader: 'raw-loader?' },
    ],
  },
};
