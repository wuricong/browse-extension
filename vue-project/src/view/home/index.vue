<script setup>
import { computed, onMounted, ref } from "vue"
import { primaryUrlEnum, devItemsEnum } from "../../../enum"
import { DeleteOutlined, EllipsisOutlined } from "@ant-design/icons-vue"
import Control from "@/view/control/index.vue"
import _ from "lodash"

const bookmarks = ref([])
const searchValue = ref()
const searchBook = ref("")
const open = ref(false)
const devItems = ref(devItemsEnum)
const controlRef = ref()

const doOpenTab = (item) => {
  window.open(item.url, "_blank")
}

const handleSearchChange = _.debounce(() => {
  fetch("http://8.141.112.69:3000/hello").then((res) => {
    console.log("res", res)
  })
}, 300)

function getBooks(bookList, books) {
  for (const book of bookList) {
    if (book.children) {
      getBooks(book.children, books)
    } else {
      books.push(book)
    }
  }
}

const delBook = (row) => {
  chrome.bookmarks.remove(row.id)
  refreshBookMarks()
}

const refreshBookMarks = () => {
  if (chrome.bookmarks) {
    chrome.bookmarks.getTree((bookmarkTreeNodes) => {
      let books = []
      getBooks(bookmarkTreeNodes, books)
      bookmarks.value = books
    })
  }
}

const computedBooks = computed(() => {
  return bookmarks.value.filter((item) => item.title.includes(searchBook.value))
})

const handleBookOpen = () => {
  open.value = true
}

const handleProdUrl = (item) => {}

onMounted(() => {
  refreshBookMarks()
})

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
      <a-input
        size="middle"
        style="width: 300px"
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
                <EllipsisOutlined class="flex items-center" />
              </a-popover>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Control ref="controlRef" />
    <div ref="mod">
      <a-modal v-model:open="open" title="书签" @ok="handleOk" :getContainer="() => $refs.mod">
        <div class="book-container">
          <div class="mb-2">
            <a-input size="small" style="width: 300px" placeholder="请输入要搜索的书签" v-model:value="searchBook" />
          </div>
          <div class="book-inner">
            <div class="book flex justify-between items-center" v-for="item in computedBooks" :key="item.id" @click="doOpenTab(item)">
              <div class="flex-grow">{{ item.title }}</div>
              <DeleteOutlined @click.stop="delBook(item)" />
            </div>
          </div>
        </div>
      </a-modal>
    </div>
  </div>
</template>

<style scoped lang="scss">
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

.book-container {
  height: 500px;
  overflow: auto;
  flex-shrink: 0;
  color: #cad2da;
  background: rgba(0, 0, 0, 0.6); /* 半透明白色背景 */
  backdrop-filter: blur(10px); /* 设置背景模糊效果 */
  -webkit-backdrop-filter: blur(10px); /* Safari 支持 */
  border-radius: 10px; /* 圆角 */
  padding: 10px; /* 内边距 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 阴影效果 */
}

.book-inner {
  min-height: 300px;
  max-height: 600px;
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

:deep(.ant-modal-content) {
  color: #cad2da;
  background: rgba(200, 200, 200, 0.2); /* 半透明白色背景 */
  backdrop-filter: blur(10px); /* 设置背景模糊效果 */
  -webkit-backdrop-filter: blur(10px); /* Safari 支持 */

  .ant-modal-header {
    background-color: rgba(0, 0, 0, 0);

    .ant-modal-title {
      color: #fff !important;
    }
  }
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
</style>
