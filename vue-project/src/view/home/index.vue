<script setup>
import { onMounted, ref } from "vue"
import { primaryUrlEnum, devItemsEnum } from "../../../enum"
import { EllipsisOutlined } from "@ant-design/icons-vue"
import Control from "@/view/control/index.vue"
import _ from "lodash"
import BookModal from "@/view/home/modal/book-modal.vue"
import SvgIcon from "@/svg/svg-icon.vue"

const searchValue = ref()
const devItems = ref(devItemsEnum)
const controlRef = ref()
const showBookModal = ref(false)
const searchEngineEnum = ref([
  { label: "谷歌", value: "https://www.google.com/search?q", svg: "google", id: 1 },
  { label: "github", value: " https://github.com/search?q", svg: "github", id: 2 },
  { label: "必应", value: "https://cn.bing.com/search?q", svg: "bing", id: 3 },
  { label: "掘金", value: " https://juejin.cn/search?query", svg: "juejin", id: 4 },
  { label: "百度", value: "https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd", svg: "baidu", id: 5 },
])
const curEngine = ref(1)

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
  const index = searchEngineEnum.value.findIndex((item) => item.id === curEngine.value)
  const url = searchEngineEnum.value[index]
  window.open(`${url.value}=${searchValue.value}`)
}
</script>

<template>
  <div class="pt-2 px-2">
    <a-input-group compact style="width: 620px">
      <a-select style="width: 60px" v-model:value="curEngine">
        <a-select-option v-for="item in searchEngineEnum" :value="item.id" :key="item.id">
          <svg-icon style="height: 16px" :name="item.svg" />
        </a-select-option>
      </a-select>
      <a-input
        @input="handleSearchChange"
        @keydown.enter="handleSearch"
        placeholder="请输入要搜索的内容"
        v-model:value="searchValue"
        style="width: calc(100% - 200px); border-left: none"
      />
      <a-button @click="handleSearch" type="primary" size="middle">搜索</a-button>
    </a-input-group>

    <div class="py-2">
      <div class="flex gap-2 mb-2 primary-enum-main">
        <div v-for="item in primaryUrlEnum" :key="item.id" @click="doOpenTab(item)" class="cursor-pointer" :style="item.style || ''">
          <svg-icon :style="item.svgStyle" :name="item.svg" />
        </div>
        <div class="book-svg">
          <svg-icon :name="'book'" @click="handleBookOpen" class="cursor-pointer" />
        </div>
      </div>

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
    <!--    <div class="back-test">1111</div>-->
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

.primary-enum-main {
  width: fit-content;
  padding: 6px 10px;
  border-radius: 8px;
  background: rgba(0, 0, 0, 0.1); /* 半透明背景（浅色系） */
  -webkit-backdrop-filter: blur(10px) saturate(120%);
  backdrop-filter: blur(10px) saturate(120%);
}

:deep(.ant-select-selection-item) {
  display: flex;
  align-items: center;
}

.book-svg {
  margin-left: 8px;
  padding-left: 12px;
  border-left: 1px solid #ffffff;
}
</style>
