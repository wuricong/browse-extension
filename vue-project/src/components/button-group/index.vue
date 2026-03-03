<template>
  <div class="flex gap-4">
    <div>
      <button>按钮</button>
    </div>
    <div>
      <button class="button-hover">按钮</button>
      <div>hover</div>
    </div>
    <div>
      <button>按钮</button>
      <div class="button-active">active</div>
    </div>
    <div>
      <button class="button-disable">按钮</button>
      <div>disable</div>
    </div>
  </div>
</template>
<script setup></script>
<style scoped lang="scss">
button {
  background: #0052d9;
  width: 36px;
  border-radius: 4px;
  color: #fff;
}

.button-hover {
}

.button-active {
}

.button-disable {
}
</style>
