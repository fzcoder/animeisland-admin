<template>
  <el-menu :router="true" background-color="#2F4056" text-color="#FFF" active-text-color="#409EFF" style="border-right: 0px;">
    <el-menu-item v-for="item in menu" :key="item.id" :index="item.url">
      <template slot="title">
        <i :class="item.icon"></i>
        <span>{{ item.title }}</span>
      </template>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'Aside',
  data () {
    return {
      // 菜单
      menu: [
        {
          id: 1,
          url: '/',
          title: '控制台',
          icon: 'el-icon-s-home'
        },
        {
          id: 2,
          url: '/media',
          title: '番剧管理',
          icon: 'el-icon-s-home'
        },
        {
          id: 3,
          url: '/series',
          title: '系列管理',
          icon: 'el-icon-s-home'
        },
        {
          id: 4,
          url: '/category',
          title: '目录管理',
          icon: 'el-icon-s-home'
        },
        {
          id: 5,
          url: '/setting',
          title: '网站设置',
          icon: 'el-icon-s-home'
        },
        {
          id: 6,
          url: '/about',
          title: '关于',
          icon: 'el-icon-s-home'
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
</style>
