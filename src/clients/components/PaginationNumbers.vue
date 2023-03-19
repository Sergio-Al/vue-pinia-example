<script setup lang="ts">
import { NButton, NSpace } from 'naive-ui'
import useClients from '../composables/useClients'

const { getPage, totalPageNumbers, totalPages, currentPage } = useClients()
</script>
<template>
  <div>
    <n-space>
      <n-button
        :disabled="currentPage === 1"
        @click="getPage(currentPage - 1)"
        type="primary"
        size="medium"
        >Prev</n-button
      >
      <n-button
        v-for="number of totalPageNumbers"
        :key="number"
        @click="getPage(number)"
        :class="{ active: currentPage === number }"
        :type="currentPage === number ? 'tertiary' : 'primary'"
        size="medium"
        >{{ number }}</n-button
      >
      <n-button
        :disabled="currentPage === totalPages"
        @click="getPage(currentPage + 1)"
        type="primary"
        size="medium"
        >Next</n-button
      >
    </n-space>
  </div>
</template>

<style scoped>
.active {
  background-color: hsla(160, 100%, 37%, 0.2);
}
</style>
