<template>
  <div class="viewMain" @click="handleClearSelect">
    <div class="empty-tips" v-show="containerList.length <= 0">
      <img width="180" height="180" :src="require('@/assets/empty_list.png')" />
      <a @click="handleMustAddContainer">请添加组件</a>
    </div>
    <vue-draggable-resizable
      className="container"
      v-for="(item, index) in containerList"
      :key="item._id"
      :draggable="editAble"
      :disable-user-select="true"
    >
      <component
        :class="{
          viewItem: editAble,
          active: (currentSelected == index) & editAble,
        }"
        :is="item.component"
        v-bind="item.props"
        :key="index"
        @click.native.stop="handleSelect(index, editAble)"
        :ref="index"
      >
      </component>
    </vue-draggable-resizable>
  </div>
</template>

<script>
// import draggable from 'vuedraggable'

export default {
  name:'viewMain',
  data () {
    return {
      editAble: true,
      containerList : [],
      currentSelected: -1,
      posX: null,
      posY: null,
      targetElement:null
    }
  },
  components: {
    //调用组件
    // draggable,
  },
  methods: {
    // 发送消息
    sendMsg (data) {
      top.postMessage(data, location.href.replace('view', ''))
    },
    receiveMsg (msg){
      // msg是系统包装后的，传送过来的信息在data字段中
      const msgData = msg.data
      const {type} = msgData
      const {data} = msgData
      if (type == 'changeEditStatus'){
        this.handleChangeEditStatus(data)
      }
      if (type == 'mustAddContainer'){
        this.handleMustAddContainer()
      }
      if (type == 'addComp'){
        this.handleAddComp(data)
      }
      if (type == 'delComp'){
        this.handleDelComp(data)
      }
      if (type == 'clearSelect'){
        this.handleClearSelect()
      }
      if (type == "changeCompProps"){
        this.handleChangeCompProps(data)
      }
      if (type == "getAllCompConfig"){
        this.handleGetAllCompConfig()
      }
    },
    // 获取所有组件的信息
    handleGetAllCompConfig(){
      var array_list=this.$refs;
      var configArray = []
      for(let index in array_list){
        const compInfo = array_list[index][0]
        let config = compInfo.getConfig()
        // 定位信息
        config['height'] = compInfo.$options.parent.h
        config['width'] = compInfo.$options.parent.w
        config['left'] = compInfo.$options.parent.left
        config['top'] = compInfo.$options.parent.top
        config['z'] = compInfo.$options.parent.z
        console.log("handleGetAllCompConfig", array_list[index])
        configArray.push(config)
      }
      this.sendMsg ({
        type: "allConfig",
        data: {
          configArray
        }
      })
    },
    // 改变编写状态
    handleChangeEditStatus (data){
      this.editAble = data.editAble
      if (!this.editAble){
        this.currentSelected = -1
        this.sendMsg ({
          type: "selectedComp",
        })
      }
    },
    // 必须添加容器
    handleMustAddContainer() {
      // var timestamp = String(new Date().getTime());
      this.containerList.push({
            // _id: timestamp,
            component: "containerComp"
          })
      const index = this.containerList.length - 1
      this.handleSelect(index, this.editAble)
    },

    // 增加组件
    handleAddComp (data) {
      // var timestamp = String(new Date().getTime());
      // data['_id'] = timestamp
      if(this.currentSelected == -1) {
        this.containerList.push(data)
        const index = this.containerList.length - 1
        this.handleSelect(index, this.editAble)
      }else{
        // 替换组件
        this.containerList.splice(this.currentSelected, 1, data)
        this.handleSelect(this.currentSelected, this.editAble)
      }
    },

    // 删除组件
    handleDelComp () {
      if (this.currentSelected != -1) {
        this.containerList.splice(this.currentSelected, 1)
        this.currentSelected = -1
        this.handleClearSelect()
      }
    },

    // 当选中组件时，就要开始设置组件的属性
    handleSelect (index, editAble) {
      if (!editAble) return
      this.currentSelected = index
      var that = this
      that.$nextTick(()=>{
        const {compDatas} = that.$refs[index][0].getConfig()
        that.sendMsg ({
          type: "selectedComp",
          data: {
            compDatas
          }
        })
      })
    },
    // 清空选择
    handleClearSelect(){
      this.currentSelected = -1
      this.sendMsg ({
        type: "selectedComp",
        data: {
          // compDatas:{}
        }
      })
    },
    handleChangeCompProps(data){
      if (this.currentSelected != -1){
        let tmpProps = this.containerList[this.currentSelected]
        tmpProps.props = data.props
        this.containerList.splice(this.currentSelected, 1, tmpProps)
      }

    },
  },
  // 挂载时添加消息监听事件
  mounted () {
    window.addEventListener('message', this.receiveMsg)
  },
  beforeDestroy () {
    window.removeEventListener('message', this.receiveMsg)
  },
}
</script>

<style lang="scss">
@import "index.scss";
</style>
