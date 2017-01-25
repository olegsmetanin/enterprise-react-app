'use strict';

var isProduction = process.env.NODE_ENV === 'production';
var PORT = 8080

console.log('..running ' + process.env.NODE_ENV + ' build');
console.log(process.argv);
var path = require('path'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    autoprefixer = require('autoprefixer');

var config = {
    entry: {
        vendors: [
            'react',
            'react-dom',
            'react-router',
            'redux',
            'react-redux',
            'styled-components'
        ]
    },
    output: {
        path: path.join(__dirname, 'dist/WebClient'),
        filename: '[name].dll.js',
        library: 'vendors'
    },
    module: {
        preLoaders: [{
            test: /\.tsx?$/,
            loader: 'tslint',
            include: [
                path.join(__dirname),
            ],
        }],
        loaders: [{
                test: /\.tsx?$/,
                include: path.resolve(__dirname),
                exclude: /node_modules/,
                loaders: ['ts']
            },
            {
                test: /\.json$/,
                loaders: ['json'],
                include: [
                    path.join(__dirname),
                ]
            },
            { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" }
        ].concat(isProduction ? [{
            test: /\.less$/,
            loader: 'style-loader!css-loader!postcss-loader!less-loader',
            include: [
                path.join(__dirname),
            ]
        }] : [{
            test: /\.less$/,
            loader: 'style-loader!css-loader!postcss-loader!less-loader',
            include: [
                path.join(__dirname),
            ]
        }])
    },
    ts: {
        compiler: 'typescript',
        configFileName: path.resolve(__dirname, './tsconfig.json')
            // do not emit declarations since we are bundling
            // compilerOptions: { declaration: false },
    },

    resolve: {
        root: [
            path.resolve(__dirname),
        ],
        extensions: ['', '.js', '.ts', '.tsx']
    },

    postcss: function() {
        return [autoprefixer({ browsers: ['last 2 versions'] })];
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        //https://github.com/moment/moment/issues/1435#issuecomment-232687733
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new webpack.DllPlugin({
            path: path.join(__dirname, "dist/WebClient", "[name].dll-manifest.json"),
            name: "[name]"
        })
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