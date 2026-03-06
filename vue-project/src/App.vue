<script setup>
import Home from "./view/home/index.vue"
import zhCN from "ant-design-vue/es/locale/zh_CN"
import dayjs from "dayjs"
import "dayjs/locale/zh-cn"
import { ref } from "vue"
dayjs.locale("zh-cn")

const themeConfig = ref({
  token: {
    colorPrimary: "#0052D9",
  },
})

const locale = ref(zhCN)
</script>
<template>
  <a-config-provider :theme="themeConfig" :locale="locale">
    <a-app>
      <div class="mask"></div>
      <Home />
    </a-app>
  </a-config-provider>
</template>
