<template>
  <el-dialog title="批量设置" :visible.sync="visible_" width="35%"
  :close-on-click-modal="false" :modal="false" :show-close="true" :append-to-body="true"
  @closed="clear()">
    <el-form :model="setting" size="small">
      <el-form-item label="文件路径">
        <el-input v-model="setting.filepath" placeholder="请输入文件路径" clearable></el-input>
      </el-form-item>
      <el-form-item label="画质">
        <el-input v-model="setting.quality" placeholder="请输入画质信息,多个画质之间用英文逗号隔开" clearable></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer">
      <el-button size="small" @click="cancel()">取消</el-button>
      <el-button size="small" type="primary" @click="batchSet()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'BatchSetting',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      setting: {
        filepath: '',
        quality: ''
      }
    }
  },
  computed: {
    // Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders.
    // Instead, use a data or computed property based on the prop's value.
    visible_: {
      get () {
        return this.visible
      },
      set (value) {
        this.$emit('update:visible', value)
      }
    }
  },
  methods: {
    // 批量设置
    batchSet () {
      this.$emit('update', this.setting)
      this.changeDialogShow(false)
    },
    // 改变对话框显示状态
    changeDialogShow (render) {
      this.$emit('update:visible', render)
    },
    // 取消
    cancel () {
      this.clear()
      this.changeDialogShow(false)
    },
    // 清空
    clear () {
      this.setting.filepath = ''
      this.setting.quality = ''
    }
  }
}
</script>

<style>
</style>
