<template>
  <el-form :model="model" label-width="50px">
    <el-form-item label="标题">
      <el-input v-model="model.title" placeholder="请输入标题" clearable></el-input>
    </el-form-item>
    <el-form-item label="路径">
      <el-input v-model="model.filepath" placeholder="请输入文件路径" clearable></el-input>
    </el-form-item>
    <el-form-item label="名称">
      <el-input v-model="model.filename" placeholder="请输入文件名称" clearable></el-input>
    </el-form-item>
    <el-form-item label="画质">
      <el-input v-model="model.quality" placeholder="请输入画质信息,多个画质之间用英文逗号隔开" clearable></el-input>
    </el-form-item>
    <el-form-item label="序数">
      <el-input-number v-model="model.orderInMedia" :min="0"></el-input-number>
    </el-form-item>
    <el-form-item label="集数">
      <el-input v-model="model.partNumber" clearable></el-input>
    </el-form-item>
    <el-form-item label="单位">
      <el-input v-model="model.partUnit" clearable></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'Update',
  props: {
    model: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style>
</style>
