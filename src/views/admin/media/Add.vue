<template>
  <div class="container">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">控制台</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/media' }">番剧管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加番剧</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 步骤条 -->
    <el-steps :active="step.active" finish-status="success">
      <el-step v-for="item in step.list" :key="item" :title="item"></el-step>
    </el-steps>
    <!-- 表单区 -->
    <div class="form">
      <BaseInfo :model="form" v-show="Switch.formShow[0]"></BaseInfo>
      <ExtendInfo :model="form" v-show="Switch.formShow[1]"></ExtendInfo>
      <SearchInfo :model="form" v-show="Switch.formShow[2]"></SearchInfo>
      <OtherInfo :model="form" v-show="Switch.formShow[3]"></OtherInfo>
      <CheckForm :model="form" v-show="Switch.formShow[4]"></CheckForm>
    </div>
    <div class="btn-group">
      <el-button type="primary" round @click="preStep()" v-show="Switch.preStepBtn">
        <span>上一步</span>
      </el-button>
      <el-button type="success" round @click="nextStep()" v-show="Switch.nextStepBtn">
        <span>下一步</span>
      </el-button>
      <el-button type="success" round @click="submit()" v-show="Switch.submitBtn">
        <span>提交</span>
      </el-button>
      <el-button round @click="cancel()" v-show="Switch.cancelBtn">
        <span>取消</span>
      </el-button>
    </div>
  </div>
</template>

<script>
import BaseInfo from '@/components/media/form/BaseInfo.vue'
import ExtendInfo from '@/components/media/form/ExtendInfo.vue'
import SearchInfo from '@/components/media/form/SearchInfo.vue'
import OtherInfo from '@/components/media/form/OtherInfo.vue'
import CheckForm from '@/components/media/add/CheckForm.vue'
export default {
  name: 'Add',
  components: {
    BaseInfo,
    ExtendInfo,
    SearchInfo,
    OtherInfo,
    CheckForm
  },
  data () {
    return {
      // 表单
      form: {
        nameZh: '',
        nameOrgin: '',
        nameFirstchar: '',
        categoryName: '动漫',
        typeName: 'TV动画',
        total: 1,
        releaseTime: '',
        introduction: '',
        level: 'G',
        tags: '',
        status: 2,
        updateDate: 0,
        coverUrl: '',
        screenshotUrl: '',
        weight: 0,
        homepageRecommend: true,
        hasSeries: false,
        seriesId: '',
        nameInSeries: '',
        orderInSeries: 1
      },
      // 步骤
      step: {
        list: ['基本信息', '扩展信息', '索引信息', '推荐信息', '表单核验'],
        active: 0
      },
      // 开关
      Switch: {
        preStepBtn: false,
        nextStepBtn: true,
        submitBtn: false,
        cancelBtn: true,
        formShow: [true, false, false, false, false]
      }
    }
  },
  methods: {
    // 提交表单
    async submit () {
      // 向服务器发送post请求
      const { data: result } = await this.$http.post('/admin/media', this.form)
      if (result.status !== 200) {
        // 返回错误信息
        return this.$message({
          message: result.message,
          type: 'error',
          offset: 60
        })
      }
      // 显示成功信息
      this.$message({
        message: result.message,
        type: 'success',
        offset: 60
      })
      // 跳转到番剧管理界面
      this.$router.push('/media')
    },
    // 隐藏所有表单
    hideAll () {
      for (let i = 0; i < this.Switch.formShow.length; i++) {
        this.Switch.formShow[i] = false
      }
    },
    // 上一步
    preStep () {
      if (this.step.active > 0 && this.step.active < this.Switch.formShow.length) {
        // 当从最后一步跳转到上一步时显示下一步按钮，隐藏提交按钮
        if (this.step.active === this.Switch.formShow.length - 1) {
          this.Switch.nextStepBtn = true
          this.Switch.submitBtn = false
        }
        this.step.active--
        this.hideAll()
        this.Switch.formShow[this.step.active] = true
        // 当退回到第一步时隐藏上一步按钮
        if (this.step.active === 0) {
          this.Switch.preStepBtn = false
        }
      }
    },
    // 下一步
    nextStep () {
      if (this.step.active < this.Switch.formShow.length - 1) {
        // 当从第一步跳转到第二步时显示上一步按钮
        if (this.step.active === 0) {
          this.Switch.preStepBtn = true
        }
        this.step.active++
        this.hideAll()
        this.Switch.formShow[this.step.active] = true
        // 当进行表单核验时隐藏下一步按钮，显示提交按钮
        if (this.step.active === this.Switch.formShow.length - 1) {
          this.Switch.nextStepBtn = false
          this.Switch.submitBtn = true
        }
      }
    },
    // 取消
    cancel () {
      this.$router.push('/media')
    }
  }
}
</script>

<style lang="less" scoped>
.el-step {
  margin-top: 15px;
}
.form {
  margin-top: 15px;
}
.btn-group {
  display: flex;
  justify-content: flex-end;
}
</style>
