import axios from "axios"
import router from "@/router"

export const $axios = axios.create({
  baseURL: "http://127.0.0.1:88",
  timeout: 10000,
  withCredentials: true
})

$axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("access-token")

  if (token) {
    config.headers["access-token"] = token

  }

  return config
})

$axios.interceptors.response.use((config) => {
  if (config.data.code == 401) {
    localStorage.removeItem("access-token")
  }
  return config
})


//访问用户信息服务器
export const serverAxios = axios.create({
  baseURL: "/serverApi",
  timeout: 10000,
  withCredentials: true
})


//访问资源服务器
export const resourceAxios = axios.create({
  baseURL: "/resourceApi",
  timeout: 10000,
  withCredentials: true
})

resourceAxios.interceptors.request.use((config) => {
  // console.log("拦截器", config);

  const itoken = localStorage.getItem("access_i_token")
  if (itoken) {
    config.headers.Authorization = "Bearer " + itoken
  }

  return config
})

resourceAxios.interceptors.response.use((config) => {
  if (config.data.code == 401) {
    localStorage.removeItem("access_i_token")
  }
  return config
})