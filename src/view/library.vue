<template>
  <div>
    图书馆系统
  </div>
  <el-button @click="exit">
    退出登录
  </el-button>
</template>
<script lang='ts' setup>
import { logout } from "@/api/index"
import { useRouter } from "vue-router"
import { ElMessage } from 'element-plus'

const openWarning = (text: string) => {
  ElMessage({
    message: text,
    type: 'warning',
  })
}
const openSuccess = (text: string) => {
  ElMessage({
    message: text,
    type: 'success',
  })
}
const router = useRouter()
const exit = async () => {
  const { data } = await logout()
  localStorage.removeItem("access-token")
  if (data.code == 200) {
    openSuccess(data.message)
  } else {
    openWarning(data.message)
  }
  router.push("/")

}
</script>
<style lang='scss' scoped></style>