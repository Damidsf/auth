<template>
  <div class="box">
    <div class="tabs">
      <div @click="tabNum = 0" :class="[tabNum ? '' : 'tabActive']">
        学号
      </div>
      <div @click="tabNum = 1" :class="[tabNum ? 'tabActive' : '']">
        手机号
      </div>
    </div>
    <div class="title">
      {{ tabNum ? '手机号登录' : '学号登录' }}
    </div>
    <div class="form">
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm"
        :size="formSize" status-icon>
        <el-form-item v-if="tabNum" label="手机号" prop="phone">
          <el-input v-model="ruleForm.phone" size="large" />
        </el-form-item>

        <el-form-item v-else label="学号" prop="sno">
          <el-input v-model="ruleForm.sno" size="large" />
        </el-form-item>



        <el-form-item style="margin-top: 40px;" label="密码" prop="password">
          <el-input type="password" v-model="ruleForm.password" size="large" />
        </el-form-item>
        <el-button style="width: 390px;height: 40px;font-size: 20px;margin-left: 55px;margin-top: 10px;" type="primary"
          @click="submitForm(ruleFormRef)">
          登录
        </el-button>
        <!-- <el-link :underline="false" type="primary" @click="goRegister" style="margin-right: 200px;">还没有账号?前往注册</el-link> -->
        <el-link style="margin-left: 60px;margin-top: 10px;" :underline="false" type="primary"
          @click="forgetPwd">忘记密码</el-link>

        <div style="width: 80%;height: 10px;margin: 10px 80px;">
          <div>———————其他方式登录———————</div>
        </div>
        <el-form-item class="other" style="display: flex;">
          <div></div>
          <div></div>
          <div style="position: absolute;right: 20px;top: 20px;cursor: pointer;">管理员登录</div>
        </el-form-item>


      </el-form>


      <!-- 修改密码框 -->
      <el-dialog v-model="dialogFormVisible" title="重置密码" width="600px">
        <el-form :model="form">
          <el-form-item label="手机号" :label-width="formLabelWidth">
            <el-input v-model="form.phone" autocomplete="off" />
          </el-form-item>
          <el-form-item :inline="true" label="验证码" :label-width="formLabelWidth">
            <el-input v-model="form.yzm" autocomplete="off" style="width: 200px" />
            <el-button type="primary" @click="yzmCount" :disabled="yzmBtnDisabled" style="width: 100px;">{{ yzmBtnText
            }}</el-button>
          </el-form-item>
          <el-form-item label="新密码" :label-width="formLabelWidth">
            <el-input v-model="form.pwd" autocomplete="off" />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="dialogFormVisible = false">
              确认重置
            </el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>
</template>
<script lang='ts' setup>
import { reactive, ref, onMounted } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ilogin } from '@/api';
import { useRouter, useRoute } from "vue-router"
import { ElMessage } from 'element-plus'
import { encrypt_SM4 } from "@/util/crypto"

const tabNum = ref(0)

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
const route = useRoute()
interface RuleForm {
  sno: string,
  phone: string,
  password: string,

}

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  sno: '',
  phone: '',
  password: '',
})

const rules = reactive<FormRules<RuleForm>>({
  sno: [
    { required: true, message: '请输入学号', trigger: 'blur' },
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],

})

const submitForm = async (formEl: FormInstance | undefined) => {
  console.log(formEl);
  if (!formEl) return

  await formEl.validate(async (valid) => {
    let username: string
    if (tabNum.value) {
      username = ruleForm.phone
    } else {
      username = ruleForm.sno
    }
    if (valid) {
      //加密
      const res = encrypt_SM4(ruleForm.password)
      //判断学号或者手机号为纯数字
      if (!(username === parseInt(username).toString())) {
        openWarning(tabNum.value ? "手机号格式不正确" : "学号格式不正确")
        return
      }
      ilogin(username, res).then((res) => {
        console.log(res.data);

        console.log("登录成功");
        localStorage.setItem("access_i_token", res.data.access_token)
        const toPath = route.query.to
        openSuccess("登录成功")
        if (toPath) {
          router.push(`/${toPath}`)
        } else {
          router.push("/")
        }
      }).catch(() => {
        console.log('登录失败');
        openWarning(tabNum.value ? "手机号或密码不正确" : "学号或密码不正确")
      })
      // const { data } = await login(ruleForm.username, ruleForm.password)

      // if (data.code == 200) {
      //   localStorage.setItem("access-token", data.tokenValue)
      //   const toPath = route.query.to
      //   openSuccess(data.message)
      //   if (toPath) {
      //     router.push(`/${toPath}`)
      //   } else {
      //     router.push("/")
      //   }
      // } else {
      //   openWarning(data.message)
      // }

    } else {
      return
    }
  })
}


//忘记密码
const forgetPwd = () => {
  dialogFormVisible.value = true

}
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
//验证码倒计时
const yzmBtnText = ref<string>('')
const yzmBtnDisabled = ref(false)
let timer = ref()
const yzmCount = () => {
  yzmBtnDisabled.value = true
  let count = 60
  yzmBtnText.value = count + 's'
  clearInterval(timer.value)
  timer.value = setInterval(() => {
    count -= 1
    yzmBtnText.value = count + 's'
    if (count <= 0) {
      clearInterval(timer.value)
      yzmBtnText.value = "获取验证码"
      yzmBtnDisabled.value = false
    }
  }, 1000)

}
const form = reactive({
  phone: '',
  yzm: '',
  pwd: ''
})
onMounted(() => {
  yzmBtnText.value = "获取验证码"
})


</script>
<style lang='scss' scoped>
.tabActive {
  background-color: #dddddd;
}

.box {
  width: 25%;
  height: 70vh;
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 20px;
  margin: 40px auto;

  .tabs {
    display: flex;
    border-bottom: 2px solid rgba(0, 0, 0, 0.7);
    background-color: #f2f2f2;
    overflow: auto;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;

    div {
      width: 50%;
      height: 100px;
      line-height: 100px;
      text-align: center;
      font-size: 25px;
      font-weight: 500;
      cursor: pointer;


    }

  }

  .title {
    width: 100%;
    height: 100px;
    text-align: center;
    line-height: 100px;
    font-size: 20px;
  }

  .form {
    width: 100%;
    height: 500px;
    padding-right: 40px;
    box-sizing: border-box;
  }

}




.el-button--text {
  margin-right: 15px;
}

.el-select {
  width: 300px;
}

.el-input {
  width: 300px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>