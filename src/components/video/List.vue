<template>
  <el-table :data="list">
    <el-table-column type="selection" width="40"></el-table-column>
    <el-table-column type="index" label="#"></el-table-column>
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form>
          <el-form-item label="标题">
            <el-input v-model="props.row.title" placeholder="请输入标题" clearable></el-input>
          </el-form-item>
          <el-form-item label="文件路径">
            <el-input v-model="props.row.filepath" placeholder="请输入文件路径" clearable></el-input>
          </el-form-item>
          <el-form-item label="文件名称">
            <el-input v-model="props.row.filename" placeholder="请输入文件名称" clearable></el-input>
          </el-form-item>
          <el-form-item label="画质">
            <el-input v-model="props.row.quality" placeholder="请输入画质信息,多个画质之间用英文逗号隔开" clearable></el-input>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column prop="mediaId" label="番剧id"></el-table-column>
    <el-table-column label="序数">
      <template slot-scope="scope">
        <el-input-number v-model="scope.row.orderInMedia" :min="0" size="small"></el-input-number>
      </template>
    </el-table-column>
    <el-table-column label="集数">
      <template slot-scope="scope">
        <el-input v-model="scope.row.partNumber" clearable></el-input>
      </template>
    </el-table-column>
    <el-table-column label="单位">
      <template slot-scope="scope">
        <el-input v-model="scope.row.partUnit" clearable></el-input>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'List',
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
    }
  }
}
</script>

<style>
</style>
