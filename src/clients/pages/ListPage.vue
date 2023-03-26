<script setup lang="ts">
import { watch } from 'vue'
import { NH1, useLoadingBar } from 'naive-ui'
import ClientList from '../components/ClientList.vue'
import PaginationNumbers from '../components/PaginationNumbers.vue'
import useClients from '../composables/useClients'
import LoadingModal from '@/shared/components/LoadingModal.vue'

const { isLoading, clients, currentPage, totalPages, getPage } = useClients()
const loadingBar = useLoadingBar()

watch(isLoading, (newValue: boolean) => {
  loadingBar.finish()
  if (newValue) loadingBar.start()
})
</script>
<template>
  <div>
    <n-h1>Clients List</n-h1>

    <!-- Client list -->
    <ClientList :clients="clients" />

    <!-- Pagination Numbers -->
    <PaginationNumbers
      :total-pages="totalPages"
      :current-page="currentPage"
      @change-page="getPage"
    />

    <!-- LoadingModal -->
    <LoadingModal v-if="isLoading">Loading...</LoadingModal>
  </div>
</template>

<style scoped></style>
