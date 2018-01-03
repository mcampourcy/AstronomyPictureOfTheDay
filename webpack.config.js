const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const nodeModules = path.resolve(__dirname, 'node_modules');

const config = {
    entry: path.join(__dirname, 'src', 'index.js'),
    output: {
        library: '[name]', // assets build
        libraryTarget: 'umd',
        path: path.join(__dirname, 'src/public'),
        filename: '[name].js',
        chunkFilename: '[name]-[chunkhash].js'
    },
    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            options: {
                cacheDirectory: true
            },
            exclude: [nodeModules]
        }, {
            // required to write 'require('./style.scss')'
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            sourceMap: true
                        }
                    }, {
                        loader: 'sass-loader',
                        options: {
                            includePaths: [
                                path.join(__dirname, 'src'),
                                nodeModules
                            ],
                            sourceMap: true
                        }
                    },
                ]
            })
        }, {
            // required to write 'require('./style.css')'
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    }
                ]
            })
        }]
    },
    devtool: 'source-map',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new webpack.ProvidePlugin({
            fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
        }),
        // Use the plugin to specify the resulting filename (and add needed behavior to the compiler)
        new ExtractTextPlugin({
            filename: '[name].css',
            allChunks: true
        })
    ]
};

if (process.env.NODE_ENV === 'production') {
    config.devtool= false;
    config.plugins.push(
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                screw_ie8: true,
                warnings: false
            }
        })
    );
} else {
    config.plugins.push(
        new webpack.LoaderOptionsPlugin({
            debug: true
        })
    );
}

module.exports = config;