<script setup>
import { onMounted, ref } from "vue"
import { primaryUrlEnum, devItemsEnum, testItemsEnum, searchEngineEnum } from "../../../enum"
import { EllipsisOutlined } from "@ant-design/icons-vue"
import Control from "@/view/control/index.vue"
import _ from "lodash"
import BookModal from "@/view/home/modal/book-modal.vue"
import SvgIcon from "@/svg/svg-icon.vue"

const searchValue = ref()
const devItems = ref(devItemsEnum)
const testItems = ref(testItemsEnum)
const controlRef = ref()
const showBookModal = ref(false)
const isComposition = ref(false)
const searchEngineList = ref(searchEngineEnum)
const curEngine = ref(1)

const doOpenTab = (item) => {
  window.open(item.url, "_blank")
}

onMounted(() => {
  // chrome.runtime.connectNative("com.mycompany.localstarter")
})

const handleSearchChange = _.debounce(() => {
  console.log("search change", searchValue.value)
  // fetch("http://8.141.112.69:3000/hello").then((res) => {
  //   console.log("res", res)
  // })
}, 300)
const handleBookOpen = () => {
  showBookModal.value = true
}

const handleProdUrl = (item) => {
  window.open(item.prodUrl, "_blank")
}

window.addEventListener("compositionstart", () => {
  isComposition.value = true
})
window.addEventListener("compositionend", () => {
  isComposition.value = false
})

const handleSearch = () => {
  if (isComposition.value) return
  const index = searchEngineList.value.findIndex((item) => item.id === curEngine.value)
  const url = searchEngineList.value[index]
  window.open(`${url.value}=${searchValue.value}`)
}
</script>

<template>
  <div class="main-search-feat">
    <a-input-group compact style="display: flex; justify-content: center">
      <a-select :bordered="false" style="width: 60px" v-model:value="curEngine">
        <a-select-option v-for="item in searchEngineList" :value="item.id" :key="item.id">
          <svg-icon style="height: 16px" :name="item.svg" />
        </a-select-option>
      </a-select>
      <a-input
        class="search-input-content"
        @input="handleSearchChange"
        @keydown.enter="handleSearch"
        placeholder="请输入要搜索的内容"
        v-model:value="searchValue"
        style="width: 300px"
        allowClear
      />
      <a-button @click="handleSearch" type="primary" size="middle">搜索</a-button>
    </a-input-group>

    <div class="flex justify-center mb-2 primary-enum-main">
      <div class="flex gap-2" style="width: 680px; flex-wrap: wrap">
        <div v-for="item in primaryUrlEnum" :key="item.name" @click="doOpenTab(item)" class="cursor-pointer" :style="item.style || ''">
          <svg-icon :style="item.svgStyle" :name="item.svg" />
        </div>
      </div>

      <div class="book-svg">
        <svg-icon :name="'book'" @click="handleBookOpen" class="cursor-pointer" />
        <svg-icon :name="'tools'" @click="handleBookOpen" class="cursor-pointer" />
      </div>
    </div>
  </div>

  <div class="pt-2 px-2">
    <div class="py-2 flex justify-between">
      <div class="devurl-container">
        <div class="book-inner">
          <div>
            <div class="book flex justify-between items-center" v-for="item in devItems" :key="item.id" @click="doOpenTab(item)">
              <div>{{ item.title }}</div>
              <a-popover v-if="item.prodUrl">
                <template #content>
                  <a-button type="link" size="small" @click="handleProdUrl(item)">生产</a-button>
                </template>
                <EllipsisOutlined class="flex items-center" @click.stop />
              </a-popover>
            </div>
          </div>
          <div>
            <div class="book flex justify-between items-center" v-for="item in testItems" :key="item.id" @click="doOpenTab(item)">
              <div>{{ item.title }}</div>
              <a-popover v-if="item.prodUrl">
                <template #content>
                  <a-button type="link" size="small" @click="handleProdUrl(item)">生产</a-button>
                </template>
                <EllipsisOutlined class="flex items-center" @click.stop />
              </a-popover>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Control ref="controlRef" />

    <book-modal v-model="showBookModal" />
    <!--    <div class="back-test">1111</div>-->
  </div>
</template>

<style scoped lang="scss">
.main-search-feat {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 12px;
  justify-content: center;
  position: fixed;
  left: 50%;
  top: 100px;
  transform: translateX(-50%);
}

.back-test {
  width: 100px;
  height: 100px;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.35); /* 半透明背景（浅色系） */
  -webkit-backdrop-filter: blur(10px) saturate(120%);
  backdrop-filter: blur(10px) saturate(120%);
  border-radius: 10px;
}

.devurl-container {
  width: 300px;
  flex-shrink: 0;
  color: #cad2da;
  background: rgba(0, 0, 0, 0.4); /* 半透明白色背景 */
  backdrop-filter: blur(10px); /* 设置背景模糊效果 */
  -webkit-backdrop-filter: blur(10px); /* Safari 支持 */
  border-radius: 10px; /* 圆角 */
  padding: 10px; /* 内边距 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 阴影效果 */
}

.anticon-ellipsis {
  border-radius: 4px;
  padding-left: 2px;
  padding-right: 2px;
}

.anticon-ellipsis:hover {
  background: rgba(200, 200, 200, 0.2); /* 半透明白色背景 */
}

.book-inner {
  min-height: 300px;
  flex: 1;
  overflow: auto;

  > div:nth-child(1) {
    border-bottom: 2px solid #cad2da;
  }

  .book {
    margin: 8px 0;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    border-radius: 4px;
    padding: 4px 8px;
  }

  .book:hover {
    background: rgba(0, 0, 0, 0.5);
  }
}

.primary-enum-main {
  width: 720px;
  padding: 6px 10px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.2); /* 半透明背景（浅色系） */
  -webkit-backdrop-filter: blur(10px) saturate(120%);
  backdrop-filter: blur(18px) saturate(120%);
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
</style>
