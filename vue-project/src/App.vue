<script setup>
import {onMounted, ref} from "vue";
import {primaryUrlEnum} from "../enum";

const bookmarks = ref([])
const searchValue = ref()

const doOpenTab = (item) => {
  window.open(item.url,'_blank')
}

onMounted(()=>{
  chrome.bookmarks.getTree((bookmarkTreeNodes) => {
    bookmarks.value = bookmarkTreeNodes[0].children.reduce((cur,prev)=>{
      return [...cur,...prev.children]
    },[])

    console.log('bookmarks.value',bookmarks.value)
  });
})

</script>

<template>
  <div class="mask"></div>
  <a-input style="width: 300px" placeholder="请输入要搜索的内容" v-model="searchValue"/>
  <div class="py-2 px-2">
    <div class="mb-2" style="cursor: pointer">主要网站</div>
    <div class="flex gap-2 mb-2">
      <div  v-for="item in primaryUrlEnum" :key="item.id" @click="doOpenTab(item)" class="cursor-pointer">
        <svg-icon :name="item.svg"/>
      </div>
    </div>
    <div class="py-2">
      <div class="book-container w-1/3">
        <div class="book-inner">
          <div class="book" v-for="item in bookmarks" :key="item.id" @click="doOpenTab(item)">
            {{item.title}}
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.web-tag:hover {
  background-color:#293e6b !important;
}

.book-container{
  color: #CAD2DA;
  background: rgba(0, 0, 0, 0.4); /* 半透明白色背景 */
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
  .book{
    margin: 8px 0;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    border-radius: 4px;
    padding: 4px 8px;
  }

  .book:hover{
    background: rgba(0, 0, 0, 0.5)
  }
}
</style>
