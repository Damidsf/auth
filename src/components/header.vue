<template>
  <div class="header">
    <div class="left">
      <div @click="goHome">首页 </div>
      <div @click="store.isAdmain = !store.isAdmain">切换角色 </div>
    </div>
    <div class="right">
      <div @click="goLogin" v-if="!isLogin">
        <el-icon size="30px" style="transform: translateY(5px);">
          <User />
        </el-icon>
        登录
      </div>

      <div v-else>
        <el-icon size="30px" style="transform: translateY(5px);">
          <User />
        </el-icon>
        个人中心
      </div>
    </div>
  </div>
</template>
<script lang='ts' setup>
import { User } from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router';
import { useStore } from '@/store';
const router = useRouter()
const route = useRoute()
const store = useStore()
defineProps({
  isLogin: {
    type: Boolean,
    default: false
  }
})
const goHome = () => {
  if (route.path == "/home") return
  router.push('/')
}
const goLogin = async () => {
  router.push("/login")
}
</script>
<style lang='scss' scoped>
.header {
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: space-between;
  background-color: black;
  color: white;


  .left {

    height: 100%;
    width: auto;
    display: flex;
    font-size: 30px;
    font-weight: 800;

    div {
      padding: 0 50px;
      line-height: 10vh;
      cursor: pointer;
    }

  }

  .right {
    height: 100%;
    width: auto;
    display: flex;
    font-size: 30px;
    font-weight: 800;

    div {
      padding: 0 50px;
      line-height: 10vh;
      cursor: pointer;
    }
  }

}
</style>