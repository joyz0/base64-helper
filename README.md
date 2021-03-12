# base64-helper

```ts
interface Base64Interpreter {
  // 解码
  atob(str: string): string
  // 编码
  btoa(str: string): string
}
```

```js
B64.encode('He')
B64.decode('SGV5')
```
