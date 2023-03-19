import { watch, computed } from 'vue';
import clientsApi from '@/api/clients-api'
import { useClientsStore } from '@/store/clients'
import { useQuery } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import type { Client } from '../interfaces/client'

const getClients = async (): Promise<Client[]> => {
  const { data } = await clientsApi.get<Client[]>('/clients?_page=1')
  return data
}

const useClients = () => {
  const store = useClientsStore()
  const { currentPage, clients, totalPages } = storeToRefs(store)

  const { isLoading, data } = useQuery(
    ['clients?page=', 1], 
    () => getClients(), 
    {
      staleTime: 1000 * 60,
      onSuccess(newClients) {
        console.log('New loaded clients')
        store.setClients(newClients)
      }
    }
  )

  watch(data, clients => {
    if(clients)
      store.setClients(clients);
  })

  return {
    // Properties/State
    clients, 
    currentPage,
    isLoading,
    totalPages,

    // methods
    getPage(page: number) {
      store.setPage(page)
    },

    // Getters
    totalPageNumbers: computed(
      () => [...new Array(totalPages.value)].map((v, i) => i + 1)
    ),
  }
}

export default useClients
