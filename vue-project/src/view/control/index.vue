<template>
  <div style="color: #ffffff">
    服务监控1
    <div v-for="item in serverList" :key="item.id">{{ item.title }}</div>
    <a-button type="primary" @click="closeServer">关闭服务</a-button>
  </div>
</template>
<script setup>
import { ref } from "vue"

const serverList = ref([])

const closeServer = () => {
  fetch("http://localhost:61111/close/server")
    .then((res) => res.json())
    .then((res) => {
      console.log("res", res)
    })
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
