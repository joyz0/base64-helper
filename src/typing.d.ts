declare module '*.json'

interface Base64Interpreter {
  // 解码
  atob(str: string): string
  // 编码
  btoa(str: string): string
}
