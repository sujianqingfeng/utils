import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['index.ts', 'utils.ts'], 
  treeshake: true,
  clean: true,
  dts: true,
  format: ['cjs', 'esm'],
  external: ['axios', 'qs-stringify']
})