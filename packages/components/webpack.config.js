'use strict';

var isProduction = process.env.NODE_ENV === 'production';
var PORT = 8080

console.log('..running ' + process.env.NODE_ENV + ' build');

var path = require('path'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    autoprefixer = require('autoprefixer');

var config = {
    entry: {
        app: (isProduction ? [] : ['webpack-hot-middleware/client?http://localhost:' + PORT])
            .concat([path.resolve(__dirname, './src/index.tsx')]),
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'js/[name].js',
        publicPath: ''
    },
    module: {
        preLoaders: [{
            test: /\.tsx?$/,
            loader: 'tslint',
            include: [
                path.join(__dirname, './src'),
            ],
        }],
        loaders: [{
                test: /\.tsx?$/,
                loaders: [
                    'ts'
                ]
            },
            {
                test: /\.json$/,
                loaders: ['json'],
                include: [
                    path.join(__dirname, './src'),
                ]
            }
        ].concat(isProduction ? [{
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract(['css', 'postcss', 'resolve-url', 'sass?sourceMap']),
            include: [
                path.join(__dirname, './src'),
            ]
        }] : [{
            test: /\.scss$/,
            loaders: ['style', 'css', 'postcss', 'resolve-url', 'sass?sourceMap'],
            include: [
                path.join(__dirname, './src'),
            ]
        }])
    },
    externals: {
        "react": {
            root: 'React',
            commonjs2: 'react',
            commonjs: 'react',
            amd: 'react'
        },
        'react-dom': {
            root: 'ReactDOM',
            commonjs2: 'react-dom',
            commonjs: 'react-dom',
            amd: 'react-dom'
        }
    },
    ts: {
        compiler: 'typescript'
            // do not emit declarations since we are bundling
            // compilerOptions: { declaration: false },
    },

    resolve: {
        root: [
            path.resolve(__dirname, './src'),
        ],
        extensions: ['', '.js', '.ts', '.tsx']
    },

    sassLoader: {
        includePaths: [
            path.resolve(__dirname, './src')
        ]
    },

    sassResources: ['./src/application/styles/scss/common.scss'],

    postcss: function() {
        return [autoprefixer({ browsers: ['last 2 versions'] })];
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
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
        }),
        new ExtractTextPlugin('./css/app.css', { allChunks: true, publicPath: '/css' })
    ] : [])
};

if (!isProduction) {
    config.devtool = '#source-map';
    config.bail = false;
    config.cache = true;
    config.debug = true;
}

module.exports = config;