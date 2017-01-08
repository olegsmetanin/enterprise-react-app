'use strict';

var isProduction = process.env.NODE_ENV === 'production';

var path = require('path'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    autoprefixer = require('autoprefixer');

var config = {
    entry: {
        index: ['react', 'react-dom', 'react-router', 'redux', 'react-redux', 'moment', 'jsonschema']
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: '[name].js',
        libraryTarget: 'umd'
    },
    module: {
        loaders: [{
                test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
                loader: 'file?name=fonts/[name].[ext]',
                include: path.join(__dirname, './node_modules/bootstrap-sass/assets/fonts/bootstrap')
            }
        ]
    },
    plugins: [
        //https://github.com/moment/moment/issues/1435#issuecomment-232687733
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ].concat(isProduction ? [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: true
            }
        })
    ] : [])
};

if (!isProduction) {
    config.devtool = '#source-map';
    config.bail = false;
    config.cache = true;
    config.debug = true;
}

module.exports = config;