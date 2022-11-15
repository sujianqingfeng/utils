import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  declaration: true,
  externals: ['axios', 'dayjs', 'currency.js', 'has', 'function-bind', 'qs', 'side-channel', 'get-intrinsic', 'call-bind/callBound', 'object-inspect', 'has-symbols',],
  failOnWarn: false,
  outDir: 'lib'
})