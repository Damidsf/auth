<template>
  <div style="margin: 50px;">
    <el-form :inline="true">
      <el-form-item>
        <el-select v-model="value" class="m-2" placeholder="Select" size="large">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="value" class="m-2" placeholder="Select" size="large">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary">查询</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div style="margin-left: 60px;">
    <h2 style="margin-bottom: 20px;">修改密码</h2>
    <div style="width: 1000px;">
      <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm"
        :size="'default'" status-icon>
        <el-form-item label="原密码" prop="originPwd">
          <el-input type="password" v-model="ruleForm.originPwd" />
        </el-form-item>
        <el-form-item label="新密码" prop="newPwd">
          <el-input type="password" v-model="ruleForm.newPwd" />
        </el-form-item>
        <el-form-item label="确认密码" prop="surePass">
          <el-input type="password" v-model="ruleForm.surePass" />
        </el-form-item>
        <el-form-item label="验证码" prop="yzm">
          <el-input type="text" v-model="ruleForm.yzm" />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang='ts' setup>
import { ref, reactive } from "vue"
const value = ref('')
const options = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]

interface RuleForm {
  originPwd: string,
  newPwd: string,
  surePass: string,
  yzm: string
}
const ruleForm = reactive<RuleForm>({
  originPwd: '',
  newPwd: '',
  surePass: '',
  yzm: ''
})

const checkSurePass = (_: any, value: any, callback: any) => {
  if (value != ruleForm.newPwd) {
    callback(new Error('和新密码不符'))
  } else {
    callback()
  }
}
const rules = {
  originPwd: [
    { required: true, message: '请输入原密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码应为6到20位', trigger: 'blur' },
  ],
  newPwd: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码应为6到20位', trigger: 'blur' },
  ],
  surePass: [
    { required: true, message: '请输入确认密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码应为6到20位', trigger: 'blur' },
    { validator: checkSurePass, trigger: 'blur' }
  ],
}

</script>
<style lang='scss' scoped></style>