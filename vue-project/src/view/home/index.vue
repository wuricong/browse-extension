<script setup>
import { onMounted, ref } from "vue"
import { primaryUrlEnum, searchEngineEnum } from "../../../enum"
import WorkContact from "@/view/home/work-contact.vue"
import BookModal from "@/view/home/modal/book-modal.vue"
import ToolModal from "@/view/home/modal/tool-modal.vue"
import SvgIcon from "@/svg/svg-icon.vue"
import _ from "lodash"

const searchValue = ref()
const showBookModal = ref(false)
const showToolModal = ref(false)
const isComposition = ref(false)
const searchEngineList = ref(searchEngineEnum)
const curEngine = ref(1)
const curUrl = ref("")
const inInput = ref(false)
const searchRef = ref(null)
const toolRef = ref(null)

const collectUrls = [{ label: "阮一峰", id: 1, url: "https://www.ruanyifeng.com/blog/", imgUrl: "img/ruanyifeng.ico" }]

onMounted(() => {
  searchRef.value.$el.addEventListener("compositionstart", () => {
    isComposition.value = true
  })

  searchRef.value.$el.addEventListener("compositionend", () => {
    isComposition.value = false
  })
})

const handleSearchChange = _.debounce(() => {
  // fetch("http://localhost:49952?search=" + searchValue.value)
  //   .then((res) => res.json())
  //   .then((res) => {
  //     console.log("search change", res, res.msg)
  //   })
}, 300)
const handleBookOpen = () => {
  showBookModal.value = true
}

const handleToolOpen = () => {
  showToolModal.value = true
}

const handleDrop = () => {
  window.open(curUrl.value, "_self")
}

const handleDragEnter = () => {
  inInput.value = true
}

const handleDragleave = () => {
  inInput.value = false
}

const handleDragover = (e) => {
  e.preventDefault()
}

const handleSearch = () => {
  if (isComposition.value) {
    isComposition.value = false
    return
  }
  const index = searchEngineList.value.findIndex((item) => item.id === curEngine.value)
  const url = searchEngineList.value[index]
  window.open(`${url.value}=${searchValue.value}`)
}

const toPage = (item) => {
  window.open(item.url, "_blank")
}
</script>

<template>
  <!--  <button class="test-button">按钮</button>-->
  <div class="main-search-feat">
    <a-input-group compact style="display: flex; justify-content: center">
      <a-select :bordered="false" style="width: 60px" v-model:value="curEngine">
        <a-select-option v-for="item in searchEngineList" :value="item.id" :key="item.id">
          <svg-icon style="height: 16px" :name="item.svg" />
        </a-select-option>
      </a-select>
      <a-input
        ref="searchRef"
        class="search-input-content"
        :class="inInput ? 'in-input' : ''"
        @input="handleSearchChange"
        @keydown.enter="handleSearch"
        placeholder="请输入要搜索的内容"
        v-model:value="searchValue"
        style="width: 300px"
        allowClear
        @drop="handleDrop"
        @dragover="handleDragover"
        @dragenter="handleDragEnter"
        @dragleave="handleDragleave"
      />
      <a-button @click="handleSearch" type="primary" size="middle">搜索</a-button>
    </a-input-group>

    <div class="flex justify-center mb-2 primary-enum-main">
      <div class="flex flex-wrap gap-2" style="width: 680px">
        <div
          draggable="true"
          v-for="item in primaryUrlEnum"
          :key="item.name"
          @click="toPage(item)"
          @dragstart="curUrl = item.url"
          @dragend="curUrl = ''"
          class="cursor-pointer"
          :style="item.style || ''"
        >
          <svg-icon :style="item.svgStyle" :name="item.svg" />
        </div>
      </div>

      <div class="book-svg">
        <svg-icon :name="'book'" @click="handleBookOpen" class="cursor-pointer" />
        <svg-icon :name="'tools'" @click="handleToolOpen" class="cursor-pointer" />
      </div>
    </div>

    <div class="collect-urls text-slate-50">
      <div v-for="item in collectUrls" class="cursor-pointer flex items-center gap-2" @click="toPage(item)">
        <img style="height: 18px" :src="item.imgUrl" alt="" />
        <span>{{ item.label }}</span>
      </div>
    </div>
  </div>

  <div class="pt-2 px-2">
    <work-contact />
    <book-modal v-model="showBookModal" />
    <tool-modal ref="toolRef" v-model="showToolModal" />
  </div>
</template>

<style scoped lang="scss">
.main-search-feat {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 12px;
  justify-content: flex-start;
  position: fixed;
  width: 100%;
  height: 100%;
  min-width: 1360px;
  padding-top: 120px;
}

.anticon-ellipsis {
  border-radius: 4px;
  padding-left: 2px;
  padding-right: 2px;
}

.anticon-ellipsis:hover {
  background: rgba(200, 200, 200, 0.2); /* 半透明白色背景 */
}

.primary-enum-main {
  width: 720px;
  padding: 6px 10px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.02); /* 半透明背景（浅色系） */
  backdrop-filter: blur(18px);
}

.collect-urls {
  width: 720px;
  padding: 10px 12px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.15); /* 半透明背景（浅色系） */
  backdrop-filter: blur(18px);
}

.collect-urls > div {
  height: 22px;
  box-sizing: border-box;
  line-height: 22px;
}

:deep(.ant-select-selection-item) {
  display: flex;
  align-items: center;
}

.book-svg {
  padding-left: 20px;
  border-left: 1px solid #e7e8e9;
}

.search-input-content,
:deep(.ant-select-selector),
:deep(.ant-input:focus),
:deep(.ant-input:hover) {
  box-shadow: unset !important;
  border-color: transparent !important;
}

:deep(.ant-select-selector) {
  border-right: 1px solid #d9d9d9 !important;
}

:deep(.ant-select-selector) {
  border-right: 1px solid #d9d9d9 !important;
}

:deep(.ant-select),
:deep(.ant-select-open:active) {
  border-color: transparent !important;
  background-color: #ffffff;
}

.in-input {
  background: #d3e3fd;

  :deep(input) {
    background: #d3e3fd !important;
  }
}

.test-button {
  padding: 2px 8px;
  border-radius: 4px;
  color: #fff;
  background: #0052d9;
  filter: brightness(1);
  transition: all 0.3s;
}

.test-button:hover {
  filter: brightness(1.2);
}

.test-button:active {
  filter: brightness(0.9);
}
</style>
