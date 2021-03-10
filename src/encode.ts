// https://locutus.io/php/url/base64_encode/
import base64Chars from './base64chars'

export const encodeUTF8string = (str: string) => {
  // first we use encodeURIComponent to get percent-encoded UTF-8,
  // then we convert the percent encodings into raw bytes which
  // can be fed into the base64 encoding algorithm.
  return encodeURIComponent(str).replace(
    /%([0-9A-F]{2})/g,
    function toSolidBytes(match, p1) {
      // @ts-ignore
      return String.fromCharCode('0x' + p1)
    }
  )
}

export const encode = (stringToEncode: string) => {
  // if (typeof window !== 'undefined') {
  //   if (typeof window.btoa !== 'undefined') {
  //     return window.btoa(encodeUTF8string(stringToEncode))
  //   }
  // } else {
  //   // nodejs
  //   return Buffer.from(stringToEncode, 'base64').toString()
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
  let enc = ''
  const tmpArr = []

  if (!stringToEncode) {
    return stringToEncode
  }
  stringToEncode = encodeUTF8string(stringToEncode)
  do {
    // pack three octets into four hexets
    o1 = stringToEncode.charCodeAt(i++)
    o2 = stringToEncode.charCodeAt(i++)
    o3 = stringToEncode.charCodeAt(i++)
    bits = (o1 << 16) | (o2 << 8) | o3
    h1 = (bits >> 18) & 0x3f
    h2 = (bits >> 12) & 0x3f
    h3 = (bits >> 6) & 0x3f
    h4 = bits & 0x3f
    // use hexets to index into b64, and append result to encoded string
    tmpArr[ac++] =
      base64Chars.charAt(h1) +
      base64Chars.charAt(h2) +
      base64Chars.charAt(h3) +
      base64Chars.charAt(h4)
  } while (i < stringToEncode.length)
  enc = tmpArr.join('')
  const r = stringToEncode.length % 3
  return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3)
}
