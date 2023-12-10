<template>
  <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm" :size="formSize"
    status-icon>
    <el-form-item label="用户名" prop="username">
      <el-input v-model="ruleForm.username" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="ruleForm.password" />
    </el-form-item>
    <el-form-item label="确认密码" prop="password">
      <el-input type="password" v-model="ruleForm.surePassword" />
    </el-form-item>
    <el-form-item>
      <el-link :underline="false" type="primary" @click="goLogin">已有账号,直接前往登录</el-link>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">
        注册
      </el-button>

    </el-form-item>
  </el-form>
</template>
<script lang='ts' setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { register } from '@/api';
import { useRouter } from "vue-router"
import { ElMessage } from 'element-plus'

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
// const route = useRoute()
interface RuleForm {
  username: string,
  password: string,
  surePassword: string,

}

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  username: '',
  password: '',
  surePassword: ''
})

const surePassRule = (_: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== ruleForm.password) {
    callback(new Error("两次输入不一致"))
  } else {
    callback()
  }
}
const rules = reactive<FormRules<RuleForm>>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ],
  surePassword: [
    { validator: surePassRule, trigger: 'blur' }
  ]

})

const submitForm = async (formEl: FormInstance | undefined) => {
  console.log(formEl);

  if (!formEl) return
  await formEl.validate(async (valid) => {
    if (valid) {
      const { data } = await register(ruleForm.username, ruleForm.password)
      console.log(data);
      if (data.code == 200) {
        openSuccess("注册成功,正在前往登录")
        router.push("/login")
        // if (toPath) {
        //   router.push(`/${toPath}`)
        // } else {
        //   router.push("/")
        // }
      } else {
        openWarning(data.message)
      }

    } else {
      return
    }
  })
}



const goLogin = () => {
  router.push('/login')
}

</script>
<style lang='scss' scoped></style>