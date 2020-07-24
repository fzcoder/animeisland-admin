<template>
  <div class="header-content">
    <div class="head-left">
      <div class="brand" style="color: #FFF;">
        <i class="el-icon-s-tools"></i>
        <span>动漫岛后台管理系统</span>
      </div>
      <div style="-webkit-app-region: no-drag;">
        <el-button type="text" icon="el-icon-download" style="color: #FFF;" @click="() => { this.$router.push('/download') }"></el-button>
        <el-button type="text" icon="el-icon-s-tools" style="color: #FFF;"></el-button>
      </div>
    </div>
    <div class="btn-group">
      <el-button type="text" icon="el-icon-minus" style="color: #FFF;" @click="minimize()"></el-button>
      <el-button type="text" icon="el-icon-full-screen" style="color: #FFF;" @click="maximize()"></el-button>
      <el-button type="text" icon="el-icon-close" style="color: #FFF;" @click="close()"></el-button>
    </div>
  </div>
</template>

<script>
const { ipcRenderer } = require('electron')
export default {
  name: 'Header',
  methods: {
    // 窗口最大化
    maximize () {
      ipcRenderer.send('maximize')
    },
    // 窗口最小化
    minimize () {
      ipcRenderer.send('minimize')
    },
    // 关闭窗口
    close () {
      ipcRenderer.send('close')
    }
  }
}
</script>

<style lang="less" scoped>
  .header-content {
    background-color: #393D49;
    height: inherit;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .head-left {
      display: flex;
      justify-content: flex-start;
      align-items: center;
    }
    -webkit-app-region: drag; // 窗口可拖动
    .btn-group {
      -webkit-app-region: no-drag; // 窗口不可拖动
    }
  }
</style>
