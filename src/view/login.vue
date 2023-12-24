<template>
  <div class="form">
    <el-form ref="ruleFormRef" :rules="rules" :label-position="'top'" :model="ruleForm" label-width="100px"
      style="max-width: 460px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" size="large" />
      </el-form-item>

      <el-form-item style="margin-top: 40px;" label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" size="large" />
      </el-form-item>
      <el-button type="primary" @click="submitFormLogin(ruleFormRef)">
        登录
      </el-button>
      <el-button type="primary" @click="submitFormRegister(ruleFormRef)">
        注册
      </el-button>
    </el-form>
  </div>
</template>
<script lang='ts' setup>
import { reactive, ref, onBeforeMount } from 'vue'
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
  // console.log(res);

  if (!res) {
    openWarning("获取失败")
    return
  }
  if (res.data.status) {
    const RSAData = res.data.data
    RSACurrent.value = RSAData
    console.log(RSACurrent.value);

  }
}
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
  username: string
  password: string,

}


const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  username: '',
  password: '',
})

const rules = reactive<FormRules<RuleForm>>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],

})

const submitFormLogin = async (formEl: FormInstance | undefined) => {
  if (!formEl) return

  await formEl.validate(async (valid) => {
    if (valid) {
      const { e, n, uuid } = RSACurrent.value
      console.log(e, n, uuid);
      const username = ruleForm.username
      const sm4Key = randomSM4Key()
      console.log("sm4key", sm4Key);
      const sm4Res = encrypt_SM4(ruleForm.password, sm4Key)
      console.log(sm4Res);

      const RSARes = modPow(BigInt(parseInt(sm4Key)), BigInt(parseInt(e)), BigInt(parseInt(n))).toString()
      console.log(username, sm4Res, uuid, RSARes);
      const res = await login(username, sm4Res, uuid, RSARes).catch(err => { console.warn(err) })
      console.log(res);

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
    if (valid) {
      const { e, n, uuid } = RSACurrent.value
      const sm4Key = randomSM4Key()
      console.log("sm4key", sm4Key);
      const username = ruleForm.username
      const sm4Res = encrypt_SM4(ruleForm.password, sm4Key)
      const RSARes = modPow(BigInt(parseInt(sm4Key)), BigInt(parseInt(e)), BigInt(parseInt(n))).toString()
      const res = await register(username, sm4Res, uuid, RSARes).catch(err => { openWarning("注册错误"); console.warn(err); return })
      if (!res) {
        openWarning("注册错误")
        return
      }
      console.log(res);

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
  const arr = "0123456789"
  let firstHex = arr[Math.floor(Math.random() * 9) + 1];

  let remainingHex = Array.from({ length: 15 }, () => arr[Math.floor(Math.random() * 10)]).join('');

  return firstHex + remainingHex;
}

</script>
<style lang='scss' scoped></style>