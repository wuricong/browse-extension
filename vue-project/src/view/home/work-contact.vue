<template>
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
</template>
<script setup>
import { EllipsisOutlined } from "@ant-design/icons-vue"
import { ref } from "vue"
import { devItemsEnum, testItemsEnum } from "../../../enum/index.js"

const devItems = ref(devItemsEnum)
const testItems = ref(testItemsEnum)

const handleProdUrl = (item) => {
  window.open(item.prodUrl, "_blank")
}

const doOpenTab = (item) => {
  window.open(item.url, "_blank")
}
</script>
<style scoped lang="scss">
.devurl-container {
  width: 300px;
  flex-shrink: 0;
  color: #cad2da;
  background: rgba(0, 0, 0, 0.6); /* 半透明白色背景 */
  backdrop-filter: blur(10px); /* 设置背景模糊效果 */
  border-radius: 10px; /* 圆角 */
  padding: 10px; /* 内边距 */
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
    transition: all 0.3s;
  }

  .book:hover {
    background: rgba(0, 0, 0, 0.5);
  }
}
</style>
