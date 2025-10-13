<template>
  <svg style="width: 26px; height: 26px">
    <use :xlink:href="`#${prefix}-${name}`" />
  </svg>
</template>
<script setup>
const props = defineProps({
  prefix: {
    type: String,
    default: "icon",
  },
  name: {
    type: String,
    default: () => {},
  },
})
</script>
<style scoped lang="scss"></style>
