<template>
  <div class="container">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">控制台</el-breadcrumb-item>
      <el-breadcrumb-item>系列管理</el-breadcrumb-item>
    </el-breadcrumb>
    <Model type="series" @saveOne="gotoPath('/series/add')"></Model>
  </div>
</template>

<script>
import Model from '@/components/common/Model.vue'
export default {
  name: 'Series',
  components: {
    Model
  },
  methods: {
    gotoPath (url) {
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
