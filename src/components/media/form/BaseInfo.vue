<template>
  <el-form :model="model" label-width="80px">
    <el-form-item label="中文名称">
      <el-input v-model="model.nameZh" clearable></el-input>
    </el-form-item>
    <el-form-item label="原版名称">
      <el-input v-model="model.nameOrgin" clearable></el-input>
    </el-form-item>
    <el-form-item label="封面链接">
      <el-input v-model="model.coverUrl" clearable></el-input>
    </el-form-item>
    <el-form-item label="总集数">
      <el-input-number v-model="model.total" :min="1"></el-input-number>
    </el-form-item>
    <el-form-item label="上映时间">
      <el-date-picker v-model="model.releaseTime" type="date" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
    </el-form-item>
    <el-form-item label="简介">
      <el-input v-model="model.introduction" type="textarea" :rows="4"></el-input>
    </el-form-item>
    <el-form-item label="状态">
      <el-select v-model="model.status">
        <el-option v-for="item in select.status" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="更新日期" v-if="model.status === 1">
      <el-select v-model="model.updateDate">
        <el-option v-for="item in select.updateDate" :key="item.value" :label="item.label" :value="item.value"></el-option>
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'BaseInfo',
  props: {
    model: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      select: {
        status: [
          { label: '未上映', value: 0 },
          { label: '正在连载', value: 1 },
          { label: '已完结', value: 2 }
        ],
        updateDate: [
          { label: '每周一', value: 0 },
          { label: '每周二', value: 1 },
          { label: '每周三', value: 2 },
          { label: '每周四', value: 3 },
          { label: '每周五', value: 4 },
          { label: '每周六', value: 5 },
          { label: '每周日', value: 6 }
        ]
      }
    }
  }
}
</script>

<style>
</style>
