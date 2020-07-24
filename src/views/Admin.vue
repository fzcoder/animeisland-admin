<template>
  <el-container>
    <el-header height="40px" style="background-color: #393D49;">
      <Header></Header>
    </el-header>
    <el-container>
      <el-aside width="200px" style="background-color: #2F4056;">
        <Aside></Aside>
      </el-aside>
      <el-main :style="style.main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Header from '@/components/Header.vue'
import Aside from '@/components/Aside.vue'
export default {
  name: 'App',
  components: {
    Header,
    Aside
  },
  provide () {
    return {
      clientHeight: () => {
        return document.body.clientHeight - 40
      }
    }
  },
  data () {
    return {
      style: {
        main: {
          height: '0px'
        }
      }
    }
  },
  created () {
    this.changeWindowSize()
  },
  mounted () {
    const that = this
    window.onresize = () => {
      that.changeWindowSize()
    }
  },
  methods: {
    changeWindowSize () {
      const clientHeight = document.body.clientHeight
      this.style.main.height = clientHeight - 40 + 'px'
    }
  },
  destroyed () {
    window.onresize = null
  }
}
</script>

<style lang="less">
</style>
