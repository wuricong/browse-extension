<script setup>
import { onMounted, ref } from "vue"
import { primaryUrlEnum, devItemsEnum } from "../../../enum"
import { EllipsisOutlined } from "@ant-design/icons-vue"
import Control from "@/view/control/index.vue"
import _ from "lodash"
import BookModal from "@/view/home/modal/book-modal.vue"

const searchValue = ref()
const devItems = ref(devItemsEnum)
const controlRef = ref()
const showBookModal = ref(false)

const doOpenTab = (item) => {
  window.open(item.url, "_blank")
}

onMounted(() => {
  // chrome.runtime.connectNative("com.mycompany.localstarter")
})

const handleSearchChange = _.debounce(() => {
  fetch("http://8.141.112.69:3000/hello").then((res) => {
    console.log("res", res)
  })
}, 300)
const handleBookOpen = () => {
  showBookModal.value = true
}

const handleProdUrl = (item) => {
  window.open(item.prodUrl, "_blank")
}

const handleSearch = () => {
  window.open(`https://www.google.com/search?q=${searchValue.value}`)
}

const handleOk = () => {
  console.log("handleOk")
}

const openPuppeteer = () => {
  controlRef.value.openServer()
}
</script>

<template>
  <a-button @click="openPuppeteer" type="primary" size="small">开启Puppeteer</a-button>
  <div class="pt-2">
    <div class="flex items-center ml-2 search" style="background-color: #fff; width: 300px">
      <a-input-search
        size="middle"
        style="width: 260px"
        @input="handleSearchChange"
        @keydown.enter="handleSearch"
        placeholder="请输入要搜索的内容"
        v-model:value="searchValue"
      />
      <div>
        <a-button @click="handleSearch" type="primary" size="middle">搜索</a-button>
      </div>
    </div>

    <div class="py-2 px-2">
      <div class="flex gap-2 mb-2">
        <div v-for="item in primaryUrlEnum" :key="item.id" @click="doOpenTab(item)" class="cursor-pointer" :style="item.style || ''">
          <svg-icon :style="item.svgStyle" :name="item.svg" />
        </div>
      </div>

      <svg-icon :name="'book'" @click="handleBookOpen" class="cursor-pointer" />

      <div class="py-2 flex justify-between">
        <div class="devurl-container">
          <div class="book-inner">
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
        </div>
      </div>
    </div>

    <Control ref="controlRef" />

    <book-modal v-model="showBookModal" />
    <div class="back-test">1111</div>
  </div>
</template>

<style scoped lang="scss">
.back-test {
  width: 100px;
  height: 100px;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.35); /* 半透明背景（浅色系） */
  -webkit-backdrop-filter: blur(10px) saturate(120%);
  backdrop-filter: blur(10px) saturate(120%);
  border-radius: 10px;
}

.web-tag:hover {
  background-color: #293e6b !important;
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

.search {
  :deep(.ant-input) {
    border: none;

    &:focus {
      border: none;
      box-shadow: none;
    }
  }
}

.book-inner {
  min-height: 300px;
  flex: 1;
  overflow: auto;

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
</style>
