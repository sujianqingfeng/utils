import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['index.ts'], 
  treeshake: true,
  clean: true,
  dts: true,
  format: ['cjs', 'esm'],
  external: ['currency.js', 'dayjs']
})