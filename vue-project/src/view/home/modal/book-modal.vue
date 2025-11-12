<template>
  <div ref="modalRef" class="modal-container">
    <a-modal :getContainer="() => $refs.modalRef" v-model:open="visible" title="书签" :footer="null" @close="visible = false">
      <div class="book-container">
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
          <div>共 {{ computedBooks.length }} 条</div>
        </div>
        <div class="book-inner" @mouseleave="curIndex = undefined">
          <div
            class="book"
            :class="curIndex === index ? 'book-active' : ''"
            v-for="(item, index) in computedBooks"
            :key="item.id"
            @click="doOpenTab(item)"
            @mouseenter="(e) => handleBookMouseEnter(e, index)"
          >
            <div class="flex-grow mb-2">{{ item.title }}</div>
            <div class="flex items-center gap-2" style="color: #91b859; font-size: 12px; line-height: 12px">
              {{ dayjs(item.dateAdded).format("YYYY-MM-DD HH:mm:ss") }}
              <svg-icon style="width: 12px; height: 12px" name="book-del" @click.stop="delBook(item)" />
            </div>
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

const refreshBookMarks = () => {
  if (chrome.bookmarks) {
    chrome.bookmarks.getTree((bookmarkTreeNodes) => {
      let books = []
      getBooks(bookmarkTreeNodes, books)
      // handleBookGroup(bookmarkTreeNodes[0])
      bookmarks.value = books?.reverse()
      console.log("books", bookmarkTreeNodes, bookmarks.value.length)
    })
  } else {
    bookmarks.value = testUrls
  }
}

const handleBookMouseEnter = (e, i) => {
  curIndex.value = i
}

const handleSearchInput = (val) => {
  if (val) {
    curIndex.value = 0
  }
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
}

const doOpenTab = (item) => {
  window.open(item.url, "_blank")
}

const delBook = (row) => {
  chrome.bookmarks.remove(row.id)
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
  overflow: auto;

  .book {
    margin: 8px 0;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    border-radius: 4px;
    padding: 4px 8px;
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
</style>
