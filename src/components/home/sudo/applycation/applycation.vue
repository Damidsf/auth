<template>
  <defaultTable>

    <template #table>
      <h2>管理数据表</h2>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column fixed prop="id" label="应用编码" width="120" />
        <el-table-column prop="name" label="应用名称" width="200" />
        <el-table-column prop="type" label="应用类型" width="200" />
        <el-table-column prop="group" label="应用分组" width="200" />
        <el-table-column prop="authType" label="认证类型" width="200" />
        <el-table-column fixed="right" label="操作" width="300">
          <template #default>
            <el-button link type="primary" size="small">编辑</el-button>
            <el-button link type="primary" size="small">详情</el-button>
            <el-button link type="primary" size="small">更多</el-button>

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
    type: 'California',
    group: '分组',
    authType: "认证类型"

  },
  {
    id: '2',
    name: 'Tom',
    type: 'California',
    group: '分组',
    authType: "认证类型"

  },
  {
    id: '3',
    name: 'Tom',
    type: 'California',
    group: '分组',
    authType: "认证类型"

  },
  {
    id: '4',
    name: 'Tom',
    type: 'California',
    group: '分组',
    authType: "认证类型"

  },

]
</script>
<style lang='scss' scoped></style>

