<template>
  <defaultTable>
    <template #button>
      <el-button type="primary" @click="createUser">创建</el-button>
    </template>
    <template #table>
      <h2>用户管理</h2>
      <el-table :data="currentUserList" style="width: 100%">
        <el-table-column fixed prop="uuid" label="uuid" width="200" />
        <el-table-column prop="username" label="用户名" width="200" />
        <el-table-column prop="phone" label="手机号" width="200" />
        <el-table-column prop="organization" label="组织" width="200" />
        <el-table-column fixed="right" label="操作" width="300">
          <template #default="{ row }">
            <el-button link type="primary" size="small">添加</el-button>
            <el-button link type="primary" size="small" @click="editUser(row)">编辑</el-button>
            <el-button link type="primary" size="small">禁用</el-button>
            <el-button link type="primary" size="small">启用</el-button>
            <el-button link type="primary" size="small" @click="open(row)">删除</el-button>

            <el-button link type="primary" size="small" @click="search(row)">查阅</el-button>
          </template>
        </el-table-column>
      </el-table>


      <el-dialog v-model="createDialogVisible" :title="'创建用户'">
        <el-form :model="createForm" label-width="120px">
          <el-form-item label="用户名">
            <el-input v-model="createForm.username" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="createForm.password" />
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="createForm.phone" />
          </el-form-item>
          <el-form-item label="权限">
            <el-select v-model="createForm.Permissions" placeholder="请选择用户权限">
              <el-option label="普通用户" value="ROLE_USER" />
              <el-option label="管理员" value="ROLE_ADMIN" />
              <el-option label="超级管理员" value="ROLE_SPADMIN" />
            </el-select>
          </el-form-item>
          <el-form-item label="组织">
            <el-select v-model="createForm.orgnization" placeholder="请选择用户所属组织">
              <el-option label="组织0" value="0" />
              <el-option label="组织1" value="1" />
              <el-option label="组织2" value="2" />
              <el-option label="组织3" value="3" />
            </el-select>
          </el-form-item>
          <el-form-item label="职位">
            <el-select v-model="createForm.job" placeholder="请选择用户职位">
              <el-option label="经理" value="0" />
              <el-option label="测试" value="1" />
              <el-option label="开发" value="2" />
              <el-option label="财富" value="3" />
            </el-select>
          </el-form-item>
          <el-form-item label="密码有效时间">
            <el-col :span="11">
              <el-date-picker v-model="createForm.date" type="date" placeholder="有效日期" style="width: 100%" />
            </el-col>
            <el-col :span="11">
              <el-time-picker v-model="createForm.time" placeholder="有效时间" style="width: 100%" />
            </el-col>
          </el-form-item>
          <el-form-item label="是否禁用">
            <el-switch v-model="createForm.disable" />
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="createForm.desc" type="textarea" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">创建用户</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

      <el-dialog v-model="editDialogVisible" :title="'编辑用户'">
        <el-form :model="editForm" label-width="120px">
          <el-form-item label="用户名">
            <el-input v-model="editForm.username" />
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="editForm.password" />
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="editForm.phone" />
          </el-form-item>
          <el-form-item label="权限">
            <el-select v-model="editForm.Permissions" placeholder="请选择用户权限">
              <el-option label="普通用户" value="ROLE_USER" />
              <el-option label="管理员" value="ROLE_ADMIN" />
              <el-option label="超级管理员" value="ROLE_SPADMIN" />
            </el-select>
          </el-form-item>
          <el-form-item label="组织">
            <el-select v-model="editForm.orgnization" placeholder="请选择用户所属组织">
              <el-option label="组织0" value="0" />
              <el-option label="组织1" value="1" />
              <el-option label="组织2" value="2" />
              <el-option label="组织3" value="3" />
            </el-select>
          </el-form-item>
          <el-form-item label="职位">
            <el-select v-model="editForm.job" placeholder="请选择用户职位">
              <el-option label="经理" value="0" />
              <el-option label="测试" value="1" />
              <el-option label="开发" value="2" />
              <el-option label="财富" value="3" />
            </el-select>
          </el-form-item>
          <el-form-item label="密码有效时间">
            <el-col :span="11">
              <el-date-picker v-model="editForm.date" type="date" placeholder="有效日期" style="width: 100%" />
            </el-col>
            <el-col :span="11">
              <el-time-picker v-model="editForm.time" placeholder="有效时间" style="width: 100%" />
            </el-col>
          </el-form-item>
          <el-form-item label="是否禁用">
            <el-switch v-model="editForm.disable" />
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="editForm.desc" type="textarea" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="sureChange">确认</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>

      <el-dialog v-model="searchDialogVisible" title="">
        <el-descriptions class="margin-top" title="" :column="2" :size="'default'" border>
          <!-- <template #extra>
          <el-button type="primary">Operation</el-button>
        </template> -->
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon>
                  <user />
                </el-icon>
                用户名
              </div>
            </template>
            {{ searchData.username }}
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
            {{ searchData.phone ? searchData.phone : "暂未设置" }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                uuid
              </div>
            </template>
            {{ searchData.uuid }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon>
                  <tickets />
                </el-icon>
                密码
              </div>
            </template>
            {{ searchData.password ? searchData.password : "暂未设置" }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                <el-icon>
                  <office-building />
                </el-icon>
                组织
              </div>
            </template>
            {{ searchData.organization }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                创建时间
              </div>
            </template>
            {{ searchData.createTime }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                创建人
              </div>
            </template>
            {{ searchData.createBy }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                最近更新时间
              </div>
            </template>
            {{ searchData.updateTime }}
          </el-descriptions-item>
          <el-descriptions-item>
            <template #label>
              <div class="cell-item">
                最近更新人
              </div>
            </template>
            {{ searchData.updateBy }}
          </el-descriptions-item>
        </el-descriptions>
      </el-dialog>

    </template>
  </defaultTable>
</template>
<script lang='ts' setup>
import defaultTable from '@/components/defaultTable.vue';
import { ElMessage, ElMessageBox } from 'element-plus'
import { getUserList, getUserDataByUuid, deleteUser } from "@/api/index"
import { onBeforeMount, ref, reactive } from "vue"
import {
  Iphone,
  OfficeBuilding,
  Tickets,
  User,
} from '@element-plus/icons-vue'
const open = (data: any) => {
  ElMessageBox.confirm(
    "确认要删除吗",
    'Warning',
    {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }
  )
    .then(() => {
      del(data)
    })
    .catch(() => {

    })
}
const currentUserList = ref()
const statticData = [{
  uuid: "1",
  username: "miku",
  phone: "123",
  orgnization: "1"

}, {
  uuid: "2",
  username: "luka",
  phone: "456",
  orgnization: "1"

}, {
  uuid: "3",
  username: "rin",
  phone: "789",
  orgnization: "1"

}]
onBeforeMount(async () => {
  await _getUserList()
})
const _getUserList = async () => {
  const res = await getUserList(1, 1).catch(err => { console.warn(err); currentUserList.value = statticData; return; })
  console.log(res);

  if (!res) return
  if (res.data.status) {
    console.log("获取成功");
    currentUserList.value = res.data.data
  } else {
    console.log("获取失败");
  }
}


const del = async (data: any) => {
  console.log(data.uuid);
  return
  const res = await deleteUser(data.uuid).catch(err => { console.warn(err); return })
  if (!res) return
  ElMessage({
    type: 'success',
    message: '删除成功',
  })
  await _getUserList()
}

//创建用户
const createForm = reactive({
  username: '',
  password: '',
  phone: "",
  Permissions: '',
  orgnization: '',
  job: "",
  date: '',
  time: '',
  disable: false,
  desc: '',
})
const createDialogVisible = ref(false)
const createUser = () => {
  createDialogVisible.value = true
}
const onSubmit = () => {
  createDialogVisible.value = false
}

//编辑用户
const editDialogVisible = ref(false)
const editForm = reactive({
  username: 'xxxx',
  password: "",
  phone: "",
  Permissions: 'ROLE_USER',
  orgnization: '0',
  job: "0",
  date: '',
  time: '',
  disable: false,
  desc: '',
})
const editUser = (data: any) => {
  editDialogVisible.value = true
  console.log(data);
  editForm.phone = data.phone
  editForm.username = data.username
  editForm.orgnization = data.organization
}
const sureChange = () => {
  editDialogVisible.value = false
}

//查阅用户
const searchDialogVisible = ref(false)
let searchData = reactive({
  "uuid": "d7cc2108-8b44-43b6-ac69-9baaaebcdc55",
  "username": "lisa",
  "password": null,
  "organization": 0,
  "phone": null,
  "createTime": "2023-11-28T18:31:50.313179600",
  "updateTime": null,
  "createBy": "d7cc2108-8b44-43b6-ac69-9baaaebcdc55",
  "updateBy": null
})
const search = async (data: any) => {
  const res = await getUserDataByUuid(data.uuid).catch(err => { console.warn(err); searchDialogVisible.value = true; return })
  if (!res) return
  if (res.data.status) {
    // console.log("获取成功");
    // console.log(res.data);
    searchData = res.data.data
    searchDialogVisible.value = true


  } else {
    console.log("获取失败");

  }
}
</script>
<style lang='scss' scoped>
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