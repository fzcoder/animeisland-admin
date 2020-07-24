<template>
  <div class="updateBatch">
    <Dialog :visible.sync="visible" @update="batchSetting"></Dialog>
    <el-page-header @back="goBack" content="修改视频">
    </el-page-header>
    <div class="btn-group">
      <el-button type="primary" size="small" @click="openDialog()">批量设置</el-button>
      <el-button type="warning" size="small" icon="el-icon-edit" @click="update()">修改</el-button>
      <el-button type="info" size="small" icon="el-icon-refresh" @click="getVideoList()">还原</el-button>
    </div>
    <List :list="list"></List>
  </div>
</template>

<script>
import qs from 'qs'
import List from '@/components/video/List.vue'
import Dialog from '@/components/video/BatchSetting.vue'
export default {
  name: 'UpdateBatch',
  components: {
    List,
    Dialog
  },
  data () {
    return {
      // 视频列表
      list: [],
      // 控制对话框显示
      visible: false
    }
  },
  created () {
    this.getVideoList()
  },
  methods: {
    // 获取修改视频列表
    async getVideoList () {
      // 路径参数
      const params = qs.stringify(this.$route.query.idList)
      // 异步请求
      const { data: result } = await this.$http.get('/admin/video?' + params)
      if (result.status !== 200) {
        return this.$message({
          message: result.message,
          type: 'error',
          offset: 60
        })
      }
      this.list = result.data
    },
    // 批量设置
    batchSetting (setting) {
      for (var i = 0; i < this.list.length; i++) {
        this.list[i].filepath = setting.filepath
        this.list[i].quality = setting.quality
      }
    },
    // 更新
    async update () {
      const { data: result } = await this.$http.put('/admin/video/batch', this.list)
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
      this.goBack()
    },
    // 打开对话框
    openDialog () {
      this.visible = true
    },
    // 返回上一级
    goBack () {
      this.$router.back(-1)
    }
  }
}
</script>

<style>
</style>
