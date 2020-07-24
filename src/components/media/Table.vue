<template>
  <el-table :data="data" stripe @select-all="selectAll" @selection-change="selectionChange">
    <el-table-column type="selection" width="40"></el-table-column>
    <el-table-column type="index" label="#" width="40px"></el-table-column>
    <el-table-column prop="id" label="id" width="100px"></el-table-column>
    <el-table-column prop="name_zh" label="名称"></el-table-column>
    <el-table-column prop="type_name" label="类型" width="80px"></el-table-column>
    <el-table-column prop="release_time" label="上映时间" width="100px"></el-table-column>
    <el-table-column prop="total" label="总集数" width="70px"></el-table-column>
    <el-table-column label="操作" width="350px">
      <template slot-scope="scope">
        <!-- 查看按钮 -->
        <el-button type="success" icon="el-icon-view" circle size="small" @click="view(scope.row.id)"></el-button>
        <!-- 修改按钮 -->
        <el-button type="primary" icon="el-icon-edit" circle size="small" @click="update(scope.row.id)"></el-button>
        <!-- 删除按钮 -->
        <el-button type="danger" icon="el-icon-delete" circle size="small" @click="Delete(scope.row.id)"></el-button>
        <!-- 视频上传 -->
        <el-button type="primary" size="small" @click="addVideo(scope.row.id)">视频列表</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
const { ipcRenderer } = require('electron')
export default {
  name: 'Table',
  props: {
    data: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  methods: {
    addVideo (id) {
      this.$router.push({ path: '/video', query: { media_id: id } })
    },
    view (id) {
      this.$router.push('/media/view/' + id)
    },
    // 更新操作
    update (id) {
      this.$router.push('/media/update/' + id)
    },
    // 删除操作
    Delete (id) {
      // 消息框设置选项，更多设置请参考https://www.electronjs.org/docs/api/dialog
      var options = {
        type: 'warning',
        buttons: ['取消', '确定'],
        title: '删除番剧',
        message: '确定删除所选番剧吗？',
        noLink: true,
        defaultId: 0,
        cancelId: 0
      }
      // 调用系统消息框，与主进程之间进行同步信息传递
      const choose = ipcRenderer.sendSync('open-message-box', options)
      // 当用户确定删除时
      if (choose === 1) {
        this.$http.delete(`/admin/media/${id}`).then(res => {
          const result = res.data
          if (result.status !== 200) {
            // 失败消息
            return this.$message({
              message: result.message,
              type: 'error',
              offset: 60
            })
          }
          // 成功消息
          this.$message({
            message: result.message,
            type: 'success',
            offset: 60
          })
          // 向父组件发送一个更新事件，提示父组件进行数据更新
          this.$emit('update')
        })
      }
    },
    // 当选择项发生变化时会触发该事件
    selectionChange (selection) {
      this.$emit('selection-change', selection)
    },
    // 当用户手动勾选全选 Checkbox 时触发的事件
    selectAll (selection) {
      this.$emit('select-all', selection)
    }
  }
}
</script>

<style>
</style>
