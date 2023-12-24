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
import { getUserInfo, getAuthorities } from '@/api/index';
import { onMounted, ref, watch, onBeforeMount } from 'vue';
import { useStore } from '@/store';
import {
  Menu as IconMenu,
  Setting,
  Lock,
  Connection,
  User
} from '@element-plus/icons-vue'
import router from '@/router';

onBeforeMount(async () => {
  await _getUserInfo()
  await _getAuthorities()
})
const userData = ref()
const _getUserInfo = async () => {
  const res = await getUserInfo().catch(err => {
    console.log("未成功获取数据", err);
  })
  if (!res) return
  console.log(res.data);

  if (res.data.status) {
    userData.value = res.data.data
    console.log("获取用户数据", res.data.data);
    store.isLogin = true
    store.userData = res.data.data
  }

}

const userAuth = ref("")
const _getAuthorities = async () => {
  const res = await getAuthorities().catch(err => {
    console.log("未成功获取数据", err);
  })

  //测试+
  store.isAdmain = true
  store.isLogin = true
  router.push("/home/adminApplycation")
  // router.push("/home/userApplication")

  if (!res) return
  console.log(res.data);
  if (res.data.status) {
    userAuth.value = res.data.data[0].authority
    if (userAuth.value == "ROLE_ADMIN") {
      store.isAdmain = true
      router.push("/home/adminApplycation")
    } else {
      store.isAdmain = false
      router.push("/home/userApplication")
    }


  } else {
    console.log("无法获取身份信息");

  }
}
const store = useStore()
onMounted(async () => {

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