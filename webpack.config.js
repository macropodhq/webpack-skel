var webpack = require('webpack');

var release = (process.env.NODE_ENV === 'production');

var plugins = [
  new webpack.NormalModuleReplacementPlugin(/^react$/, 'react/addons'),
];

var jsLoaders = ['babel?optional[]=runtime&stage=1&cacheDirectory=true'];

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
  jsLoaders.unshift('react-hot');
}

var config = module.exports = {
  debug: !release,
  devtool: 'source-map', //http://webpack.github.io/docs/configuration.html#devtool
  entry: {
    'app': './app',
  },
  output: {
    path: './dist',
    filename: '[name].js',
  },
  plugins: plugins,
  resolve: {
    extensions: ['', '.js', '.jsx', '.css'],
  },
  module: {
    loaders: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loaders: jsLoaders,
    },
    {
      test: /\.css$/,
      loaders: [
        'style',
        'css',
      ],
    },
    {
      test: /\.png$/,
      loader: 'url?limit=10000&mimetype=image/png',
    },
    // you might want to do more magical things with these
    {
      test: /\.(jpe?g|gif)$/,
      loader: 'file',
    },
    // inline fonts smaller than 10000 bytes
    // mimetypes are boring: http://www.iana.org/assignments/media-types/media-types.xhtml
    { test: /\.woff$/,  loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
    { test: /\.woff2$/,  loader: 'url-loader?limit=10000&mimetype=application/font-woff2' },
    { test: /\.ttf$/,   loader: 'url-loader?limit=10000&mimetype=application/font-sfnt' },
    { test: /\.eot$/,   loader: 'url-loader?limit=10000&mimetype=application/vnd.ms-fontobject' },
    // load svgs raw, for use with https://facebook.github.io/react/tips/dangerously-set-inner-html.html
    { test: /\.svg$/,   loader: 'raw-loader?' },
    ],
  },
};
