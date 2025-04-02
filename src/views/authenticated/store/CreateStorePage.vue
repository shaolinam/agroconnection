<template>
  <MobileLayout title="Nova Loja" :showBackButton="true">
    <div class="container mx-auto px-4 py-6">
      <form @submit.prevent="createStore" class="space-y-6">
        <!-- Upload de Imagem -->
        <div class="relative">
          <div
            class="w-full h-48 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden"
            @click="triggerFileInput"
          >
            <img
              v-if="imagePreview"
              :src="imagePreview"
              class="w-full h-full object-cover"
              alt="Preview"
            />
            <div v-else class="text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-12 w-12 mx-auto text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p class="mt-2 text-sm text-gray-500">
                Toque para adicionar uma imagem
              </p>
            </div>
          </div>
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            @change="handleImageUpload"
            class="hidden"
          />
        </div>

        <!-- Informações Básicas -->
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Nome da Loja
            </label>
            <input
              v-model="newStore.name"
              type="text"
              class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-backend focus:border-transparent"
              placeholder="Digite o nome da sua loja"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Descrição
            </label>
            <textarea
              v-model="newStore.description"
              class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-backend focus:border-transparent"
              rows="3"
              placeholder="Descreva sua loja"
              required
            ></textarea>
          </div>
        </div>

        <!-- Localização -->
        <div class="space-y-4">
          <h3 class="text-lg font-medium text-gray-900">Localização</h3>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Estado
              </label>
              <input
                v-model="newStore.state"
                type="text"
                class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-backend focus:border-transparent"
                placeholder="UF"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Cidade
              </label>
              <input
                v-model="newStore.city"
                type="text"
                class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-backend focus:border-transparent"
                placeholder="Cidade"
                required
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">
              Endereço
            </label>
            <input
              v-model="newStore.address"
              type="text"
              class="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-backend focus:border-transparent"
              placeholder="Endereço completo"
              required
            />
          </div>
        </div>

        <!-- Botão de Envio -->
        <div class="pt-4">
          <button
            type="submit"
            :disabled="loading"
            class="w-full bg-backend text-white font-medium rounded-lg py-3 hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <div
              v-if="loading"
              class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"
            ></div>
            {{ loading ? "Criando..." : "Criar Loja" }}
          </button>
        </div>
      </form>
    </div>
  </MobileLayout>
</template>

<script setup lang="ts">
import { ref, inject } from "vue";
import { useRouter } from "vue-router";
import { StoreGateway } from "../../../gateway/StoreGateway";
import { IStore } from "../../../domain/entities/Store";
import MobileLayout from "../../../components/layout/MobileLayout.vue";

const router = useRouter();
const storeGateway = inject("storeGateway") as StoreGateway;
const fileInput = ref<HTMLInputElement | null>(null);

const imagePreview = ref<string | null>(null);
const selectedFile = ref<File | null>(null);
const loading = ref(false);
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

const triggerFileInput = () => {
  fileInput.value?.click();
};

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

    console.log("Iniciando upload da imagem...");
    const response = await storeGateway.uploadImage(formData);
    console.log("Resposta do upload:", response);

    if (!response.data?.link) {
      throw new Error("Link da imagem não recebido do servidor");
    }

    return response.data.link;
  } catch (error) {
    console.error("Erro ao fazer upload da imagem:", error);
    throw new Error(
      "Falha ao fazer upload da imagem. Por favor, tente novamente."
    );
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
    console.log("Iniciando upload da imagem...");
    const imageUrl = await uploadImage(selectedFile.value);
    console.log("Imagem enviada com sucesso:", imageUrl);

    // Depois cria a store com o link da imagem
    const storeData = {
      ...newStore.value,
      imageUrl: imageUrl,
    };

    console.log("Dados da loja:", storeData);
    console.log("Criando loja...");
    const response = await storeGateway.create(storeData);
    console.log("Loja criada com sucesso:", response);

    // Redireciona para a lista de lojas após sucesso
    router.push("/authenticated/stores");
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
</script>
