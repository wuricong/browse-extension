<template>
  <div ref="modalRef" class="modal-container">
    <a-modal width="600px" :getContainer="() => $refs.modalRef" v-model:open="visible" title="书签" :footer="null" @close="reset">
      <div class="book-container relative">
        <div class="search-input mb-2 flex items-center justify-between">
          <a-input
            ref="searchRef"
            size="small"
            style="width: 200px; height: 28px"
            placeholder="请输入要搜索的书签"
            v-model:value="searchBook"
            @input="handleSearchInput"
            @keydown="handleInputKeyDown"
          />
          <svg-icon
            v-show="searchBook"
            style="width: 14px; height: 14px"
            class="cursor-pointer"
            name="clear"
            @click.stop="clearSearchValue"
          />
          <div>共 {{ computedBooks.length }} 条</div>
        </div>
        <div class="book-inner" ref="bookRef" @scroll="onScroll" @mouseleave="curIndex = undefined">
          <div
            class="book"
            :class="curIndex === index ? 'book-active' : ''"
            v-for="(item, index) in computedBooks"
            :key="item.id"
            @click="doOpenTab(item)"
            @mouseenter="(e) => debounceBookMouseEnter(e, index)"
          >
            <div class="flex-grow mb-2">{{ item.title }}</div>
            <div class="flex items-center gap-2" style="color: #91b859; font-size: 12px; line-height: 12px">
              {{ dayjs(item.dateAdded).format("YYYY-MM-DD HH:mm:ss") }}
            </div>
            <CloseCircleFilled v-show="curIndex === index" class="del cursor-pointer" @click.stop="delBook(item)" />
          </div>
          <div class="to-up" v-show="isShowToUp" @click="toUp">
            <svg-icon style="width: 16px; height: 16px" name="to-up" class="cursor-pointer" />
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script setup>
import { computed, nextTick, onMounted, ref, watch } from "vue"
import { useVModel } from "@vueuse/core"
import { testUrls } from "../../../../enum/index.js"
import dayjs from "dayjs"
import SvgIcon from "@/svg/svg-icon.vue"
import { ISDEV } from "@/utils/index.js"
import { CloseCircleFilled } from "@ant-design/icons-vue"
import { message } from "ant-design-vue"
import _ from "lodash"

const searchBook = ref("")
const bookmarks = ref([])
const bookTypeGroup = ref([])
const searchRef = ref(null)
const modalRef = ref(null)

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
})

const emits = defineEmits(["load", "update:modelValue"])
const visible = useVModel(props, "modelValue", emits)
const curIndex = ref()
const bookRef = ref(null)
const isShowToUp = ref(false)

onMounted(() => {
  refreshBookMarks()
})

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      nextTick(() => {
        searchRef.value?.focus()
      })
    }
  },
)

const computedBooks = computed(() => {
  const keyword = searchBook.value.toLowerCase()
  return bookmarks.value.filter((item) => item.title.toLowerCase().includes(keyword))
})

const onScroll = (e) => {
  isShowToUp.value = e.target.scrollTop > 100
}

const refreshBookMarks = () => {
  if (!ISDEV) {
    chrome.bookmarks.getTree((bookmarkTreeNodes) => {
      let books = []
      getBooks(bookmarkTreeNodes, books)
      bookmarks.value = books.sort((a, b) => b.dateAdded - a.dateAdded)
      console.log("books", bookmarkTreeNodes, bookmarks.value)
    })
  } else {
    bookmarks.value = testUrls
  }
}

const clearSearchValue = () => {
  searchBook.value = ""
}

const handleBookMouseEnter = (e, i) => {
  curIndex.value = i
}

const debounceBookMouseEnter = _.debounce(handleBookMouseEnter, 100)

const handleSearchInput = (val) => {
  if (val) {
    curIndex.value = 0
  }
}

const toUp = () => {
  bookRef.value.scrollTo({
    top: 0,
    behavior: "smooth",
  })
}

const reset = () => {
  visible.value = false
  searchBook.value = ""
}

const handleInputKeyDown = (e) => {
  if (["ArrowDown", "ArrowUp"].includes(e.code)) {
    e.preventDefault()
  }
  if (e.code === "ArrowDown" && curIndex.value < computedBooks.value.length - 1) {
    curIndex.value += 1
  } else if (e.code === "ArrowUp" && curIndex.value !== 0) {
    curIndex.value -= 1
  } else if (e.code === "Enter") {
    window.open(computedBooks.value[curIndex.value].url, "_blank")
  }

  nextTick(() => {
    const el = document.querySelector(".book-active")
    el?.scrollIntoView({
      block: "nearest",
      behavior: "smooth",
    })
  })
}

const doOpenTab = (item) => {
  window.open(item.url, "_blank")
}

const delBook = (row) => {
  chrome.bookmarks.remove(row.id)
  message.success("删除成功")
  refreshBookMarks()
}

function getBooks(bookList, books) {
  for (const book of bookList) {
    if (book.children) {
      getBooks(book.children, books)
    } else {
      books.push(book)
    }
  }
}

const handleBookGroup = (books) => {
  const booksGroup = books.filter((book) => book.children)
  bookTypeGroup.value = []
}

defineExpose({ open })
</script>
<style scoped lang="scss">
.book-container {
  height: 500px;
  overflow: auto;
  flex-shrink: 0;
  color: #cad2da;
  background: rgba(0, 0, 0, 0); /* 半透明白色背景 */
  border-radius: 10px; /* 圆角 */
  padding: 10px; /* 内边距 */
  display: flex;
  flex-direction: column;
}

.book-inner {
  min-height: 300px;
  flex: 1;
  overflow-y: auto;
  padding-right: 4px;

  .book {
    position: relative;
    margin: 8px 0;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    border-radius: 4px;
    padding: 4px 16px 4px 8px;
  }
}

.book-active {
  background: rgba(0, 0, 0, 0.3);
}

.modal-container {
  :deep(.ant-modal-content) {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.15); /* 半透明背景（浅色系） */
    -webkit-backdrop-filter: blur(10px) saturate(120%);
    backdrop-filter: blur(10px) saturate(120%);

    .ant-modal-header {
      background-color: rgba(0, 0, 0, 0);

      .ant-modal-title {
        color: #ffffff !important;
      }
    }

    .ant-modal-close-x {
      color: #fff;
    }
  }
}

:deep(.ant-input) {
  flex: 1;
  color: #cad2da;
  background: rgba(0, 0, 0, 0);
  border: none;
  padding: 0 !important;
  height: 36px !important;
  line-height: 36px !important;
  caret-color: #cad2da; /* 光标颜色 */

  &::placeholder {
    padding-left: 6px;
    color: #8f8f8f;
  }
}

:deep(.ant-input:focus) {
  border: none;
  box-shadow: none;
}

.search-input {
  gap: 12px;
  padding: 0 6px !important;
  border-bottom: 2px solid #cad2da;
}

.to-up {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: green;
  display: flex;
  align-items: center;
  justify-content: center;
}

.del {
  position: absolute;
  top: -5px;
  right: -4px;
  z-index: 9999;
}
</style>
