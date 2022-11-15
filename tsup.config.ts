import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'], 
  outDir: 'lib',
  treeshake: true,
  clean: true,
  dts: true,
  format: ['cjs', 'esm'],
  external: ['axios', 'dayjs', 'currency.js', 'has', 'function-bind', 'qs', 'side-channel', 'get-intrinsic', 'call-bind/callBound', 'object-inspect', 'has-symbols',],
  // shims: true
})