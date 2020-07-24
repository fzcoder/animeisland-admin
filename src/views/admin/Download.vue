<template>
  <div class="container">
    <el-tabs>
      <el-tab-pane label="正在下载">
        <div>
          <el-progress :percentage="60"></el-progress>
        </div>
      </el-tab-pane>
      <el-tab-pane label="已完成"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
</script>

<style>
</style>
