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
          @click="submitFormLogin(ruleFormRef)">
          登录
        </el-button>
        <el-button style="width: 390px;height: 40px;font-size: 20px;margin-left: 55px;margin-top: 10px;" type="primary"
          @click="submitFormRegister(ruleFormRef)">
          注册
        </el-button>
        <!-- <el-link :underline="false" type="primary" @click="goRegister" style="margin-right: 200px;">还没有账号?前往注册</el-link> -->
        <!-- <el-link style="margin-left: 60px;margin-top: 10px;" :underline="false" type="primary">忘记密码</el-link> -->
      </el-form>


      <!-- 修改密码框 -->
      <!-- <el-dialog v-model="dialogFormVisible" title="重置密码" width="600px">
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
      </el-dialog> -->
    </div>
  </div>
</template>
<script lang='ts' setup>
import { reactive, ref, onMounted, onBeforeMount } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { login, getPublicKey, register } from '@/api';
import { useRouter } from "vue-router"
import { ElMessage } from 'element-plus'
import { encrypt_SM4 } from "@/util/crypto"
onBeforeMount(async () => {
  await _getPublicKey()
  await setTimer()
})
const timer = ref()
const setTimer = () => {
  timer.value = setInterval(async () => {
    await _getPublicKey()
  }, 300000)
}
interface RSADATA {
  uuid: string,
  n: string,
  e: string
}
const RSACurrent = ref<RSADATA>({ uuid: "", n: "", e: "" })
const _getPublicKey = async () => {
  const res = await getPublicKey().catch(err => console.warn(err))
  if (!res) {
    openWarning("获取失败")
    return
  }
  if (res.data.status) {
    const RSAData = res.data.data
    RSACurrent.value = RSAData
  }
}


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

const submitFormLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return

  await formEl.validate(async (valid) => {
    let username: string
    if (tabNum.value) {
      username = ruleForm.phone
    } else {
      username = ruleForm.sno
    }
    if (valid) {
      const { e, n, uuid } = RSACurrent.value
      const sm4Key = randomSM4Key()
      const sm4Res = encrypt_SM4(ruleForm.password, sm4Key)
      const RSARes = modPow(BigInt(sm4Key), BigInt(e), BigInt(n)).toString()
      const res = await login(username, sm4Res, uuid, RSARes).catch(err => { openWarning("登录错误"); console.warn(err); return })
      if (!res) {
        openWarning("登录错误")
        return
      }
      if (res.data.status) {
        localStorage.setItem("access-token", res.data.data)
        openSuccess("登录成功")
        router.push("/")
      } else {
        openWarning("登录失败")
      }
    } else {
      return
    }
  })
}
const submitFormRegister = async (formEl: FormInstance | undefined) => {
  if (!formEl) return

  await formEl.validate(async (valid) => {
    let username: string
    if (tabNum.value) {
      username = ruleForm.phone
    } else {
      username = ruleForm.sno
    }
    if (valid) {
      const { e, n, uuid } = RSACurrent.value
      const sm4Key = randomSM4Key()
      const sm4Res = encrypt_SM4(ruleForm.password, sm4Key)
      const RSARes = modPow(BigInt(sm4Key), BigInt(e), BigInt(n)).toString()
      const res = await register(username, sm4Res, uuid, RSARes).catch(err => { openWarning("注册错误"); console.warn(err); return })
      if (!res) {
        openWarning("注册错误")
        return
      }
      if (res.data.status) {
        localStorage.setItem("access-token", res.data.data)
        openSuccess("注册成功")
        router.push("/")
      } else {
        openWarning("注册失败")
      }
    } else {
      return
    }
  })
}

const modPow = (base: bigint, exponent: bigint, modulus: bigint) => {
  let result = 1n;
  base = base % modulus;
  while (exponent > 0) {
    if (exponent % 2n === 1n) {
      result = (result * base) % modulus;
    }
    exponent = exponent >> 1n;
    base = (base * base) % modulus;
  }
  return Number(result);
}

const randomSM4Key = () => {
  let firstDigit = Math.floor(Math.random() * 15) + 1;
  let firstHex = firstDigit.toString(16);

  // 生成剩余的15个16进制数
  let remainingHex = Array.from({ length: 15 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

  // 返回拼接后的字符串
  return firstHex + remainingHex;
}

// //忘记密码
// const forgetPwd = () => {
//   dialogFormVisible.value = true

// }
// const dialogFormVisible = ref(false)
// const formLabelWidth = '140px'
// //验证码倒计时
// const yzmBtnText = ref<string>('')
// const yzmBtnDisabled = ref(false)
// let timer = ref()
// const yzmCount = () => {
//   yzmBtnDisabled.value = true
//   let count = 60
//   yzmBtnText.value = count + 's'
//   clearInterval(timer.value)
//   timer.value = setInterval(() => {
//     count -= 1
//     yzmBtnText.value = count + 's'
//     if (count <= 0) {
//       clearInterval(timer.value)
//       yzmBtnText.value = "获取验证码"
//       yzmBtnDisabled.value = false
//     }
//   }, 1000)

// }
// const form = reactive({
//   phone: '',
//   yzm: '',
//   pwd: ''
// })
onMounted(() => {

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