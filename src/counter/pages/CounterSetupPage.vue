<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { NButton, NSpace, NCard } from 'naive-ui'
import CounterSetupValue from '../components/CounterSetupValue.vue'
import { useCounterSetupStore } from '../../store/counter-setup'

const counterStore = useCounterSetupStore()
const { count, squareCount } = storeToRefs(counterStore)
const { increment, incrementBy } = counterStore
</script>

<template>
  <n-card title="Pinia Setup" size="medium">
    <h4>Counter: {{ count }}</h4>
    <h4>Square: {{ squareCount }}</h4>
  </n-card>

  <br />
  <n-space>
    <n-button tertiary type="primary" size="medium" @click="increment()">+1</n-button>
    <n-button tertiary type="primary" size="medium" @click="incrementBy(2)">+2</n-button>
    <n-button tertiary type="primary" size="medium" @click="incrementBy(5)">+5</n-button>
    <n-button tertiary type="primary" size="medium" @click="counterStore.$reset()" round
      >Reset</n-button
    >
  </n-space>

  <CounterSetupValue />
</template>

<style scoped></style>
