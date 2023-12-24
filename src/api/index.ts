import { serverAxios } from "@/util/request";

//获取公钥
export const getPublicKey = () => {
  return serverAxios.get("/getkey")
}

//用户获取自己信息
export const getUserInfo = () => {
  return serverAxios.get("/user/userinfo")
}

//登录
export const login = (username: string, password: string, uuid: string, key: string) => {
  // console.log({ username, password, uuid, key });
  return serverAxios.post("/doLogin", { username, password, uuid, key })
}

//注册
export const register = (username: string, password: string, uuid: string, key: string) => {
  return serverAxios.post("/register", { username, password, uuid, key })
}

//获取权限信息
export const getAuthorities = () => {
  return serverAxios.get("/user/authorities")
}

//退出登录
export const logout = () => {
  return serverAxios.delete("/logout")
}

//获取用户列表
export const getUserList = (pageOffSize: number, pageSize: number) => {
  return serverAxios.get("/admin/getUserList", { params: { pageOffSize, pageSize } })
}

//删除用户
export const deleteUser = (uuid: string) => {
  return serverAxios.delete("/admin/deleteAccount", { params: { uuid } })
}

//管理员修改其他用户信息
export const getUserDataByUuid = (uuid: string) => {
  return serverAxios.get("/admin/userByUuid", { params: { uuid } })
}

//用户修改自己信息
export const updateUserInfo = (username: string, phone: string) => {
  return serverAxios.post("/user/updateInfo", { username, phone })
}

//获取code
export const getCode = () => {
  return serverAxios.get("/oauth2/authorize", { params: { response_type: "code", client_id: "my_client", scope: "read", redirect_uri: "http://www.baidu.com" } }).catch((err: Error) => {
    console.log("报错信息", err);

  })
}

//获取token
export const getToken = () => {
  return serverAxios.post("/oauth2/token", {
    grant_type: "authorization_code", code: "tw8VTBfMpy8XTk0Nc093VxLJG6gL5DHvWymZb33TAKCgNNNjCRiDpLuXHG_UUEu7AWGTWXQTNIfDEbXhiUTKa69JeF33QVeBKtDdMN8CAdAPQuLX3brL3GxbK7-0R0bA", redirect_uri: "http://www.baidu.com"
  }).catch((err: Error) => {
    console.log("报错信息", err);

  })
}



