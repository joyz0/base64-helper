declare module '*.json'

interface Base64Helper {
  // 解码
  decode(str: string): string
  // 编码
  encode(str: string): string
}
