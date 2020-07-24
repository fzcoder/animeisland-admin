<template>
  <div class="container">
    <el-tabs v-model="Switch.activeTab" tab-position="top" :stretch="false">
      <el-tab-pane label="基本信息" name="part1">
        <BaseInfo :model="form"></BaseInfo>
      </el-tab-pane>
      <el-tab-pane label="扩展信息" name="part2">
        <ExtendInfo :model="form"></ExtendInfo>
      </el-tab-pane>
      <el-tab-pane label="索引信息" name="part3">
        <SearchInfo :model="form"></SearchInfo>
      </el-tab-pane>
      <el-tab-pane label="推荐信息" name="part4">
        <OtherInfo :model="form"></OtherInfo>
      </el-tab-pane>
    </el-tabs>
    <div class="btn-group">
      <el-button type="primary" round @click="update()">修改</el-button>
      <el-button type="success" round @click="getMedia()">还原</el-button>
      <el-button round @click="cancel()">取消</el-button>
    </div>
  </div>
</template>

<script>
import BaseInfo from '@/components/media/form/BaseInfo.vue'
import ExtendInfo from '@/components/media/form/ExtendInfo.vue'
import SearchInfo from '@/components/media/form/SearchInfo.vue'
import OtherInfo from '@/components/media/form/OtherInfo.vue'
export default {
  name: 'Update',
  components: {
    BaseInfo,
    ExtendInfo,
    SearchInfo,
    OtherInfo
  },
  data () {
    return {
      form: {},
      Switch: {
        activeTab: 'part1'
      }
    }
  },
  created () {
    this.getMedia()
  },
  methods: {
    // 获取番剧信息
    async getMedia () {
      const { data: result } = await this.$http.get('/admin/media/' + this.$route.params.id)
      this.form = result.data
    },
    // 修改番剧信息
    async update () {
      // 向服务器发送put请求
      const { data: result } = await this.$http.put('/admin/media', this.form)
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
      // 跳转到番剧管理界面
      this.$router.push('/media')
    },
    // 取消修改
    cancel () {
      this.$router.back(-1)
    }
  }
}
</script>

<style>
</style>
