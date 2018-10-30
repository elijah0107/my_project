const ExtractTextPlugin = require('extract-text-webpack-plugin');

let path = require('path');

let conf = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'main.js',
        publicPath: 'dist/'
    },
    devServer: {
        overlay: true
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader']
                })
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('style.css')
    ]
};

module.exports = (env, options) => {
    let production = options.mode === 'production';

    conf.devtool = production
                    ? false
                    : 'eval-sourcemap';
    return conf;
}
