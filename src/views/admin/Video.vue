<template>
  <div class="container">
    <el-page-header @back="goBack" content="视频列表">
    </el-page-header>
    <Model type="video" @saveOne="saveOne()" @saveBatch="saveBatch()"></Model>
  </div>
</template>

<script>
import Model from '@/components/common/Model.vue'
export default {
  name: 'Video',
  components: {
    Model
  },
  methods: {
    // 单个添加
    saveOne () {
      this.$router.push({ path: '/video/add', query: { media_id: this.$route.query.media_id, mode: 'one' } })
    },
    // 批量添加
    saveBatch () {
      this.$router.push({ path: '/video/add', query: { media_id: this.$route.query.media_id, mode: 'batch' } })
    },
    // 退回上一页面
    goBack () {
      this.$router.push('/media')
    }
  }
}
</script>

<style lang="less" scoped>
.el-page-header {
  margin-bottom: 15px;
}
</style>
