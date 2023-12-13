<template>
  <defaultTable>
    <template #table>
      <h2>用户管理</h2>
      <el-table :data="currentUserList" style="width: 100%">
        <el-table-column fixed prop="uiid" label="uuid" width="200" />
        <el-table-column prop="username" label="用户名" width="200" />
        <el-table-column prop="phone" label="手机号" width="200" />
        <el-table-column prop="orgnization" label="组织" width="200" />
        <el-table-column fixed="right" label="操作" width="300">
          <template #default="{ row }">
            <el-button link type="primary" size="small">添加</el-button>
            <el-button link type="primary" size="small">编辑</el-button>
            <el-button link type="primary" size="small">禁用</el-button>
            <el-button link type="primary" size="small">启用</el-button>
            <el-button link type="primary" size="small" @click="del(row)">删除</el-button>

            <el-button link type="primary" size="small" @click="search(row)">查阅</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

  </defaultTable>
</template>
<script lang='ts' setup>
import defaultTable from '@/components/defaultTable.vue';
import { getUserList, getUserDataByUuid, deleteUser } from "@/api/index"
import { onBeforeMount, ref } from "vue"
const currentUserList = ref()
onBeforeMount(async () => {
  await _getUserList()
})
const _getUserList = async () => {
  const res = await getUserList(1, 1).catch(err => { console.warn(err); return; })
  if (!res) return
  if (res.data.status) {
    console.log("获取成功");
    currentUserList.value = res.data.data
  } else {
    console.log("获取失败");
  }
}

const search = async (data: any) => {
  const res = await getUserDataByUuid(data.uuid).catch(err => { console.warn(err); return })
  if (!res) return
  if (res.data.status) {
    console.log("获取成功");
  } else {

    console.log("获取失败");

  }
}

const del = async (data: any) => {
  const res = await deleteUser(data.uuid).catch(err => { console.warn(err); return })
  if (!res) return
  await _getUserList()
}

// const tableData = [
//   {
//     uuid: '1',
//     name: 'Tom',
//     phone: 'California',
//     orgnization:"0"

//   }
// ]
</script>
<style lang='scss' scoped></style>