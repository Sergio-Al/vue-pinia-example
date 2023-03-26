<script setup lang="ts">
import { NH1, NH3, NButton, NInput } from 'naive-ui'
import LoadingModal from '@/shared/components/LoadingModal.vue'

import useClient from '@/clients/composables/useClient'
import { useRoute } from 'vue-router'
import { useMutation } from '@tanstack/vue-query'
import type { Client } from '../interfaces/client'
import clientsApi from '@/api/clients-api'

const route = useRoute()

const { client, isLoading } = useClient(+route.params.id)

const updateClient = async (client: Client): Promise<Client> => {
  const { data } = await clientsApi.patch(`/clients/${client.id}`, client)
  return data
}

const clientMutation = useMutation(updateClient)
</script>
<template>
  <n-h3>Saving...</n-h3>
  <n-h3>Saved</n-h3>

  <LoadingModal v-if="isLoading" />

  <div v-if="client">
    <n-h1>{{ client.name }}</n-h1>
    <form>
      <n-input v-model:value="client.name" placeholder="Name" size="medium" />
      <n-input v-model:value="client.address" placeholder="Address" size="medium" />
      <n-button 
        type="primary" 
        size="medium" 
        @click="clientMutation.mutate(client!)"
      >
        Save
      </n-button>
    </form>
  </div>

  <code> {{ client }} </code>
</template>

<style scoped></style>
