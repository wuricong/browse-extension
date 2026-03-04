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
      <button class="button-active">按钮</button>
      <div>active</div>
    </div>
    <div>
      <button class="button-disable" :disabled="true">按钮</button>
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
  transition: all 0.5s;
}

.button-hover:hover {
  filter: brightness(1.2);
}

.button-active:active {
  filter: brightness(0.8);
}

.button-disable {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
