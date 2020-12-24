<template>
  <div class="propInput">
    <div class="changePropsItemKey">{{ name }}</div>
    <input @input="$emit('input', $event.target.value)" />
  </div>
</template>

<script>
export default {
  name:"propInput",
  props:{
    name:{
      type:String,
      default: () => "标签"
    }
  }
}
</script>

<style lang="scss">
@import "index.scss";
</style>
