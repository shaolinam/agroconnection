<template>
  <MobileLayout title="Lojas">
    <div class="container mx-auto">
      <!-- Lista de Lojas -->
      <div
        v-if="stores && stores.length > 0"
        class="grid grid-cols-1 gap-6 p-4"
      >
        <div
          v-for="store in stores"
          :key="store._id"
          class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden"
        >
          <div class="relative">
            <img
              :src="
                store.imageUrl ||
                'https://via.placeholder.com/400x200?text=Sem+Imagem'
              "
              :alt="store.name"
              class="w-full h-48 object-cover"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
            ></div>
            <h2
              class="absolute bottom-4 left-4 text-xl font-semibold text-white"
            >
              {{ store.name }}
            </h2>
          </div>
          <div class="p-4">
            <p class="text-gray-600 mb-3 line-clamp-2">
              {{ store.description }}
            </p>
            <div class="flex items-center text-gray-500 text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>{{ store.city }}, {{ store.state }}</span>
            </div>
            <p class="text-gray-500 text-sm mt-1">{{ store.address }}</p>
          </div>
        </div>
      </div>

      <!-- Mensagem quando não há lojas -->
      <div v-else-if="stores && stores.length === 0" class="text-center py-12">
        <div class="bg-white rounded-xl shadow-sm p-8 max-w-md mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-16 w-16 mx-auto text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
            />
          </svg>
          <p class="text-gray-600 mb-6">Nenhuma loja encontrada</p>
          <router-link
            to="/authenticated/stores/create"
            class="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 mx-auto inline-flex"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clip-rule="evenodd"
              />
            </svg>
            Criar Primeira Loja
          </router-link>
        </div>
      </div>

      <!-- Botão de Ação Flutuante -->
      <router-link
        v-if="stores && stores.length > 0"
        to="/authenticated/stores/create"
        class="fixed right-4 bottom-20 bg-backend text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-colors z-40"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </router-link>
    </div>
  </MobileLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, inject } from "vue";
import { StoreGateway } from "../../../gateway/StoreGateway";
import { IStore } from "../../../domain/entities/Store";
import MobileLayout from "../../../components/layout/MobileLayout.vue";

const storeGateway = inject("storeGateway") as StoreGateway;
const stores = ref<IStore[]>([]);

const fetchStores = async () => {
  try {
    const response = await storeGateway.list();
    stores.value = response;
  } catch (error) {
    console.error("Erro ao buscar lojas:", error);
  }
};

onMounted(() => {
  fetchStores();
});
</script>
