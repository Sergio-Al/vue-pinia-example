import { ref, watch } from 'vue'
import { useQuery } from '@tanstack/vue-query'

import clientsApi from '@/api/clients-api'
import type { Client } from './../interfaces/client'

const getClient = async (id: number) => {
  const { data } = await clientsApi.get(`/clients/${id}`)
  return data
}

const useClient = (id: number) => {
  const client = ref<Client>()

  const { isLoading, data, isError } = useQuery(['client', id], () => getClient(id), {
    retry: false
  })

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
  }
}

export default useClient
