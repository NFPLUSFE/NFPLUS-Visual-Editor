<template>
  <div class="propsTypeWrap">
    <div class="dataList">
      <div class="dataTools">
        <h4>数据列表</h4>
        <el-button
          type="primary"
          icon="el-icon-plus"
          circle
          @click="handleAddData"
        ></el-button>
      </div>
      <el-table
        :data="compDatas"
        style="width: 100%"
        @row-click="handleDataSelect"
      >
        <el-table-column
          :prop="key"
          :label="key"
          width="150px"
          v-for="(value, key) in compDatas[0]"
          :key="key"
        >
        </el-table-column>
      </el-table>
    </div>

    <div v-for="(item, index) in compDatas" :key="index">
      {{ item }}
    </div>
    <div v-for="(item, index) in compProps" :key="index">
      {{ item }}
    </div>
    <div>
      <div v-for="(item, index) in compProps" :key="index">
        <component
          :is="item.type"
          @click.native.stop=""
          v-bind="item.props"
          :name="item.name"
          :key="index"
          :ref="item.name"
        >
        </component>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PropsItem',
  props: {
    compProps: {
      type: Array
    },
    compDatas: {
      type: Array
    }
  },
  computed:{
    dict() {
      for(let item of this.compProps){
        console.log("dict",item)
      }
    return 1
   }
  },
  methods:{
    handleAddData(){
      console.log("增加一条数据")
    },
    handleDataSelect(row, column, event){
      console.log("选择了这一条数据", row, column, event)
    }
  }

}
</script>

<style>
</style>
