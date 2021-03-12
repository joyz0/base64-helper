# base64-helper

```ts
interface Base64Interpreter {
  // 解码
  decode(str: string): string
  // 编码
  encode(str: string): string
}
```

```js
B64.encode('He')
B64.decode('SGV5')
```
