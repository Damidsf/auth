<template>
  <defaultTable>
    <template #table>
      <h2>用户管理</h2>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column fixed prop="id" label="编号" width="120" />
        <el-table-column prop="name" label="姓名" width="200" />
        <el-table-column prop="info" label="info" width="200" />
        <el-table-column fixed="right" label="操作" width="300">
          <template #default>
            <el-button link type="primary" size="small">添加</el-button>
            <el-button link type="primary" size="small">编辑</el-button>
            <el-button link type="primary" size="small">禁用</el-button>
            <el-button link type="primary" size="small">启用</el-button>
            <el-button link type="primary" size="small">删除</el-button>
            <el-button link type="primary" size="small">查阅</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

  </defaultTable>
</template>
<script lang='ts' setup>
import defaultTable from '@/components/defaultTable.vue';

const tableData = [
  {
    id: '1',
    name: 'Tom',
    info: 'California',

  },
  {
    id: '2',
    name: 'Tom',
    info: 'California',

  },
  {
    id: '3',
    name: 'Tom',
    info: 'California',

  },
  {
    id: '4',
    name: 'Tom',
    info: 'California',

  },
]
</script>
<style lang='scss' scoped></style>