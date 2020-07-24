<template>
  <div class="model" ref="contentRef">
    <!-- 工具栏 -->
    <div class="toolbar" ref="toolbarRef">
      <ToolBar
      v-model="query.body.key"
      @search="getList()"
      @refresh="getList()"
      @add="saveOne()"
      @batch="saveBatch()"
      @updateBatch="updateBatch()"
      @remove="remove()"></ToolBar>
    </div>
    <!-- 表格区 -->
    <div class="table">
      <MediaTable :data="list" class="div-style"
      @update="getList()"
      @select-all="handleSelectChange"
      @selection-change="handleSelectChange"
      v-if="Switch.mediaTable"></MediaTable>
      <VideoTable :data="list" class="div-style"
      @update="getList()"
      @select-all="handleSelectChange"
      @selection-change="handleSelectChange"
      v-if="Switch.videoTable"></VideoTable>
      <SeriesTable :data="list" class="div-style"
      @update="getList()"
      @select-all="handleSelectChange"
      @selection-change="handleSelectChange"
      v-if="Switch.seriesTable"></SeriesTable>
      <CategoryTable :data="list" class="div-style"
      @update="getList()"
      @select-all="handleSelectChange"
      @selection-change="handleSelectChange"
      v-if="Switch.categoryTable"></CategoryTable>
    </div>
    <!-- 分页区 -->
    <div class="pagination" ref="paginationRef">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="query.body.pageNum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="query.body.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
        class="div-style">
        </el-pagination>
    </div>
  </div>
</template>

<script>
import qs from 'qs'
import MediaTable from '@/components/media/Table.vue'
import VideoTable from '@/components/video/Table.vue'
import SeriesTable from '@/components/series/Table.vue'
import CategoryTable from '@/components/category/Table.vue'
import ToolBar from '@/components/common/ToolBar.vue'
const { ipcRenderer } = require('electron')
// const { BrowserWindow } = require('electron').remote
export default {
  name: 'Model',
  components: {
    MediaTable,
    VideoTable,
    SeriesTable,
    CategoryTable,
    ToolBar
  },
  props: {
    // 实体类型
    type: {
      type: String,
      default: 'media'
    },
    // 消息框设置选项，更多设置请参考https://www.electronjs.org/docs/api/dialog
    options: {
      type: Object,
      default: () => ({
        type: 'warning',
        buttons: ['取消', '确定'],
        title: '删除记录',
        message: '确定删除所选记录吗？',
        noLink: true,
        defaultId: 0,
        cancelId: 0
      })
    }
  },
  data () {
    return {
      // 请求体
      query: {
        params: {},
        body: {
          // 关键字
          key: '',
          // 当前页面
          pageNum: 1,
          // 每页的结果数
          pageSize: 10,
          // 排序依据
          orderBy: [],
          // 正序或逆序
          reverse: false
        }
      },
      // 接口
      api: {
        select: '/',
        remove: '/'
      },
      // 结果总数
      total: 0,
      // 记录列表
      list: [],
      // 已选项
      selection: [],
      table: {
        height: 0
      },
      // 开关
      Switch: {
        mediaTable: false,
        videoTable: false,
        seriesTable: false,
        categoryTable: false
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    // 初始化
    init () {
      if (this.type === 'media') {
        this.api.select = '/media'
        this.api.remove = '/admin/media'
        this.query.body.orderBy = ['name_zh']
        this.Switch.mediaTable = true
      }
      if (this.type === 'video') {
        this.query.params = this.$route.query
        this.api.select = '/video'
        this.api.remove = '/admin/video'
        this.query.body.orderBy = ['order_in_media']
        this.Switch.videoTable = true
      }
      if (this.type === 'series') {
        this.api.select = '/series'
        this.api.remove = '/admin/series'
        this.query.body.orderBy = ['name_zh']
        this.Switch.seriesTable = true
      }
      if (this.type === 'category') {
        this.api.select = '/category'
        this.api.remove = '/admin/category'
        this.query.body.orderBy = ['id']
        this.Switch.categoryTable = true
      }
      this.getList()
    },
    // 获取列表
    async getList () {
      const { data: result } = await this.$http.post(this.api.select, this.query.body, { params: this.query.params })
      if (result.status !== 200) {
        return this.$message.error('媒体信息加载失败')
      }
      this.list = result.data.records
      this.query.body.pageNum = result.data.current
      this.query.body.pageSize = result.data.size
      this.total = result.data.total
    },
    // 监听pageSize改变的事件
    handleSizeChange (newSize) {
      this.query.body.pageSize = newSize
      this.getList()
    },
    // 监听页码值改变的事件
    handleCurrentChange (newPage) {
      this.query.body.pageNum = newPage
      this.getList()
    },
    // 处理多选事件
    handleSelectChange (selection) {
      this.selection = selection
    },
    // 批量修改
    updateBatch () {
      if (this.selection.length === 0) {
        return this.$message({
          message: '请选择要修改的记录!',
          type: 'warning',
          offset: 60
        })
      }
      if (this.type === 'video') {
        /* let win = new BrowserWindow({ width: 400, height: 300 })
        win.setMenuBarVisibility(false)
        win.on('closed', () => {
          win = null
        }) */
        var idList = []
        for (var i = 0; i < this.selection.length; i++) {
          idList.push(this.selection[i].id)
        }
        this.$router.push({ path: '/video/update', query: { idList: idList } })
      } else {
        this.$message({
          message: '批量修改功能暂未开放!',
          type: 'warning',
          offset: 60
        })
      }
    },
    // 删除操作
    remove () {
      // 判断已选项数组是否为空
      if (this.selection.length === 0) {
        return this.$message({
          message: '请选择要删除的记录!',
          type: 'warning',
          offset: 60
        })
      }
      // 调用系统消息框，与主进程之间进行同步信息传递
      const choose = ipcRenderer.sendSync('open-message-box', this.options)
      // 当用户确定删除时
      if (choose === 1) {
        var idList = []
        for (var i = 0; i < this.selection.length; i++) {
          idList.push(this.selection[i].id)
        }
        const params = qs.stringify(idList)
        this.$http.delete(this.api.remove + '?' + params).then(res => {
          const result = res.data
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
          this.getList()
        })
      }
    },
    // 单个添加
    saveOne () {
      this.$emit('saveOne')
    },
    // 批量添加
    saveBatch () {
      this.$emit('saveBatch')
    }
  }
}
</script>

<style lang="less" scoped>
.div-style {
  margin-top: 15px;
}
</style>
