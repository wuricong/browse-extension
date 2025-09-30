<script setup>
import MdnSvg from '@/svg/mdn-svg.vue'
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
  <mdn-svg/>
  <a-input style="width: 300px" placeholder="请输入要搜索的内容" v-model="searchValue"/>
  <div class="py-2 px-2">
    <div>主要网站</div>
    <div class="flex mb-2">
      <a-tag class="cursor-pointer web-tag" color="#3b5999" v-for="item in primaryUrlEnum" :key="item.id" @click="doOpenTab(item)">
        {{item.name}}
      </a-tag>
    </div>
    <div>书签</div>
    <div class="py-2">
      <div class="book-container w-1/3">
        <div class="book" v-for="item in bookmarks" :key="item.id" @click="doOpenTab(item)">
          {{item.title}}
        </div>
      </div>
    </div>

  </div>


</template>

<style scoped lang="scss">
.book{
  margin: 8px 0;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;

  //&:hover{
  // background-color
  //}
}

.web-tag:hover {
  background-color:#293e6b !important;
}

.book-container{
  //min-height: 300px;
  //max-height: 600px;
  height: 500px;
  color: #CAD2DA;
  overflow: auto;
  background: rgba(0, 0, 0, 0.4); /* 半透明白色背景 */
  backdrop-filter: blur(10px); /* 设置背景模糊效果 */
  -webkit-backdrop-filter: blur(10px); /* Safari 支持 */
  border-radius: 10px; /* 圆角 */
  padding: 20px; /* 内边距 */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* 阴影效果 */
}
</style>
