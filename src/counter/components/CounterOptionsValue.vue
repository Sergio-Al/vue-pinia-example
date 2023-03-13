<script setup lang="ts">
import { useCounterOptionsStore } from '../../store/counter-options'

const counterStore = useCounterOptionsStore()
</script>
<template>
  <h1>The value is: {{ counterStore.count }}</h1>
  <h4>Last change: {{ counterStore.lastChanged }}</h4>
</template>

<style scoped></style>
