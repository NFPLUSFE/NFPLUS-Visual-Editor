<template>
  <div class="artListWrap">
    <div class="artListItem" v-for="(item, index) in compDatas" :key="index">
      <div class="artListItemInfo">
        <h1 class="artListItemTitle">{{ item.title }}</h1>
        <div class="artListItemAbs">{{ item.abs }}</div>
        <div class="artListItemDate">{{ item.date }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'artList',
  props: {
    // compProps: {
    //   type: Array,
    //   default: () => [
    //     {
    //       name: '标题',
    //       _id:'title',
    //       type: 'propInput'
    //     },{
    //       name: '简介',
    //       _id:'abs',
    //       type: 'propInputArea'
    //     },{
    //       name: '日期',
    //       _id: 'date',
    //       type:'propDate'
    //     }
    //   ]
    // },
    compDatas:{
      type:Array,
      default: () => [{
        title:"标题",
        abs:"这是一条简介",
        date:"2021-1-1"
      }]
    }
  },
  methods: {
    // 返回列表项信息
    getConfig () {
      return {
        // compProps: this.compProps,
        compType: this.$options.name,
        compDatas: this.compDatas
      }
    }
  }
}
</script>

<style lang='scss'>
@import "./index.scss";
</style>
