<template>
  <div class="body">
    <div class="aside" v-if="store.isLogin">
      <div v-if="store.isAdmain">
        <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo"
          :default-active="'adminApplycation'" text-color="#fff" @select="changeTab">

          <el-sub-menu index="sudo-basic">
            <template #title>
              <el-icon>
                <User />
              </el-icon>
              <span>基础管理</span>
            </template>
            <el-menu-item index="adminOrganization">组织管理</el-menu-item>
            <el-menu-item index="adminUser">用户管理</el-menu-item>
          </el-sub-menu>

          <el-menu-item index="adminApplycation">
            <el-icon><icon-menu /></el-icon>
            <span>应用管理</span>
          </el-menu-item>

          <el-sub-menu index="action">
            <template #title>
              <el-icon>
                <setting />
              </el-icon>
              <span>操作管理</span>
            </template>
            <el-menu-item index="adminApply">申请日志</el-menu-item>
            <el-menu-item index="adminAuth">认证日志</el-menu-item>
            <el-menu-item index="adminPassword">密码日志</el-menu-item>
          </el-sub-menu>

          <el-menu-item index="adminSecurity">
            <el-icon>
              <Lock />
            </el-icon>
            <span>安全管理</span>
          </el-menu-item>

          <el-menu-item index="adminProxy">
            <el-icon>
              <Connection />
            </el-icon>
            <span>认证代理</span>
          </el-menu-item>

        </el-menu>
      </div>

      <div v-else>
        <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo"
          :default-active="'userApplication'" text-color="#fff" @select="changeTab">
          <el-menu-item index="userApplication">
            <el-icon><icon-menu /></el-icon>
            <span>应用入口</span>
          </el-menu-item>
          <el-sub-menu index="setting">
            <template #title>
              <el-icon>
                <setting />
              </el-icon>
              <span>操作管理</span>
            </template>
            <el-menu-item index="userApply">申请日志</el-menu-item>
            <el-menu-item index="userPaswordLog">密码日志</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </div>


    </div>
    <div v-else>
      <unLogin />
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script lang='ts' setup>
import unLogin from "@/components/home/myApplication.vue"
import { getUserData } from '@/api/index';
import { onMounted, ref, watch } from 'vue';
import { useStore } from '@/store';
import {
  Menu as IconMenu,
  Setting,
  Lock,
  Connection,
  User
} from '@element-plus/icons-vue'
import router from '@/router';

const store = useStore()



//用户信息和操作

const is_login = ref<boolean>(false)
const username = ref<string>('')
const inputOriginPwd = ref<string>('')




onMounted(async () => {
  if (store.isLogin) {
    router.push("/home/userApplication")
  }

  console.log(inputOriginPwd);
  if (localStorage.getItem("access-token")) {
    const { data } = await getUserData()
    if (data.code == '401') {
      console.log("还未登录");
    } else {
      console.log(data);
      username.value = data.userData.username
      is_login.value = true
    }
  } else {
    console.log("还未登录");

  }
})

//切换tab 
const changeTab = (index: string) => {
  console.log(index)
  router.push(`/home/${index}`)
}


//切换角色
watch(() => store.isAdmain, () => {

})
</script>
<style lang='scss' scoped>
.body {
  display: flex;
  flex: 1;

  .aside {
    background-color: #333333;
    width: 20%;
  }


  .content {
    height: 100vh;
    overflow: hidden;


  }
}
</style>