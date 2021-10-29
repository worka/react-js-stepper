import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';

const packageJson = require('./package.json');

export default {
    input: 'src/index.js',
    output: [
        {
            file: packageJson.main,
            format: 'cjs',
            sourcemap: true
        },
        {
            file: packageJson.module,
            format: 'esm',
            sourcemap: true
        }
    ],
    plugins: [
        peerDepsExternal(),
        resolve(),
        babel({
            exclude: 'node_modules/**',
            presets: [ '@babel/env', '@babel/preset-react' ]
        }),
        commonjs()
    ],
    watch: {
        exclude: 'node_modules/**',
        clearScreen: false
    }
};
