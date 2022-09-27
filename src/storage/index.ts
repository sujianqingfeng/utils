import { createStorage } from './factory'
import { createPrefix } from './interceptors/prefix'
import { createType } from './interceptors/type'

const { prefixRead, prefixWrite } = createPrefix('_prefix_')
const { typeWrite, typeRead } = createType()

// 注意放置的顺序
export const storage = createStorage(
  {
    interceptor: {
      reads: [prefixRead, typeRead],
      writes: [prefixWrite, typeWrite],
    }
  }
)
