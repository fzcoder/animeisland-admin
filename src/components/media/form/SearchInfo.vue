<template>
  <el-form :model="model">
    <el-form-item label="所属目录">
      <el-select v-model="model.categoryName" clearable>
        <el-option v-for="item in select.category" :key="item.value" :label="item.name" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="类型">
      <el-select v-model="model.typeName" clearable>
        <el-option v-for="item in select.type" :key="item.value" :label="item.name" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="名称首字母">
      <el-input v-model="model.nameFirstchar" placeholder="请输入番剧中文名称大写首字母" clearable></el-input>
    </el-form-item>
    <el-form-item label="分级">
      <el-select v-model="model.level" clearable>
        <el-option v-for="item in select.level" :key="item.value" :label="item.name" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="标签">
      <el-input v-model="model.tags" placeholder="请输入标签,多个标签之间用英文逗号隔开" clearable></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'SearchInfo',
  props: {
    model: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      select: {
        category: [],
        type: [],
        level: []
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.$http.get('/category', { params: { type: '目录' } }).then(res => {
        this.select.category = res.data.data
      })
      this.$http.get('/category', { params: { type: '类型' } }).then(res => {
        this.select.type = res.data.data
      })
      this.$http.get('/category', { params: { type: '分级' } }).then(res => {
        this.select.level = res.data.data
      })
    }
  }
}
</script>

<style>
</style>
