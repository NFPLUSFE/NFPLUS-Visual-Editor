<template>
  <div class="changePropsWrap">
    <div class="changePropsTitle">
      <h3>{{hadSelectedComp?"组件配置":"页面配置"}}</h3>
      <div>
        <el-button v-show="hadSelectedComp" type="danger" icon="el-icon-delete" circle @click="handleDelCpt"></el-button>
      </div>

    </div>
    <div class="changePropsCont">
      <div class="changePropsItem" v-for="(value, key) in currentCompProps" :key="key">
        <ItemCpt v-model="currentCompProps[key]" :name="key"></ItemCpt>
      </div>
    </div>
  </div>
</template>

<script>
import ItemCpt from './item'

export default {
  name: 'changePropsSide',
  components: {
    ItemCpt
  },
  props: {
    handleChangeProps: {
      type: Function
    },
    currentCompProps: {
      type: Object,
      default: () => ({})
    },
    sendMsg: {
      type: Function
    },
    hadSelectedComp:{
      type: Boolean,
      default: () => false}

  },
  watch: {
    // props 改变
    currentCompProps: {
      handler (newProps) {
        this.handleChangeProps(newProps) // newProps是修改后的属性
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    // 删除组件
    handleDelCpt () {
      this.sendMsg({
        type: 'delComp'
      })
    }
  }
}
</script>

<style lang='scss'>
@import "./index.scss";
</style>
