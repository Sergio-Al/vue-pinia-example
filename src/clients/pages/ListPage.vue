<script setup lang="ts">
import { NH1 } from 'naive-ui'
import ClientList from '../components/ClientList.vue'
import PaginationNumbers from '../components/PaginationNumbers.vue'
</script>
<template>
  <div>
    <n-h1>Clients List</n-h1>

    <!-- Client list -->
    <ClientList />

    <!-- Pagination Numbers -->
    <PaginationNumbers />

    <!-- LoadingModal -->
  </div>
</template>

<style scoped></style>
