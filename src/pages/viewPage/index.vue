<template>
  <div class="viewPageMain" @click="clickWhite">
    <div class="viewTools">
      <el-button
        v-show="frameFinishLoad"
        :icon="editAble ? 'el-icon-view' : 'el-icon-edit'"
        circle
        @click="handleChangeEditStatus"
      >
      </el-button>
      <el-button
        v-show="frameFinishLoad & editAble"
        icon="el-icon-plus"
        circle
        @click.stop="handleAddContainer"
      >
      </el-button>
    </div>
    <div class="viewBody">
      <iframe
        title=""
        :src="url"
        class="viewContent"
        @load="onLoad"
        ref="frame"
      ></iframe>
    </div>
  </div>
</template>

<script>

export default {
    name:'viewPageMain',
    props:{
      sendMsg: {
        type: Function
      },
      handleFrameLoad: {
        type: Function
      }
    },
    data(){
      return {
        editAble: true,
        frameFinishLoad: false,
      }
    },
    computed: {
    // 在这里只运行一次
      url () {
        return `${window.location.protocol}//${window.location.host + window.location.pathname}#/view`
      }
    },
    methods: {
      handleChangeEditStatus () {
        this.editAble = !this.editAble
        const msg = {
          type: 'changeEditStatus',
          data: {
            editAble: this.editAble
          }
        }
        this.sendMsg(msg)
      },
      handleAddContainer () {
        const msg = {
          type: 'mustAddContainer',
          data: {
            component: "containerComp"
          }
        }
        this.sendMsg(msg)
      },
      clickWhite () {
        const msg = {
          type: 'clearSelect',
        }
        this.sendMsg(msg)
      },
      onLoad (){
        // 在这里返回的是iframe，包含iframe内页面的代码
        this.frameFinishLoad = true
        this.handleFrameLoad(this.$refs.frame)
      }
    }

}
</script>

<style lang="scss">
@import "index.scss";
</style>
