# Rollup plugin for compile sham-ui macro in third-party packages 

Wrapper for @rollup/plugin-node-resolve with support sham-ui-macro 

```
yarn add -D rollup-plugin-node-resolve-with-sham-ui-macro
```

## Usage

```js
import nodeResolveWithMacro from 'rollup-plugin-node-resolve-with-sham-ui-macro';
import commonjs from '@rollup/plugin-commonjs';

export default {
    input: 'src/main.js',
    output: {
        file: 'dist/bundle.js',
        format: 'iife',
        sourcemap: true
    },
    plugins: [
        nodeResolveWithMacro( {
            browser: true
        } ),
        commonjs()
    ]
};
```

