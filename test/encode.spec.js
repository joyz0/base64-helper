import { encodeUTF8string, encode } from '../src/encode'

it('encodeUTF8string', () => {
  expect(encodeUTF8string('hey')).toBe('hey')
  // %E4%BD%A0%E5%A5%BD
  // expect(encodeUTF8string('你好')).toBe('')
})
