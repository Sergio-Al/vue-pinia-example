import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Client } from '../clients/interfaces/client'

export const useClientsStore = defineStore('clients', () => {
  const currentPage = ref<number>(1)
  const totalPages = ref<number>(5)

  const clients = ref<Client[]>([])

  return {
    // state
    currentPage,
    totalPages,
    clients,

    // getters

    // methods
    setClients(newClients: Client[]) {
      clients.value = newClients
    },
    setPage(page: number) {
      if (currentPage.value === page) return

      currentPage.value = page
    }
  }
})