<template>
  <a-modal v-model:open="visible" title="JSON转换" width="800px">
    <div class="json-container">
      <a-textarea style="width: 320px" @change="jsonValueChange" v-model="jsonValue" />
      <div style="background: #f1f3f8; padding: 12px 8px" class="relative h-full w-full overflow-auto rounded-md">
        <a-tree :tree-data="treeData" />
        <a-button class="absolute top-2 right-2" type="primary" size="small" @click="handleCopy" ghost>复制</a-button>
      </div>
    </div>
  </a-modal>
</template>
<script setup lang="ts">
import { useVModel } from "@vueuse/core"
import { nextTick, ref } from "vue"
import type { TreeProps } from "ant-design-vue"
import { App } from "ant-design-vue"
import { copyText } from "@/utils"

const { message } = App.useApp()

const emit = defineEmits(["update:open"])
const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
})

const jsonValue = ref("")

const treeData = ref<TreeProps["treeData"]>([])

const visible = useVModel(props, "open", emit)

const handleCopy = () => {
  copyText("成功").then(() => {
    message.success("成功")
  })
}

const jsonValueChange = (val) => {
  nextTick(() => {
    try {
      const obj = JSON.parse(val.data)
      treeData.value = [{ title: "parent 1", key: null, children: objToTree(obj, [], null) }]
    } catch (e) {
      message.error("不是有效的json格式")
    }
  })
}

const objToTree = (data, treeData, parentId) => {
  Object.keys(data).forEach((key, index) => {
    const id = parentId ? `${parentId}-${index}` : index
    if (data[key] !== null && ["object", "array"].includes(typeof data[key])) {
      treeData.push({ title: key, key: id, children: objToTree(data[key], [], id) })
    } else {
      treeData.push({ title: data[key], key: id })
    }
  })
  return treeData
}

const obj1 = {
  a: 1,
  b: [2, 3, 4, 11, 12, 13, 14, 23, 34, 54, 643, 54, 6, 7, 54, 4343, 43, 32, 212, { c: 5, d: 2, e: 21, g: 21, r: 2, t: 2, b: 99 }],
  d: { f: 6, e: 8 },
}
</script>
<style scoped lang="scss">
.json-container {
  height: 460px;
  display: flex;
  gap: 24px;
}

:deep(.ant-tree-list-holder-inner) {
  background: #f1f3f8;
}
</style>
