<template>
  <el-form :model="model">
    <el-form-item label="权重">
      <el-input-number v-model="model.weight" :min="0"></el-input-number>
    </el-form-item>
    <el-form-item label="是否上首页推荐">
      <el-switch v-model="model.homepageRecommend"></el-switch>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'OtherInfo',
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
