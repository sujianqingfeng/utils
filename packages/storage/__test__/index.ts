import { createStorage, createPrefix, createType, } from '../../storage'

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

export type { PrefixConfig, TypeConfig } from '../../storage' 
export { StorageType } from '../../storage'
