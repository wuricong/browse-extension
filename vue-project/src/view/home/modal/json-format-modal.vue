<template>
  <a-modal v-model:open="visible" title="JSON转换">
    <div>111</div>
  </a-modal>
</template>
<script setup>
import { useVModel } from "@vueuse/core"
import { onMounted } from "vue"

const emits = defineEmits(["update:modelValue"])
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})

onMounted(() => {
  console.log(JSON.stringify({ a: 1, b: [1, 2, 3, 4, 5], c: "1", d: () => {}, e: function () {}, f: null }))
})

const visible = useVModel(props, "modelValue", emits)
</script>
<style scoped lang="scss"></style>
