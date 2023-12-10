<template>
  <my-header :is-login="true" />
  <router-view></router-view>
</template>
<script lang='ts' setup>
import MyHeader from "./components/header.vue"
import { onBeforeMount, ref, watch } from "vue";
import { tokenTest, getResource } from "@/api/index"
import { useRoute } from "vue-router"
import { useStore } from "./store";
const store = useStore()
const isLogin = ref(false)
const route = useRoute()
watch(() => route.path, (val) => {
  if (val == '/home') {
    _tokenTest()
  }
})
const _tokenTest = async () => {
  const { data } = await getResource()
  console.log(data);
  if (data) {
    isLogin.value = true
    store.isLogin = true
  } else {
    isLogin.value = true
    store.isLogin = true
  }


}
onBeforeMount(async () => {
  store.isLogin = true
  _tokenTest()
  //测试使用

  // const { data: res } = await ilogin("user", "password")
  // console.log("登录信息", res);


  // const { data } = await getResource()
  // console.log("资源服务器", data);


})
</script>
<style lang='scss' scoped></style>