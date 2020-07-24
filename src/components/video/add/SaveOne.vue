<template>
  <div class="saveOne">
    <Form :model="video"></Form>
    <div class="btn-group">
      <el-button type="success" round @click="submit()">添加</el-button>
      <el-button type="primary" round @click="cancel()">取消</el-button>
    </div>
  </div>
</template>

<script>
import Form from '@/components/video/Form.vue'
export default {
  name: 'SaveOne',
  components: {
    Form
  },
  data () {
    return {
      video: {
        title: '',
        mediaId: this.$route.query.media_id,
        filepath: '',
        filename: '',
        quality: '',
        orderInMedia: 1,
        partNumber: '1',
        partUnit: '话'
      }
    }
  },
  methods: {
    // 提交视频列表
    async submit () {
      const { data: result } = await this.$http.post('/admin/video', this.video)
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
      this.$router.push({ path: '/video', query: { media_id: this.$route.query.media_id } })
    },
    // 取消添加
    cancel () {
      this.$router.push({ path: '/video', query: { media_id: this.$route.query.media_id } })
    }
  }
}
</script>

<style>
</style>
