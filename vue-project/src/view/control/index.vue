<template>
  <div style="color: #ffffff">
    服务监控
    <div v-for="item in serverList" :key="item.id">{{ item.title }}</div>
    <a-button type="primary" @click="closeServer">关闭服务</a-button>
  </div>
</template>
<script setup>
import { ref } from "vue"
import { recommendText } from "../../../enum/index.js"
import { encryptWithSeed, packEncrypted, unpackEncrypted } from "@/utils/index.js"

const serverList = ref([])

const closeServer = async () => {
  const encrypted = await encryptWithSeed(recommendText, "19980209")
  const str = packEncrypted(encrypted)
  console.log("encrypted", str)
  console.log("111111", unpackEncrypted(str))
}

const openServer = () => {
  fetch("http://localhost:61111")
    .then((res) => {
      return res.json()
    })
    .then((res1) => {
      console.log("res", res1)
    })
}

defineExpose({ openServer })
</script>
<style scoped lang="scss"></style>
