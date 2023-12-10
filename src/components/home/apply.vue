<template>
  <div class="box">
    <el-tabs type="border-card">
      <el-tab-pane label="个人信息">
        <div style="display: flex;width: 1000px; margin: 20px;">
          <el-button type="primary" style="width:100px;height: 40px;font-size: 20px;">
            新建
          </el-button>
          <el-button type="primary" style="width:100px;height: 40px;font-size: 20px;">
            撤销
          </el-button>
          <el-button type="primary " style="width:100px;height: 40px;font-size: 20px;">
            权限修改
          </el-button>
        </div>
        <div style="margin-top: 20px;">
          <div style="margin: 20px;font-size: 20px;">编号:</div>
          <div style="margin: 20px;font-size: 20px;display: flex;">
            <div style="width: 300px;">姓名:</div>
            <div style="width: 300px;">性别:</div>
            <div style="width: 300px;">出生日期:</div>
          </div>
          <div style="margin: 20px;font-size: 20px;">
            手机号:
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="修改申请">
        <el-table :data="tableData" style="width: 100%">
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

      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script lang='ts' setup>


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
<style lang='scss' scoped>
.box {
  padding: 50px;
}
</style>