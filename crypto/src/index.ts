import Utf8 from 'crypto-js/enc-utf8'
import AES from 'crypto-js/aes'
import ECB from 'crypto-js/mode-ecb'
import Pkcs7 from 'crypto-js/pad-pkcs7'

const aesKey = '@GZ<_L|du&KXk$)1BQ+na-f[=i3I`v/x'

const encrypt = (str: string) => {
  try {
    const key = Utf8.parse(aesKey)
    const srcs = Utf8.parse(str)
    const encrypted = AES.encrypt(srcs, key, { mode: ECB, padding: Pkcs7 })
    return encrypted.toString()
  } catch (error) {
    console.log('🚀 ~ file: index.ts:15 ~ aesEncrypt ~ error', error)
  }
}

const decryption = (str: string) => {
  try {
    const key = Utf8.parse(aesKey)
    const decrypt = AES.decrypt(str, key, { mode: ECB, padding: Pkcs7 })
    return Utf8.stringify(decrypt).toString()
  } catch (error) {
    console.log('🚀 ~ file: index.ts:25 ~ decryption ~ error', error)
  }
}

const raw = JSON.stringify({
  text: 1,
  time: '2023年2月10日17:24:09',
  special: '💯test➕test\n💹test✅\n💢test'
})

const testData = encrypt(raw)

console.log('original data: ', raw)
console.log('encrypt:       ', testData)
console.log('decryption:    ', decryption(testData))