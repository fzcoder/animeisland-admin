<template>
  <el-form :model="model" label-width="150px">
    <el-form-item label="是否属于某一系列">
      <el-switch v-model="model.hasSeries"></el-switch>
    </el-form-item>
    <el-form-item label="所属系列" v-if="model.hasSeries">
      <el-select v-model="model.seriesId" clearable>
        <el-option v-for="item in list" :key="item.id" :label="item.name_zh" :value="item.id"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="在系列中的名称" v-if="model.hasSeries">
      <el-input v-model="model.nameInSeries" clearable></el-input>
    </el-form-item>
    <el-form-item label="在系列中的顺序" v-if="model.hasSeries">
      <el-input-number v-model="model.orderInSeries" :min="1"></el-input-number>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'ExtendInfo',
  props: {
    model: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      list: []
    }
  },
  created () {
    this.getSeriesList()
  },
  methods: {
    // 获取系列信息
    async getSeriesList () {
      const { data: result } = await this.$http.get('/series', { params: { type: 0 } })
      this.list = result.data
    }
  }
}
</script>

<style>
</style>
