<template>
  <div class="containerComp">添加至此处</div>
</template>

<script>
export default {
  name: 'containerComp',
  methods:{
    getConfig(){
      return {
        compType: this.$options.name,
        compDatas:[]
      }
    }
  }
}
</script>

<style lang="scss">
@import "index.scss";
</style>
