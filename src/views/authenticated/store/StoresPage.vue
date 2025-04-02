<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-6">
      <!-- Header com botão voltar -->
      <div class="flex items-center mb-8">
        <button
          @click="navigateToHome"
          class="mr-4 hover:bg-gray-100 p-2 rounded-full transition-colors"
        >
          <IconArrowLeft class="w-6 h-6" />
        </button>
        <h1 class="text-2xl font-bold text-gray-800">Lojas</h1>
      </div>

      <!-- Lista de Lojas -->
      <div
        v-if="stores && stores.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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
          <button
            @click="showCreateModal = true"
            class="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 mx-auto"
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
          </button>
        </div>
      </div>

      <!-- Modal de Criação -->
      <div
        v-if="showCreateModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div class="bg-white p-6 rounded-xl w-full max-w-md shadow-xl">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold text-gray-800">Criar Nova Loja</h2>
            <button
              @click="showCreateModal = false"
              class="text-gray-500 hover:text-gray-700"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <form @submit.prevent="createStore" class="space-y-4">
            <div>
              <label class="block text-gray-700 mb-2 font-medium">Nome</label>
              <input
                v-model="newStore.name"
                type="text"
                class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label class="block text-gray-700 mb-2 font-medium"
                >Endereço</label
              >
              <input
                v-model="newStore.address"
                type="text"
                class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label class="block text-gray-700 mb-2 font-medium"
                >Descrição</label
              >
              <textarea
                v-model="newStore.description"
                class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                rows="3"
                required
              ></textarea>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-gray-700 mb-2 font-medium"
                  >Estado</label
                >
                <input
                  v-model="newStore.state"
                  type="text"
                  class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label class="block text-gray-700 mb-2 font-medium"
                  >Cidade</label
                >
                <input
                  v-model="newStore.city"
                  type="text"
                  class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>
            </div>
            <div>
              <label class="block text-gray-700 mb-2 font-medium"
                >Imagem da Loja</label
              >
              <input
                type="file"
                accept="image/*"
                @change="handleImageUpload"
                class="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
              <img
                v-if="imagePreview"
                :src="imagePreview"
                class="mt-2 w-full h-48 object-cover rounded-lg"
                alt="Preview"
              />
            </div>
            <div class="flex justify-end gap-3 pt-4">
              <button
                type="button"
                @click="showCreateModal = false"
                class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                :disabled="loading"
                class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <div
                  v-if="loading"
                  class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"
                ></div>
                {{ loading ? "Criando..." : "Criar" }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Botão de criar loja fixo na parte inferior -->
    <div class="fixed bottom-20 left-0 right-0 px-4 z-40" hidden>
      <button
        @click="showCreateModal = true"
        class="w-full bg-green-600 text-white px-6 py-4 rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center gap-2 shadow-lg"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
            clip-rule="evenodd"
          />
        </svg>
        Criar Nova Loja
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, inject } from "vue";
import { useRouter } from "vue-router";
import { StoreGateway } from "../../../gateway/StoreGateway";
import { IStore } from "../../../domain/entities/Store";
import IconArrowLeft from "../../../components/icons/IconArrowLeft.vue";

const router = useRouter();
const storeGateway = inject("storeGateway") as StoreGateway;

const stores = ref<IStore[]>([]);
const showCreateModal = ref(false);
const imagePreview = ref<string | null>(null);
const selectedFile = ref<File | null>(null);
const newStore = ref<Omit<IStore, "_id">>({
  name: "",
  address: "",
  description: "",
  state: "",
  city: "",
  location: {
    lat: 0,
    lng: 0,
  },
  imageUrl: "",
});
const loading = ref(false);
const uploadProgress = ref(0);

const handleImageUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    selectedFile.value = input.files[0];
    imagePreview.value = URL.createObjectURL(input.files[0]);
  }
};

const uploadImage = async (file: File): Promise<string> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await storeGateway.uploadImage(formData);
    return response.data.link;
  } catch (error) {
    console.error("Erro ao fazer upload da imagem:", error);
    throw new Error(
      "Falha ao fazer upload da imagem. Por favor, tente novamente."
    );
  }
};

const fetchStores = async () => {
  try {
    const response = await storeGateway.list();
    console.log("Lojas recebidas:", response);
    stores.value = response;
  } catch (error) {
    console.error("Erro ao buscar lojas:", error);
  }
};

const createStore = async () => {
  if (!selectedFile.value) {
    alert("Por favor, selecione uma imagem para a loja");
    return;
  }

  try {
    loading.value = true;

    // Primeiro faz o upload da imagem
    const imageUrl = await uploadImage(selectedFile.value);

    // Depois cria a store com o link da imagem
    const storeData = {
      ...newStore.value,
      imageUrl: imageUrl,
    };

    await storeGateway.create(storeData);

    // Fecha o modal e atualiza a lista
    showCreateModal.value = false;
    await fetchStores();

    // Resetar formulário
    newStore.value = {
      name: "",
      address: "",
      description: "",
      state: "",
      city: "",
      location: {
        lat: 0,
        lng: 0,
      },
      imageUrl: "",
    };
    selectedFile.value = null;
    imagePreview.value = null;
  } catch (error) {
    console.error("Erro ao criar loja:", error);
    alert(
      error instanceof Error
        ? error.message
        : "Erro ao criar loja. Por favor, tente novamente."
    );
  } finally {
    loading.value = false;
  }
};

const navigateToHome = () => {
  router.push("/authenticated/home");
};

onMounted(() => {
  fetchStores();
});
</script>
