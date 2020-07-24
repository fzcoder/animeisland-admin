<template>
  <div class="container">
    <el-page-header @back="goBack" content="添加系列">
    </el-page-header>
    <Form :model="series"></Form>
    <div class="btn-group">
      <el-button type="success" round @click="submit()">添加</el-button>
      <el-button type="primary" round @click="cancel()">取消</el-button>
    </div>
  </div>
</template>

<script>
import Form from '@/components/series/Form.vue'
export default {
  name: 'Add',
  components: {
    Form
  },
  data () {
    return {
      series: {
        nameZh: '',
        nameOrigin: '',
        introduction: '',
        type: 0
      }
    }
  },
  methods: {
    // 提交视频列表
    async submit () {
      const { data: result } = await this.$http.post('/admin/series', this.series)
      if (result.status !== 200) {
        return this.$message({
          message: result.message,
          type: 'error',
          offset: 60
        })
      }
      this.$message({
        message: result.message,
        type: 'success',
        offset: 60
      })
      this.$router.push('/series')
    },
    // 取消添加
    cancel () {
      this.$router.push('/series')
    },
    goBack () {
      this.$router.push('/series')
    }
  }
}
</script>

<style>
</style>
