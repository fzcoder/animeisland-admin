<template>
  <div class="container">
    <el-page-header @back="goBack" content="添加视频">
    </el-page-header>
    <div class="form">
      <SaveBatch v-if="Switch.batch"></SaveBatch>
      <SaveOne v-if="Switch.one"></SaveOne>
    </div>
  </div>
</template>

<script>
import SaveBatch from '@/components/video/add/SaveBatch.vue'
import SaveOne from '@/components/video/add/SaveOne.vue'
export default {
  name: 'Add',
  components: {
    SaveBatch,
    SaveOne
  },
  data () {
    return {
      Switch: {
        batch: true,
        one: false
      }
    }
  },
  created () {
    this.addMode()
  },
  methods: {
    addMode () {
      if (this.$route.query.mode === 'batch') {
        this.Switch.batch = true
        this.Switch.one = false
      } else {
        this.Switch.batch = false
        this.Switch.one = true
      }
    },
    goBack () {
      this.$router.back(-1)
    }
  }
}
</script>

<style lang="less" scoped>
.form {
  margin-top: 15px;
}
</style>
