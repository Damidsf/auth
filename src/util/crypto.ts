import { sm4 } from "gm-crypt"

export const encrypt_SM4 = (plainText: string, key: string) => {
  let sm4Config = {
    key,
    mode: 'cbc',
    iv: 'UISwD9fW6cFh9SNS',
    cipherType: 'base64'
  }
  const mySM4 = new sm4(sm4Config)
  const cipherText = mySM4.encrypt(plainText)
  return base64ToHex(cipherText)
}


const base64ToHex = (base64: string) => {
  let val = ''
  for (let i = 0; i < base64.length; i++) {
    //先转成unicode编码,再转成对应的16进制
    val += '' + base64.charCodeAt(i).toString(16).padStart(2, "0")
  }
  return val
}

