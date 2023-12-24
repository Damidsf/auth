import axios from "axios"
//访问用户信息服务器
export const serverAxios = axios.create({
  baseURL: "/serverApi",
  timeout: 10000,
  withCredentials: true
})

serverAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("access-token")

  if (token) {
    config.headers["token"] = token

  }
  config.headers.Authorization = "Basic bXlfY2xpZW50OjEyMzQ1Ng=="
  return config
})

serverAxios.interceptors.response.use((config) => {
  if (config.data.code == 401) {
    localStorage.removeItem("access-token")
  }
  return config
})
