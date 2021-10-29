const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    mode: isProduction ? 'production' : 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [ '@babel/env', '@babel/react' ],
                        plugins: [ '@babel/transform-runtime' ]
                    }
                }
            }
        ]
    }
};
