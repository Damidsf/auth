import { $axios, resourceAxios, serverAxios } from "@/util/request";


export const login = (username: string, password: string) => {
  return $axios.post("/user/login", { username, password })
}

export const register = (username: string, password: string) => {
  return $axios.post("/user/register", { username, password })
}

export const tokenTest = () => {
  return $axios.post("/user/testToken")
}

export const logout = () => {
  return $axios.post("/user/logout")
}

export const getUserData = () => {
  return $axios.get("/data/getuserdata")
}

export const changePassword = (originPassword: string, changePassword: string) => {
  return $axios.post("/user/changepassword", { originPassword, changePassword })
}




//登录
export const ilogin = (username: string, password: string) => {
  return serverAxios.post("/login", { username, password })
}



//获取服务器资源
export const getResource = () => {
  return resourceAxios.get("/res1")
}