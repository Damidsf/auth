// import { SM4Util } from "sm4util"
// const sm4 = new SM4Util()

// export const encrypt_SM4 = (data: string) => {
//   const miStr1 = sm4.encryptCustom_ECB(data, '111111111111111193F3044B07393417')
//   console.log('加密结果', miStr1)
//   const jie = sm4.decryptCustom_ECB(miStr1, '111111111111111193F3044B07393417')
//   console.log('加密结果', jie)
// }

import { sm4 } from "gm-crypt"
const sm4Config = {
  //配置sm4参数
  key: "GJwsXX_BzW=gJMMM", //这里这个key值要与后端的一致，后端解密是根据这个key
  mode: "cbc", // 加密的方式有两种，ecb和cbc两种，这里使用的是cbc，cbc模式还要加一个iv的参数，ecb不用
  iv: "ZkR_SiNoSOFT=568", //iv是cbc模式的第二个参数，也需要跟后端配置的一致
  cipherType: "base64" //
};
const mySm4 = new sm4(sm4Config)
export const encrypt_SM4 = (data: string) => {
  const res = mySm4.encrypt(data)
  console.log("加密结果", res);
  // const ret = mySm4.decrypt(res)
  // console.log("解密结果", ret);
  return res

}
