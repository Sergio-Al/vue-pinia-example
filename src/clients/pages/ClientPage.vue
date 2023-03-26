<script setup lang="ts">
import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { NH1, NH3, NButton, NInput } from 'naive-ui'
import LoadingModal from '@/shared/components/LoadingModal.vue'

import useClient from '@/clients/composables/useClient'

const route = useRoute()
const router = useRouter()

const {
  client,
  isLoading,
  isError,
  clientMutation,
  updateClient,
  isUpdating,
  isUpdatingSuccessful
} = useClient(+route.params.id)

watch(clientMutation.isSuccess, () => {
  setTimeout(() => {
    clientMutation.reset()
  }, 2000)
})

watch(isError, () => {
  if (isError.value) {
    router.replace('/clients')
  }
})
</script>
<template>
  <n-h3 v-if="isUpdating">Saving...</n-h3>
  <n-h3 v-if="isUpdatingSuccessful">Saved</n-h3>

  <LoadingModal v-if="isLoading" />

  <div v-if="client">
    <n-h1>{{ client.name }}</n-h1>
    <form>
      <n-input v-model:value="client.name" placeholder="Name" size="medium" />
      <n-input v-model:value="client.address" placeholder="Address" size="medium" />
      <n-button
        type="primary"
        size="medium"
        :disabled="clientMutation.isLoading.value"
        @click="updateClient(client!)"
      >
        Save
      </n-button>
    </form>
  </div>

  <code> {{ client }} </code>
</template>

<style scoped></style>
