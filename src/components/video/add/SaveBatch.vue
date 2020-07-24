<template>
  <div class="saveBatch">
    <Dialog :visible.sync="visible" @update="batchSet"></Dialog>
    <div class="btn-group">
      <div class="btn-group-left">
        <el-button type="primary" size="small" @click="getFileList()">选择视频</el-button>
        <el-button type="success" size="small" @click="openBatchSettingDialog">批量设置</el-button>
      </div>
      <div class="btn-group-right">
        <el-button type="primary" size="small" @click="submit()">提交</el-button>
        <el-button type="danger" size="small">移除</el-button>
        <el-button type="info" size="small" @click="clear()">清空</el-button>
      </div>
    </div>
    <List :list="list"></List>
  </div>
</template>

<script>
import List from '@/components/video/List.vue'
import Dialog from '@/components/video/BatchSetting.vue'
const { ipcRenderer } = require('electron')
export default {
  name: 'SaveBatch',
  components: {
    List,
    Dialog
  },
  data () {
    return {
      list: [],
      visible: false
    }
  },
  methods: {
    // 获取选择的文件列表
    getFileList () {
      // 向主进程发送打开文件选择对话框请求
      const result = ipcRenderer.sendSync('open-directory-dialog', ['openFile', 'multiSelections'])
      if (result !== null) {
        const start = this.list.length
        for (var i = 0; i < result.length; i++) {
          var video = {
            title: '',
            mediaId: this.$route.query.media_id,
            filepath: '',
            filename: '',
            quality: '',
            orderInMedia: 0,
            partNumber: 0,
            partUnit: '话'
          }
          video.filename = result[i].substring(result[i].lastIndexOf('\\') + 1)
          video.orderInMedia = i + 1 + start
          video.partNumber = i + 1 + start
          this.list.push(video)
        }
      }
    },
    // 提交视频列表
    async submit () {
      const { data: result } = await this.$http.post('/admin/video/batch', this.list)
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
    // 打开批量设置对话框
    openBatchSettingDialog () {
      this.visible = true
    },
    // 批量设置
    batchSet (setting) {
      for (var i = 0; i < this.list.length; i++) {
        this.list[i].filepath = setting.filepath
        this.list[i].quality = setting.quality
      }
      this.visible = false
    },
    // 清空列表
    clear () {
      this.list = []
    }
  }
}
</script>

<style lang="less" scoped>
.btn-group {
  display: flex;
  justify-content: space-between;
}
</style>
