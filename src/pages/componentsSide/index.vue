<template>
  <div class="componentsSide">
    <div class="sideHeader" :style='style'>
      <h3>添加组件</h3>
    </div>
    <el-tabs tab-position="left" class="compsMeau">
      <el-tab-pane
        v-for="(item, index) in compsList"
        :key="index"
        :label="item.name"
      >
        <el-card
          class="cardItem"
          :body-style="{ padding: 0 }"
          v-for="itemSec in item.child"
          :key="itemSec.name"
          @click.native="handleAddComponent(itemSec)"
        >
          <img
            v-if="itemSec.img"
            class="cardImage"
            :alt="itemSec.name"
            :src="itemSec.img ? itemSec.img : ''"
          />
          <div class="cardTitle">
            <span>{{ itemSec.name }}</span>
          </div>
        </el-card></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import compsList from '../../components/components'

export default {
  name: 'componentsSide',
  props: {
    // 父组件传递过来的消息处理函数
    sendMsg: {
      type: Function
    }
  },
  computed: {
    compsList () {
      return compsList
    }
  },
  methods:{
    handleAddComponent ({ component }) {
      this.sendMsg({
        type: 'addComp',
        data: {
          component
        }
      })
    }

  }

}
</script>

<style lang="scss">
@import "index.scss";
</style>
