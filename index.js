import { transformSync } from '@babel/core';
import findBabelConfig from 'find-babel-config';
import { nodeResolve } from '@rollup/plugin-node-resolve';

const SHAM_UI_MACRO_PKG = 'sham-ui-macro/babel.macro';

export default function nodeResolveWithMacro( options ) {
    const originalNodeResolve = nodeResolve( options );
    const { config } = findBabelConfig.sync( process.cwd() );

    return {
        ...originalNodeResolve,
        name: 'node-resolve-with-sham-ui-macro',
        resolveId( name ) {
            if ( name.endsWith( SHAM_UI_MACRO_PKG ) ) {

                // Ignore sham-ui-macro/babel.macro dependencies
                return null;
            }
            return originalNodeResolve.resolveId.apply( this, arguments );
        },
        transform( code, id ) {
            if ( id.includes( 'node_modules' ) && code.includes( SHAM_UI_MACRO_PKG ) ) {

                // Transform with babel for remove sham-ui-macro/babel.macro import
                return transformSync( code, {
                    ...config,
                    filename: id
                } );
            }
            return null;
        }
    };
}
