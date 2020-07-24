<template>
  <div class="container">
    <el-page-header @back="goBack" content="添加目录">
    </el-page-header>
    <Form :model="category"></Form>
    <div class="btn-group">
      <el-button type="success" round @click="submit()">添加</el-button>
      <el-button type="primary" round @click="cancel()">取消</el-button>
    </div>
  </div>
</template>

<script>
import Form from '@/components/category/Form.vue'
export default {
  name: 'Add',
  components: {
    Form
  },
  data () {
    return {
      category: {
        name: '',
        value: '',
        type: '',
        description: ''
      }
    }
  },
  methods: {
    // 提交视频列表
    async submit () {
      const { data: result } = await this.$http.post('/admin/category', this.category)
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
      this.$router.push('/category')
    },
    // 取消添加
    cancel () {
      this.$router.push('/category')
    },
    goBack () {
      this.$router.push('/category')
    }
  }
}
</script>

<style>
</style>
