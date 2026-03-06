<template>
  <a-modal v-model:open="visible" title="工具箱">
    <ButtonGroup />
    <a-space>
      <a-button size="small" type="primary" @click="base64Modal">图片转 base64</a-button>
      <a-button size="small" type="primary" @click="openJSONModal">JSON转换</a-button>
    </a-space>
    <json-format-modal v-model:open="jsonModal" />
  </a-modal>
</template>
<script setup>
import { useVModel } from "@vueuse/core"
import ButtonGroup from "@/components/button-group/index.vue"
import JsonFormatModal from "@/view/home/modal/json-format-modal.vue"
import { ref, watch } from "vue"

const emits = defineEmits(["update:moduleValue"])
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})

const jsonModal = ref(false)

const openJSONModal = () => {
  jsonModal.value = true
}

const base64Modal = () => {}

const visible = useVModel(props, "modelValue", emits)
watch(visible, (val) => {
  console.log("val", val)
})
</script>
<style scoped lang="scss"></style>
