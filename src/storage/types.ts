export type Storage = {
  getItem: (key: string) => any
  setItem: (key: string, value: any) => void
  removeItem: (key: string) => void
  clear: () => void
}