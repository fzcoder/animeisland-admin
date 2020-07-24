<template>
  <el-form :model="model">
    <el-form-item label="名称">
      <el-input v-model="model.name" placeholder="请输入名称" clearable></el-input>
    </el-form-item>
    <el-form-item label="值">
      <el-input v-model="model.value" placeholder="请输入值" clearable></el-input>
    </el-form-item>
    <el-form-item label="类型">
      <el-select v-model="model.type" clearable>
        <el-option v-for="item in select.type" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="简介">
      <el-input type="textarea" :rows="3" v-model="model.description" placeholder="请输入描述" clearable></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'Form',
  props: {
    model: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      select: {
        type: [
          { value: '目录', label: '目录' },
          { value: '类型', label: '类型' },
          { value: '分级', label: '分级' }
        ]
      }
    }
  }
}
</script>

<style>
</style>
