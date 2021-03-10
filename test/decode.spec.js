import {
  decodeUTF8string,
  decode,
  decodeChar,
  decodeGroup
} from '../src/decode'

it('decodeChar', () => {
  const bin = decodeChar('S')
  expect(bin).toBe('010010')
})

it('decodeGroup', () => {
  const bin = decodeGroup('SGV5')
})

it('decodeUTF8string', () => {
  expect(decodeUTF8string('%E4%BD%A0%E5%A5%BD')).toBe('%E4%BD%A0%E5%A5%BD')
  expect(decodeUTF8string('%E4%BD%A0%E5%A5%BD')).toBe('你好')
})

it('decode', () => {
  expect(decode('S')).toBe('1')
})
