var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        'main': './src/scripts/main.tsx',
        'ServiceWorker': './src/scripts/ServiceWorker.ts',
        'mochaRunner': './src/mocha/BrowserRunner.ts',
        'style': './src/styles/style.styl'
    },
    output: {
        filename: './www/bundle/[name].js',
        libraryTarget: 'var',
        library: '[name]'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    externals: {
        mocha: 'mocha',
        chai: 'chai'
    },
    module: {
        loaders: [{
            test: /\.tsx?$/,
            loader: 'ts-loader'
        }, {
            test: /\.styl$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    'css-loader',
                    { loader: 'postcss-loader', options: { sourceMap: true } },
                    'stylus-loader'
                ]
            })
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    'css-loader',
                    'clean-css-loader',
                    { loader: 'postcss-loader', options: { sourceMap: true } }
                ]
            })
        }]
    },
    plugins: [
        new ExtractTextPlugin("./www/bundle/[name].css")
    ]
};
