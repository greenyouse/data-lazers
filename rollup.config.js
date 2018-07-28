import compiler from '@ampproject/rollup-plugin-closure-compiler';
import resolve from 'rollup-plugin-node-resolve';

// TODO: add CommonJS, ES, and UMD builds
export default {
  input: 'src/index.js',
  output: {
    exports: 'named',
    file: 'bundle.js',
    format: 'iife',
    name: 'L',
    language_in: 'ECMASCRIPT_2015',
    langauge_out: 'ECMASCRIPT5'
  },
  plugins: [
    compiler({
      "compilation_level": "SIMPLE"
    }),
    resolve()
  ],
}
