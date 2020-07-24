<template>
  <div class="container">
    <el-page-header @back="goBack" content="修改视频">
    </el-page-header>
    <Form :model="form"></Form>
    <div class="btn-group">
      <el-button type="primary" round @click="update()">修改</el-button>
      <el-button type="success" round @click="getVideo()">还原</el-button>
      <el-button round @click="cancel()">取消</el-button>
    </div>
  </div>
</template>

<script>
import Form from '@/components/video/Form.vue'
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
    this.getVideo()
  },
  methods: {
    async getVideo () {
      const { data: result } = await this.$http.get(`/admin/video/${this.$route.params.id}`)
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
      const { data: result } = await this.$http.put('/admin/video', this.form)
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
      this.$router.push({ path: '/video', query: { media_id: this.form.mediaId } })
    },
    // 取消修改
    cancel () {
      this.$router.push({ path: '/video', query: { media_id: this.form.mediaId } })
    },
    goBack () {
      this.$router.push({ path: '/video', query: { media_id: this.form.mediaId } })
    }
  }
}
</script>

<style>
</style>
