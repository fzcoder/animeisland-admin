<template>
  <el-form :model="model" inline>
    <el-form-item label="中文名称">
      <span>{{ model.nameZh }}</span>
    </el-form-item>
    <el-form-item label="原版名称">
      <span>{{ model.nameOrgin }}</span>
    </el-form-item>
    <el-form-item label="封面链接">
      <span>{{ model.coverUrl }}</span>
    </el-form-item>
    <el-form-item label="总集数">
      <span>{{ model.total }}</span>
    </el-form-item>
    <el-form-item label="上映时间">
      <span>{{ model.releaseTime }}</span>
    </el-form-item>
    <el-form-item label="简介">
      <span>{{ model.introduction }}</span>
    </el-form-item>
    <el-form-item label="状态">
      <span>{{ model.status }}</span>
    </el-form-item>
    <el-form-item label="更新日期" v-if="model.status === 1">
      <span>{{ model.updateDate }}</span>
    </el-form-item>
    <el-form-item label="是否属于某一系列">
      <span>{{ model.hasSeries }}</span>
    </el-form-item>
    <el-form-item label="所属系列" v-if="model.hasSeries">
      <span>{{ model.seriesId }}</span>
    </el-form-item>
    <el-form-item label="在系列中的名称" v-if="model.hasSeries">
      <span>{{ model.nameInSeries }}</span>
    </el-form-item>
    <el-form-item label="在系列中的顺序" v-if="model.hasSeries">
      <span>{{ model.orderInSeries }}</span>
    </el-form-item>
    <el-form-item label="所属目录">
      <span>{{ model.categoryName }}</span>
    </el-form-item>
    <el-form-item label="类型">
      <span>{{ model.typeName }}</span>
    </el-form-item>
    <el-form-item label="名称首字母">
      <span>{{ model.nameFirstchar }}</span>
    </el-form-item>
    <el-form-item label="分级">
      <span>{{ model.level }}</span>
    </el-form-item>
    <el-form-item label="标签">
      <span>{{ model.tags }}</span>
    </el-form-item>
    <el-form-item label="权重">
      <span>{{ model.weight }}</span>
    </el-form-item>
    <el-form-item label="是否上首页推荐">
      <span>{{ model.homepageRecommend }}</span>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'CheckForm',
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
