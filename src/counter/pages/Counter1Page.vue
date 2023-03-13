<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { NButton, NSpace } from 'naive-ui'
import CounterOptionsValue from '../components/counterOptionsValue.vue'
import { useCounterOptionsStore } from '../../store/counter-options'

const counterStore = useCounterOptionsStore()
const { count, squareCount } = storeToRefs(counterStore)
const { increment, incrementBy } = counterStore
</script>

<template>
  <h1>Pinia Options</h1>
  <h4>Counter: {{ count }}</h4>
  <h4>Square: {{ squareCount }}</h4>

  <br />
  <n-space>
    <n-button tertiary type="primary" size="medium" @click="increment()">+1</n-button>
    <n-button tertiary type="primary" size="medium" @click="incrementBy(2)">+2</n-button>
    <n-button tertiary type="primary" size="medium" @click="incrementBy(5)">+5</n-button>
    <n-button tertiary type="primary" size="medium" @click="counterStore.$reset()" round
      >Reset</n-button
    >
  </n-space>

  <CounterOptionsValue />
</template>

<style scoped></style>
