import base64Chars from './base64chars'

export const decodeUTF8string = (str: string) => {
  // Going backwards: from bytestream, to percent-encoding, to original string.
  return decodeURIComponent(
    str
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
      })
      .join('')
  )
}

export const decodeChar = (c: string) => {
  const num = base64Chars.indexOf(c)
  return num.toString(2).padStart(6, '0')
}

export const decodeGroup = (g: string) => {
  const buffer = []
  for (let i = 0; i < g.length; i++) {
    const sextet = decodeChar(g[i])
    buffer.push(sextet)
  }
  return buffer.join('')
}

export const _decode = (input: string) => {
  let len = input.length
  let i = 0
  let buffer = []
  while (i < len) {
    const sextet = decodeGroup(input.slice(i, i + 4))
    buffer.push(sextet)
    i += 4
  }
  return buffer.join('')
}

export const decode = (encodedData: string) => {
  // if (typeof window !== 'undefined') {
  //   if (typeof window.atob !== 'undefined') {
  //     return decodeUTF8string(window.atob(encodedData))
  //   }
  // } else {
  //   // nodejs
  //   return Buffer.from(encodedData, 'base64').toString('utf-8')
  // }

  let o1
  let o2
  let o3
  let h1
  let h2
  let h3
  let h4
  let bits
  let i = 0
  let ac = 0
  let dec = ''
  const tmpArr = []

  if (!encodedData) {
    return encodedData
  }
  encodedData += ''
  do {
    // unpack four hexets into three octets using index points in b64
    h1 = base64Chars.indexOf(encodedData.charAt(i++))
    h2 = base64Chars.indexOf(encodedData.charAt(i++))
    h3 = base64Chars.indexOf(encodedData.charAt(i++))
    h4 = base64Chars.indexOf(encodedData.charAt(i++))
    bits = (h1 << 18) | (h2 << 12) | (h3 << 6) | h4
    o1 = (bits >> 16) & 0xff
    o2 = (bits >> 8) & 0xff
    o3 = bits & 0xff
    if (h3 === 64) {
      tmpArr[ac++] = String.fromCharCode(o1)
    } else if (h4 === 64) {
      tmpArr[ac++] = String.fromCharCode(o1, o2)
    } else {
      tmpArr[ac++] = String.fromCharCode(o1, o2, o3)
    }
  } while (i < encodedData.length)
  dec = tmpArr.join('')
  return decodeUTF8string(dec.replace(/\0+$/, ''))
}
