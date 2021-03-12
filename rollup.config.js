import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'

import pkg from './package.json'

const makeExternalPredicate = (externalArr) => {
  if (externalArr.length === 0) {
    return () => false
  }
  const pattern = new RegExp(`^(${externalArr.join('|')})($|/)`)
  return (id) => pattern.test(id)
}

const extensions = ['.ts', '.js', '.json']

export default [
  // UMD for Browsers
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.js',
      format: 'umd',
      name: 'B64'
    },
    external: makeExternalPredicate([]),
    plugins: [
      resolve(),
      json(),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        extensions,
        presets: ['@babel/preset-env', '@babel/preset-typescript']
      }),
      commonjs({ extensions })
      // terser()
    ]
  }
]
