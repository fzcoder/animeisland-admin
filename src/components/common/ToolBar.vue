<template>
  <!-- 工具栏 -->
  <el-row :gutter="20">
    <el-col :span="10">
      <el-input placeholder="请输入内容" v-model="key" size="small" clearable @input="input()" @clear="clear()">
        <el-button slot="append" icon="el-icon-search" @click="search()"></el-button>
      </el-input>
    </el-col>
    <el-col :span="14">
      <el-button size="small" circle icon="el-icon-refresh" @click="refresh()"></el-button>
      <el-button type="primary" size="small" icon="el-icon-plus" @click="add()">添加</el-button>
      <el-button type="primary" size="small" icon="el-icon-plus" @click="batch()">批量添加</el-button>
      <el-button type="warning" size="small" icon="el-icon-edit" @click="updateBatch()">批量修改</el-button>
      <el-button type="danger" size="small" icon="el-icon-delete" @click="remove()">删除</el-button>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'ToolBar',
  // 双向数据绑定
  model: {
    prop: 'value',
    event: 'input'
  },
  props: {
    value: String
  },
  data () {
    return {
      key: ''
    }
  },
  methods: {
    // 输入
    input () {
      this.$emit('input', this.key)
    },
    // 搜索
    search () {
      this.$emit('search')
    },
    // 清空
    clear () {
      this.$emit('clear')
    },
    // 刷新
    refresh () {
      this.$emit('refresh')
    },
    // 添加
    add () {
      this.$emit('add')
    },
    // 批量添加
    batch () {
      this.$emit('batch')
    },
    // 批量修改
    updateBatch () {
      this.$emit('updateBatch')
    },
    // 移除
    remove () {
      this.$emit('remove')
    }
  }
}
</script>

<style>
</style>
