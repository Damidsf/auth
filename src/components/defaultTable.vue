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
        <slot name="button"></slot>
      </el-form-item>
    </el-form>

    <!-- 可用插槽 -->
    <slot name="table"></slot>
    <h2>{{ title }}</h2>
    <el-table v-if="!$slots.table" :data="tableData" style="width: 100%">
      <el-table-column fixed prop="id" label="id" width="120" />
      <el-table-column prop="name" label="name" width="200" />
      <el-table-column prop="info" label="info" width="200" />
      <el-table-column prop="data" label="data" width="300" />
      <el-table-column fixed="right" label="action" width="300">
        <template #default>
          <el-button link type="primary" size="small" @click="handleClick">编辑</el-button>
          <el-button link type="primary" size="small">详情</el-button>
          <el-button link type="primary" size="small">更多</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script lang='ts' setup>
import { ref } from "vue"
defineProps(['title'])
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

const handleClick = () => {
  console.log('click')
}

const tableData = [
  {
    id: '1',
    name: 'Tom',
    info: 'California',
    data: 'Los Angeles',
  },
  {
    id: '2',
    name: 'Tom',
    info: 'California',
    data: 'Los Angeles',
  },
  {
    id: '3',
    name: 'Tom',
    info: 'California',
    data: 'Los Angeles',
  },
  {
    id: '4',
    name: 'Tom',
    info: 'California',
    data: 'Los Angeles',
  },
]
</script>
<style lang='scss' scoped></style>