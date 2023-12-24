<template>
  <div class="header">
    <div class="left">
      <div @click="goHome">首页</div>
    </div>
    <div class="right">
      <div @click="goLogin" v-if="!store.isLogin">
        <el-icon size="30px" style="transform: translateY(5px)">
          <User />
        </el-icon>
        登录
      </div>

      <div v-else @click="drawer = true">
        <el-icon size="30px" style="transform: translateY(5px)">
          <User />
        </el-icon>
        个人中心
      </div>

      <div @click="_getCode">
        获取code
      </div>

      <div @click="_getToken">
        获取token
      </div>

    </div>
    <el-drawer v-model="drawer" size="50%" :with-header="false">
      <span style="color: black;">
        <el-descriptions class="margin-top" title="用户信息" :column="2" border>
          <template #extra>
            <el-button type="primary" @click="openEdit">修改信息</el-button>
          </template>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon>
                  <user />
                </el-icon>
                用户名
              </div>
            </template>
            {{ store.userData.username }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon>
                  <tickets />
                </el-icon>
                uuid
              </div>
            </template>
            {{ store.userData.uuid }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon>
                  <iphone />
                </el-icon>
                手机号
              </div>
            </template>
            {{ store.userData.phone }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon>
                  <location />
                </el-icon>
                组织
              </div>
            </template>
            <el-tag size="small">{{ store.userData.organization }}</el-tag>
          </el-descriptions-item>
        </el-descriptions>
      </span>

    </el-drawer>


    <el-dialog v-model="dialogFormVisible" title="修改信息">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="_updateUserInfo">
            Confirm
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang='ts' setup>
import {
  Iphone,
  Location,
  Tickets,
  User,
} from '@element-plus/icons-vue'
import { useRouter, useRoute } from "vue-router";
import { useStore } from "@/store";
import { ref, reactive } from "vue"
import { updateUserInfo, getUserInfo, getCode, getToken } from "@/api/index"
import { ElMessage } from "element-plus"
const router = useRouter();
const route = useRoute();
const store = useStore();
const drawer = ref(false)
const goHome = () => {
  if (route.path == "/home") return;
  router.push("/");
};
const goLogin = async () => {
  router.push("/login");
};

const openEdit = () => {
  form.name = store.userData.username
  form.phone = store.userData.phone
  dialogFormVisible.value = true
}


const dialogFormVisible = ref(false)
const formLabelWidth = '140px'

const form = reactive({
  name: '',
  phone: '',
})
const _updateUserInfo = async () => {
  const res = await updateUserInfo(form.name, form.phone).catch(err => console.log(err))
  if (!res) {
    ElMessage({
      type: "warning",
      message: "修改失败"
    })
    return
  }
  if (res.data.status) {
    await _getUserInfo()
    dialogFormVisible.value = false
    ElMessage({
      type: "success",
      message: "修改成功"
    })
  }
}

const _getUserInfo = async () => {
  const res = await getUserInfo().catch(err => {
    console.log("未成功获取数据", err);
  })
  if (!res) return
  console.log(res.data);

  if (res.data.status) {
    store.isLogin = true
    store.userData = res.data.data
  }

}


const _getCode = async () => {
  const res = await getCode()
  console.log(res);

}

const _getToken = async () => {
  const res = await getToken()
  console.log(res);

}
</script>
<style lang='scss' scoped>
.header {
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: space-between;
  background-color: #333333;
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

.el-descriptions {
  margin-top: 20px;
}

.cell-item {
  display: flex;
  align-items: center;
}

.margin-top {
  margin-top: 20px;
}
</style>