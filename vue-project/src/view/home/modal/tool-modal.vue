<template>
  <a-modal v-model:open="visible" title="工具箱"></a-modal>
</template>
<script setup>
import { useVModel } from "@vueuse/core"

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(["update:showBookModal"])

// defineExpose({})

const visible = useVModel(props, "modelValue", emits)
</script>
<style scoped lang="scss"></style>
