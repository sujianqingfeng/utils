import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['./src/index.ts'], 
  outDir: 'lib',
  treeshake: true,
  splitting: false,
  clean: true,
  dts: true,
  format: ['cjs', 'esm'],
  target: 'es5',
  // sourcemap: true,
  minify: true
})