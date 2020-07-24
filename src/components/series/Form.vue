<template>
  <el-form :model="model">
    <el-form-item label="中文名称">
      <el-input v-model="model.nameZh" placeholder="请输入标题" clearable></el-input>
    </el-form-item>
    <el-form-item label="原版名称">
      <el-input v-model="model.nameOrigin" placeholder="请输入文件路径" clearable></el-input>
    </el-form-item>
    <el-form-item label="简介">
      <el-input v-model="model.introduction" placeholder="请输入文件名称" clearable></el-input>
    </el-form-item>
    <el-form-item label="系列类型">
      <el-select v-model="model.type" clearable>
        <el-option v-for="item in select.type" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
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
          { value: 0, label: '单一系列' }
        ]
      }
    }
  }
}
</script>

<style>
</style>
