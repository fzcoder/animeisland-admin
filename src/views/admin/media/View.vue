<template>
  <div class="container">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">控制台</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/media' }">番剧管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{ media.nameZh }}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="wrap-head">
      <div class="img-border">
        <img class="cover" :src="media.coverUrl"/>
      </div>
      <div class="base-info">
        <div style="display: flex; align-items: center; justify-content: space-between;">
          <h1>{{ media.nameZh }}</h1>
          <div>
            <el-button type="primary" size="small" icon="el-icon-download" @click="download()">导出信息</el-button>
            <el-button type="warning" size="small" icon="el-icon-edit" @click="gotoPage('/media/update/' + media.id)">修改信息</el-button>
          </div>
        </div>
        <el-tag v-for="item in media.tags" :key="item">
          <span>{{ item }}</span>
        </el-tag>
        <p>原称：{{ media.nameOrgin }}</p>
        <p>类型：{{ media.typeName }}</p>
        <p>上映时间：{{ date }}</p>
        <p>总集数：{{ media.total }}</p>
        <p>状态：{{ status }}</p>
        <p>简介：{{ media.introduction }}</p>
      </div>
    </div>
    <el-tabs style="margin-top: 20px;">
      <el-tab-pane label="其它信息">
        <el-form :model="media" inline>
          <el-form-item label="所属目录">
            <span>{{ media.categoryName }}</span>
          </el-form-item>
          <el-form-item label="分级">
            <span>{{ media.level }}</span>
          </el-form-item>
          <el-form-item label="名称首字母">
            <span>{{ media.nameFirstchar }}</span>
          </el-form-item>
          <el-form-item label="权重">
            <span>{{ media.weight }}</span>
          </el-form-item>
          <el-form-item label="是否上首页推荐">
            <span>{{ recommend }}</span>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="视频列表">2</el-tab-pane>
      <el-tab-pane label="系列信息" v-if="media.hasSeries">
        <el-form :model="media">
          <el-form-item label="所属系列">
            <span>{{ series.nameZh }}</span>
          </el-form-item>
          <el-form-item label="所属番剧">
            <el-button v-for="item in list" :key="item.id">{{ item.name_in_series }}</el-button>
          </el-form-item>
          <el-form-item label="在系列中的名称">
            <span>{{ media.nameInSeries }}</span>
          </el-form-item>
          <el-form-item label="在系列中的顺序">
            <span>{{ media.orderInSeries }}</span>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data () {
    return {
      media: {},
      videos: [],
      series: {},
      list: []
    }
  },
  // 计算属性
  computed: {
    // 状态
    status: function () {
      const statusName = ['未上映', '正在连载', '已完结']
      return statusName[this.media.status]
    },
    // 上映日期
    date: function () {
      const time = (this.media.releaseTime || '').split('-')
      return time[0] + '年' + time[1] + '月' + time[2] + '日'
    },
    recommend: function () {
      if (this.media.homepageRecommend) {
        return '是'
      } else {
        return '否'
      }
    }
  },
  created () {
    this.getMedia()
  },
  methods: {
    // 获取番剧信息
    async getMedia () {
      const { data: result } = await this.$http.get(`/admin/media/${this.$route.params.id}`)
      // 此处是将tags转换为数组
      // 为了解决 "Cannot read property 'split' of undefined" 报错，添加一个空字符条件
      result.data.tags = (result.data.tags || '').split(',')
      // 获取分级信息
      this.$http.get('/category', { params: { type: '分级' } }).then(res => {
        var levelName = '暂无分级'
        const options = res.data.data
        for (var i = 0; i < options.length; i++) {
          if (options[i].value === result.data.level) {
            levelName = options[i].name
            break
          }
        }
        result.data.level = levelName
      })
      if (result.data.hasSeries) {
        this.getSeries(result.data.seriesId)
      }
      // 写入结果
      this.media = result.data
    },
    getSeries (id) {
      this.$http.get(`/series/${id}`).then(res => {
        const result = res.data
        this.series = result.data
      })
      this.$http.get('/media', { params: { series_id: id } }).then(res => {
        const result = res.data
        this.list = result.data
      })
    },
    // 下载JSON配置文件
    download () {},
    // 页面跳转
    gotoPage (url) {
      this.$router.push(url)
    }
  }
}
</script>

<style lang="less" scoped>
.el-breadcrumb {
  margin-bottom: 20px;
}
.wrap-head{
  display: flex;
  align-items: center;
  justify-content: space-between;
  p{
    margin: 8px;
  }
  .img-border {
    background-color: #F2F6FC;
    border-radius: 8px;
    padding: 8px;
    .cover {
      width: 240px;
      height: 320px;
    }
  }
  .base-info {
    margin-left: 20px;
  }
}
</style>
