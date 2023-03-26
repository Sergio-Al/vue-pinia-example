import { ref, watch, computed } from 'vue'
import { useQuery } from '@tanstack/vue-query'

import clientsApi from '@/api/clients-api'
import type { Client } from './../interfaces/client'
import { useMutation, useQueryClient } from '@tanstack/vue-query'

const getClient = async (id: number) => {
  const { data } = await clientsApi.get(`/clients/${id}`)
  return data
}

const useClient = (id: number) => {
  const queryClient = useQueryClient()

  const client = ref<Client>()

  const { isLoading, data, isError } = useQuery(['client', id], () => getClient(id), {
    retry: false
  })

  const updateClient = async (client: Client): Promise<Client> => {
    const { data } = await clientsApi.patch(`/clients/${client.id}`, client)
    const queries = queryClient.getQueryCache().findAll(['clients?page='], { exact: false }) // Clear cache
    queries.forEach((query) => query.fetch())

    return data
  }

  const clientMutation = useMutation(updateClient)

  watch(
    data,
    () => {
      if (data.value) client.value = { ...data.value }
    },
    { immediate: true }
  )

  return {
    client,
    isError,
    isLoading,
    clientMutation,

    // Methods
    updateClient: clientMutation.mutate,
    isUpdating: computed(() => clientMutation.isLoading.value),
    isErrorUpdating: computed(() => clientMutation.isError.value),
    isUpdatingSuccessful: computed(() => clientMutation.isSuccess.value)
  }
}

export default useClient
