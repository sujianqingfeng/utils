import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'], 
  outDir: 'lib',
  treeshake: true,
  clean: true,
  dts: true,
  format: ['cjs', 'esm'],
  external: ['axios'],
  // shims: true
})