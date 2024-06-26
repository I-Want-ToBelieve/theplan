import fs from 'node:fs'

import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import nodeResolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import typescriptPlugin from '@rollup/plugin-typescript'
import { defineConfig } from 'rollup'
/* @ts-expect-error: Unreachable code error */
import tscAlias from 'rollup-plugin-tsc-alias'
import metablock from 'rollup-plugin-userscript-metablock'
import typescript from 'typescript'
/* @ts-expect-error: Unreachable code error */
import userScriptCss from 'rollup-plugin-userscript-css'

import * as pkg from './package.json' assert { type : 'json' }

fs.mkdir('dist/', { recursive: true }, () => null)

export default defineConfig({
  input: 'src/index.ts',
  output: {
    file: 'dist/bundle.user.js',
    format: 'iife',
    name: 'rollupUserScript',
    banner: () =>
      '\n/*\n' +
      fs.readFileSync('./LICENSE', 'utf8') +
      '*/\n\n/* globals React, ReactDOM */',
    sourcemap: true,
    globals: {

    }
  },

  plugins: [
    json(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      ENVIRONMENT: JSON.stringify('production'),
      preventAssignment: true
    }),
    nodeResolve({ extensions: ['.js', '.ts', '.tsx'], browser: true }),
    typescriptPlugin({ typescript }),
    commonjs({

    }),
    babel({
      include: ['**.js', 'node_modules/**'],
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env']
    }),
    tscAlias(),
    metablock({
      file: './meta.json',
      override: {
        name: pkg.name,
        version: pkg.version,
        description: pkg.description,
        homepage: pkg.homepage,
        author: pkg.author,
        license: pkg.license
      }
    }),
    userScriptCss()
  ],
  external (id) {
    return /^react(-dom)?$/.test(id)
  }
})
