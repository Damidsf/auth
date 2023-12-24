import { sm4 } from "gm-crypt"

export const encrypt_SM4 = (plainText: string, key: string) => {
  let sm4Config = {
    key,
    mode: 'ecb',
    // iv: 'UISwD9fW6cFh9SNS',
    // cipherType: 'base64'
  }
  const mySM4 = new sm4(sm4Config)
  const cipherText = mySM4.encrypt(plainText)
  // console.log("sm4加密", cipherText);
  // console.log(base64ToHex(cipherText));

  return base64ToHex(cipherText)
}


const base64ToHex = (str: string) => {
  const raw = atob(str);
  let result = '';
  for (let i = 0; i < raw.length; i++) {
    const hex = raw.charCodeAt(i).toString(16);
    result += (hex.length === 2 ? hex : '0' + hex);
  }
  return result
}

