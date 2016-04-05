var pjson = require('./package.json');
var path = require('path');
var webpack = require('webpack');

var ExtractTextPlugin = require('extract-text-webpack-plugin');

// Angular Plugins
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
var ngRequire = require('ngrequire-webpack-plugin');

var PRODUCTION = JSON.parse(process.env.PRODUCTION || '0');

var appPaths = {
    src: path.resolve('src'),
    build: path.resolve('dist')
};

var indexHtml = path.join(appPaths.src, 'index.html');
var mainCss = path.join(appPaths.src, 'style.less');

/*
TODO: css less require ? assets file-loader webserver jshint
commons js
index html link hases
https://www.npmjs.com/package/ng-annotate-loader
Move webmodules to web modules
 */

module.exports = {
    resolve: {
        modulesDirectories: ['web_modules', 'node_modules'],
        root: [
            appPaths.src
        ]
    },
    entry: {
        index: indexHtml,
        style: mainCss,
        app: 'app.js',
        vendor: ['jquery', 'angular', 'lodash', 'bootstrap'],
    },
    output: {
        path: appPaths.build,
        filename: '[name].js'
    },
    //devtool: 'source-map',
    module: {
        loaders: [
            // Fonts
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff'
            }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/octet-stream'
            }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file'
            }, {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml'
            },

            // Extract main style
            {
                test: mainCss,
                loader: ExtractTextPlugin.extract(['css', 'less'])
            }, {
                test: /\.css$/,
                exclude: mainCss,
                loader: 'style!css'
            },
            // Extract index
            {
                test: indexHtml,
                loaders: [
                    'file?name=[name].[ext]',
                    'extract',
                    'html?' + JSON.stringify({
                        attrs: ['img:src']
                    })
                ]
            },
            // Images
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: 'file',
                query: {
                    name: '[name]-[hash].[ext]'
                }
            },
            // HTML Partials
            {
                test: /\.html$/i,
                exclude: indexHtml,
                loader: 'html?' + JSON.stringify({
                    attrs: ['img:src', 'link:href']
                })
            }


        ]

    },

    plugins: [

        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),

        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),

        new ngAnnotatePlugin({}),

        //new ngRequirePlugin(['file path list for your angular modules. eg: src/**/*.js'])
        /*
        new webpack.optimize.UglifyJsPlugin({
            mangle: {
                except: ['$super', '$', 'exports', 'require']
            },
            compress: {
                warnings: false
            }
        }),
        */

        new webpack.BannerPlugin(pjson.name + '  ' + pjson.version),
        new ExtractTextPlugin('style.css')
        /*
        new webpack.DefinePlugin({
            VERSION: JSON.stringify(pjson.version),
            PRODUCTION: JSON.stringify(PRODUCTION)
        })
        */


    ]
};