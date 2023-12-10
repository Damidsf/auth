<template>
  <div class="title">我的应用</div>
  <div class="tool">
    <div>
      <el-button type="default" @click="go('library')">
        图书馆系统
      </el-button>
    </div>
    <div>
      <el-button type="default" @click="go('educational')">
        教务系统
      </el-button>
    </div>
    <div>
      <el-button type="default" @click="go('logistics')">
        后勤管理平台
      </el-button>
    </div>
  </div>
</template>
<script lang='ts' setup>
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'
const router = useRouter()
const openWarinig = (text: string) => {
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
const go = async (path: string) => {
  router.push("/" + path)
  // const { data } = await tokenTest()
  // if (data.code == 401) {
  //   openWarinig(data.message)
  //   router.push("/login?to=" + path)

  // } else {
  //   openSuccess(data.message)
  //   router.push("/" + path)
  // }
}
</script>
<style lang='scss' scoped>
.title {
  height: 100px;
  width: 800px;
  text-align: left;
  line-height: 100px;
  font-size: 40px;
  font-weight: 700;
  margin: 5vh 100px;
}

.tool {
  width: 70%;
  height: 15vh;
  margin: 50px 90px;
  display: flex;
  justify-content: space-between;
  flex-flow: row wrap;

  div {
    width: 33%;

    button {
      width: 200px;
      height: 100px;
      border-radius: 30px;
      font-size: 25px;
    }
  }


}
</style>