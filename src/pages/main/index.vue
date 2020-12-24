<template>
  <div class="Main">
    <div class="mainHeader">
      <div class="mainHeader__left">
        <div class="logo">
          <el-avatar :size="40" :src="require('@/assets/logo.png')"></el-avatar>
        </div>
        <!-- <div class="logo"></div> -->
        <a href="">可视化编辑器</a>
      </div>
      <div class="mainHeader__tools">
        <el-button type="primary" @click="showConfigDialog">显示配置</el-button>
      </div>
    </div>
    <div class="mainBody">
      <!-- 左边 -->
      <div class="leftSide">
        <componentsSide :sendMsg="sendMsg"></componentsSide>
      </div>
      <!-- 中间iframe部分 -->
      <div class="centerBody">
        <viewPage
          :handleFrameLoad="handleFrameLoad"
          :sendMsg="sendMsg"
        ></viewPage>
      </div>
      <!-- 右边 -->
      <div class="rightSide">
        <changePropsSide
          :handleChangeProps="handleChangeProps"
          :currentCompProps="currentCompProps"
          :hadSelectedComp="hadSelectedComp"
          :sendMsg="sendMsg"
        ></changePropsSide>
      </div>
    </div>
    <el-dialog
      title="全部配置信息"
      :visible.sync="allConfigDialogVisible"
      width="50%"
      center
    >
      <span
        ><json-viewer
          :value="allConfig"
          :copyable="{ copyText: '复制', copiedText: '已复制' }"
          :expanded='false'
        ></json-viewer
      ></span>
      <span>若无显示不正确，请折叠后再展开</span>
      <!-- <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="allConfigDialogVisible = false"
          >复制</el-button
        >
      </span> -->
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      viewFrame: null,
      currentCompProps: {},  //当前要修改的属性
      hadSelectedComp: false,  //判断是否选择了组件
      allConfigDialogVisible: false,
      allConfig:{}
    }
  },
  components: {
    componentsSide: () => import('../componentsSide'), // 组件库
    viewPage: () => import('../viewPage'), // 可视化区域
    changePropsSide: () => import('../changePropsSide') // 改变参数
  },
  methods: {
    // 这是向iframe发送信息
    sendMsg (data) {
      // 如果iframe没加载好，那就不要发送请求
      if (!this.viewFrame) return
      this.viewFrame.contentWindow.postMessage(data, `${location.href}view`)
    },
    receiveMsg (msg) {
      // msg是系统包装后的，传送过来的信息在data字段中
      const msgData = msg.data
      const {type} = msgData
      const {data} = msgData
      if (type=="selectedComp"){
        this.currentCompProps = data
        console.log("selectedComp",data)
        console.log("selectedComp",Object.keys(data))
        if (Object.keys(data) == 0 ){
          this.hadSelectedComp = false
        }else{
          this.hadSelectedComp = true
        }
      }
      if (type=="allConfig"){
        this.setAllConfig(data)
      }
    },
    showConfigDialog(){
      this.allConfigDialogVisible = true
      this.sendMsg({
        type: 'getAllCompConfig',
      })
    },
    setAllConfig(data){
      this.allConfig["compList"] = data['configArray']
      console.log(data)
    },
    // 当iframe加载成功后，保存对象
    handleFrameLoad (frameContext) {
      this.viewFrame = frameContext
    },
    // 修改 props
    handleChangeProps (props) {
      this.sendMsg({
        type: 'changeCompProps',
        data: {
          props
        }
      })
    }
  },
  mounted: function () {
    window.addEventListener('message', this.receiveMsg)
  },
  beforeDestroy: function () {
    window.removeEventListener('message', this.receiveMsg)
  },
}
</script>

<style lang='scss'>
@import "index.scss";
</style>
