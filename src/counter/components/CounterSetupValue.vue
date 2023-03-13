<script setup lang="ts">
import { useCounterSetupStore } from '../../store/counter-setup'

const counterStore = useCounterSetupStore()
</script>
<template>
  <h1>The value is: {{ counterStore.count }}</h1>
  <h4>Last change: {{ counterStore.lastChanged }}</h4>
</template>

<style scoped></style>
