import { watch, computed } from 'vue'
import clientsApi from '@/api/clients-api'
import { useClientsStore } from '@/store/clients'
import { useQuery } from '@tanstack/vue-query'
import { storeToRefs } from 'pinia'
import type { Client } from '../interfaces/client'

const getClients = async (page: number): Promise<Client[]> => {
  // await new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve(true)
  //   }, 2500)
  // })

  const { data } = await clientsApi.get<Client[]>(`/clients?_page=${page}`)
  return data
}

const useClients = () => {
  const store = useClientsStore()
  const { currentPage, clients, totalPages } = storeToRefs(store)

  const { isLoading, data } = useQuery(
    ['clients?page=', currentPage], // useQuery recognizes reactive variables like "currentPage"
    () => getClients(currentPage.value),
    {
      // staleTime: 1000 * 60;
      onSuccess(newClients) {
        console.log('New loaded clients')
        store.setClients(newClients)
      }
    }
  )

  watch(
    data,
    (clients) => {
      if (clients) store.setClients(clients)
    },
    { immediate: true }
  )

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
    totalPageNumbers: computed(() => [...new Array(totalPages.value)].map((v, i) => i + 1))
  }
}

export default useClients
