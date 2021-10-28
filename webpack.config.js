const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

const config = {
    mode: isProduction ? 'production' : 'development',
    entry: './example/src/index.js',
    output: {
        path: path.resolve(__dirname, 'example/dist'),
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

module.exports = () => {
    return config;
};
