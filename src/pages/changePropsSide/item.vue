<template>
  <div class="propsTypeWrap">

    <!-- 属性为 string 或 number -->
    <template v-if="checkType(value) === 'string' || checkType(value) === 'number'">
      <div class="changePropsItemKey" v-if="name">{{name}}</div>
      <input :value="value" @input="$emit('input', $event.target.value)"/>
    </template>

    <!-- 属性为 object -->
    <template v-if="checkType(value) === 'object'">
      <template v-for="(item, index) in value">
        <PropsItem :key="index" v-model="value[index]" :name="index"></PropsItem>
      </template>
    </template>

    <!-- 属性为 array -->
    <template v-if="checkType(value) === 'array'">
      <template v-for="(item, index) in value">
        <div class="propsTypeArrayItemWrap" :key="index">
          <el-button v-if="value.length > 1" @click="handleRemoveItem(index)" class="propsTypeArrayItemRemove" type="danger" icon="el-icon-close" circle></el-button>
          <PropsItem v-model="value[index]" :name="''"></PropsItem>
        </div>
      </template>
    </template>

  </div>
</template>

<script>
export default {
  name: 'PropsItem',
  props: {
    value: {
      type: [Object, Array, Number, String, Boolean]
    },
    name: {
      type: String
    }
  },
  methods: {
    // 判断类型
    checkType (data) {
      return Object.prototype.toString.call(data).match(/\[object (.*?)\]/)[1].toLocaleLowerCase()
    },
  }
}
</script>

<style>

</style>
