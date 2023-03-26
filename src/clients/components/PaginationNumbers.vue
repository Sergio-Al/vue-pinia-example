<script setup lang="ts">
import { ref, toRef, watch } from 'vue'
import { NButton, NSpace } from 'naive-ui'

interface Props {
  totalPages: number
  currentPage: number
}

interface Emits {
  (e: 'changePage', value: number): void
}

const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const totalPages = toRef(props, 'totalPages')
const currentPage = toRef(props, 'currentPage')

const totalPageNumbers = ref<number[]>([])

watch(
  totalPages,
  () => {
    totalPageNumbers.value = [...new Array(totalPages.value)].map((v, i) => i + 1)
  },
  { immediate: true }
)
</script>
<template>
  <div>
    <n-space>
      <n-button
        :disabled="currentPage === 1"
        @click="emits('changePage', props.currentPage - 1)"
        type="primary"
        size="medium"
        >Prev</n-button
      >
      <n-button
        v-for="number of totalPageNumbers"
        :key="number"
        @click="emits('changePage', number)"
        :class="{ active: currentPage === number }"
        :type="currentPage === number ? 'tertiary' : 'primary'"
        size="medium"
        >{{ number }}
      </n-button>
      <n-button
        :disabled="currentPage === totalPages"
        @click="emits('changePage', currentPage + 1)"
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
