module.exports = {
    entry: {
        'main': './src/scripts/main.ts',
        'ServiceWorker': './src/scripts/ServiceWorker.ts',
        'mochaRunner': './src/mocha/BrowserRunner.ts'
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
        }]
    }
};
