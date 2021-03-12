import { decodeUTF8string, decode } from '../src/decode'

it('decode', () => {
  expect(() => decode('S')).toThrowError(Error)
  expect(decode('SGV5')).toBe('Hey')
  expect(decode('SA')).toBe('H')
  expect(decode('SA==')).toBe('H')
  expect(decode('SGU=')).toBe('He')
  expect(decode('SGV=')).toBe('He')
  expect(decode('SGW=')).toBe('He')
  expect(decode('SGX=')).toBe('He')
  expect(decode('SGY=')).toBe('Hf')
})

it('decodeUTF8string', () => {
  expect(decodeUTF8string('%E4%BD%A0%E5%A5%BD')).toBe('%E4%BD%A0%E5%A5%BD')
  // expect(decodeUTF8string('%E4%BD%A0%E5%A5%BD')).toBe('你好')
})
