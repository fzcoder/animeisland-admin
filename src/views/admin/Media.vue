<template>
  <div class="container">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">控制台</el-breadcrumb-item>
      <el-breadcrumb-item>番剧管理</el-breadcrumb-item>
    </el-breadcrumb>
    <Model type="media" @saveOne="gotoPage('/media/add')" @saveBatch="saveBatch"></Model>
  </div>
</template>

<script>
import Model from '@/components/common/Model.vue'
export default {
  name: 'Media',
  components: {
    Model
  },
  methods: {
    // 批量添加
    saveBatch () {
      this.$message({
        message: '批量添加功能暂未开放!',
        type: 'info',
        offset: 60
      })
    },
    // 批量修改
    updateBatch () {
      this.$message({
        message: '批量修改功能暂未开放!',
        type: 'info',
        offset: 60
      })
    },
    gotoPage (url) {
      this.$router.push(url)
    }
  }
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 15px;
}
</style>
