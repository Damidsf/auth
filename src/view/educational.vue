<template>
  <div>
    教务系统
  </div>
  <el-button @click="exit">
    退出登录
  </el-button>
</template>
<script lang='ts' setup>
import { logout } from "@/api/index"
import { useRouter } from "vue-router"
import { ElMessage } from 'element-plus'

// const openWarning = (text: string) => {
//   ElMessage({
//     message: text,
//     type: 'warning',
//   })
// }
const openSuccess = (text: string) => {
  ElMessage({
    message: text,
    type: 'success',
  })
}
const router = useRouter()
const exit = async () => {
  await logout()
  localStorage.removeItem("access-token")
  openSuccess("成功退出登录")
  router.push("/")

}
</script>
<style lang='scss' scoped></style>