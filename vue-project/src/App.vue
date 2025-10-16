<script setup>
import Home from "./view/home/index.vue"
import zhCN from "ant-design-vue/es/locale/zh_CN"
import dayjs from "dayjs"
import "dayjs/locale/zh-cn"
import { ref } from "vue"
dayjs.locale("zh-cn")

const locale = ref(zhCN)
</script>
<template>
  <a-config-provider :locale="locale">
    <Home />
  </a-config-provider>
</template>
