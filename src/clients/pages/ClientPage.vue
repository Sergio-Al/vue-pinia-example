<script setup lang="ts">
import { NH1, NH3, NButton, NInput } from 'naive-ui'
import LoadingModal from '@/shared/components/LoadingModal.vue'

import useClient from '@/clients/composables/useClient'
import { useRoute, useRouter } from 'vue-router'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import type { Client } from '../interfaces/client'
import clientsApi from '@/api/clients-api'
import { watch } from 'vue'

const route = useRoute()
const router = useRouter()
const queryClient = useQueryClient()

const { client, isLoading, isError } = useClient(+route.params.id)

const updateClient = async (client: Client): Promise<Client> => {
  //  await new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve(true)
  //   }, 2000)
  // })

  const { data } = await clientsApi.patch(`/clients/${client.id}`, client)
  const queries = queryClient.getQueryCache().findAll(['clients?page='], { exact: false }) // Clear cache
  queries.forEach(query => query.fetch())

  return data
}

const clientMutation = useMutation(updateClient)

watch(clientMutation.isSuccess, () => {
  setTimeout(() => {
    clientMutation.reset()
  }, 2000)
})

watch(isError, () => {
  if(isError.value) {
    router.replace('/clients')
  }
})
</script>
<template>
  <n-h3 v-if="clientMutation.isLoading.value">Saving...</n-h3>
  <n-h3 v-if="clientMutation.isSuccess.value">Saved</n-h3>

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
        @click="clientMutation.mutate(client!)"
      >
        Save
      </n-button>
    </form>
  </div>

  <code> {{ client }} </code>
</template>

<style scoped></style>
