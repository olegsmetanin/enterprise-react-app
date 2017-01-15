// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add addional webpack configurations.
// For more information refer the docs: https://getstorybook.io/docs/configurations/custom-webpack-config

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    module: {
        loaders: [
            { test: /\.css$/, loaders: ['style', 'css'] },
            {
                test: /\.tsx?$/,
                include: path.resolve(__dirname, '../src'),
                exclude: /node_modules/,
                loaders: ['ts']
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!less-loader'),
            },
            { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
            { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
            { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
            { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
            { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },

        ]
    },
    resolve: {
        root: [
            path.resolve(__dirname, '../src'),
        ],
        extensions: ['', '.js', '.ts', '.tsx']
    },
    postcss: function() {
        return [require('autoprefixer')];
    },
    ts: {
        compiler: 'typescript',
        configFileName: path.resolve(__dirname, '../tsconfig.test.json')
    },
    plugins: [
        // Output extracted CSS to a file
        new ExtractTextPlugin('./default.css')
    ]
}