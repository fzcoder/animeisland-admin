<template>
  <div class="container">
    <el-page-header @back="goBack()" content="修改视频">
    </el-page-header>
    <Form :model="form"></Form>
    <div class="btn-group">
      <el-button type="primary" round @click="update()">修改</el-button>
      <el-button type="success" round @click="getCategory()">还原</el-button>
      <el-button round @click="cancel()">取消</el-button>
    </div>
  </div>
</template>

<script>
import Form from '@/components/category/Form.vue'
export default {
  name: 'Update',
  components: {
    Form
  },
  data () {
    return {
      form: {}
    }
  },
  created () {
    this.getCategory()
  },
  methods: {
    async getCategory () {
      const { data: result } = await this.$http.get(`/admin/category/${this.$route.params.id}`)
      if (result.status !== 200) {
        return this.$message({
          message: result.message,
          type: 'error',
          offset: 60
        })
      }
      this.form = result.data
    },
    // 修改番剧信息
    async update () {
      // 向服务器发送put请求
      const { data: result } = await this.$http.put('/admin/category', this.form)
      if (result.status !== 200) {
        // 返回错误信息
        return this.$message({
          message: result.message,
          type: 'error',
          offset: 60
        })
      }
      // 显示成功信息
      this.$message({
        message: result.message,
        type: 'success',
        offset: 60
      })
      // 跳转到视频列表
      this.$router.push('/category')
    },
    // 取消修改
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
