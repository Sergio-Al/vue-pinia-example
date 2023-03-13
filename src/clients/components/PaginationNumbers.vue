<script setup lang="ts">
import { NButton, NSpace } from 'naive-ui'
</script>
<template>
  <div>
    <n-space>
      <n-button disabled type="primary" size="medium">Prev</n-button>
      <n-button type="primary" size="medium">1</n-button>
      <n-button class="active" type="primary" size="medium">2</n-button>
      <n-button type="primary" size="medium">3</n-button>
      <n-button type="primary" size="medium">Next</n-button>
    </n-space>
  </div>
</template>

<style scoped>
.active {
  background-color: hsla(160, 100%, 37%, 0.2);
}
</style>
