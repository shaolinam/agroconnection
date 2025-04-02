<template>
  <MobileLayout title="Detalhes do Produto" :showBackButton="true">
    <template #header-right>
      <div class="flex items-center gap-3">
        <button class="p-2">
          <IconFavorito class="w-6 h-6 text-gray-700" />
        </button>
        <button class="p-2">
          <IconCaixaMensagens class="w-6 h-6 text-gray-700" />
        </button>
      </div>
    </template>

    <div v-if="loading" class="flex items-center justify-center h-[80vh]">
      <div class="text-center text-gray-500">Carregando...</div>
    </div>

    <div v-else-if="error" class="flex items-center justify-center h-[80vh]">
      <div class="text-center text-red-500">Erro ao carregar o produto</div>
    </div>

    <div v-else-if="product" class="pb-20">
      <!-- Galeria de Imagens -->
      <div
        class="relative w-full h-72 bg-gray-100 rounded-lg overflow-hidden mb-4"
      >
        <img
          :src="product.images[0]"
          :alt="product.name"
          class="w-full h-full object-cover"
        />
      </div>

      <!-- Informações do Produto -->
      <div class="space-y-6">
        <!-- Nome e Preço -->
        <div>
          <h1 class="text-2xl font-bold text-gray-900">{{ product.name }}</h1>
          <p class="text-3xl font-bold text-backend mt-2">
            {{ formatPreco(product.price) }}
          </p>
        </div>

        <!-- Descrição -->
        <div class="bg-white rounded-lg p-4 shadow-sm">
          <h2 class="text-lg font-semibold mb-2">Descrição</h2>
          <p class="text-gray-600">{{ product.description }}</p>
        </div>

        <!-- Informações da Loja -->
        <div class="bg-white rounded-lg p-4 shadow-sm">
          <h2 class="text-lg font-semibold mb-2">Informações da Loja</h2>
          <div class="flex items-center space-x-3">
            <div
              class="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center"
            >
              <IconLoja class="w-6 h-6 text-gray-500" />
            </div>
            <div>
              <p class="font-medium">{{ product.storeId?.name }}</p>
              <p class="text-sm text-gray-500">
                {{ product.city }}, {{ product.state }}
              </p>
            </div>
          </div>
        </div>

        <!-- Categorias -->
        <div class="bg-white rounded-lg p-4 shadow-sm">
          <h2 class="text-lg font-semibold mb-2">Categorias</h2>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="category in product.categories"
              :key="category"
              class="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
            >
              {{ category }}
            </span>
          </div>
        </div>

        <!-- Botões de Ação -->
        <div class="bg-white rounded-lg p-4 shadow-sm">
          <div class="flex gap-3">
            <button
              class="flex-1 bg-white border-2 border-backend text-backend font-medium rounded-lg py-3 flex items-center justify-center gap-2"
            >
              <IconWhatsApp class="w-5 h-5" />
              WhatsApp
            </button>
            <button
              class="flex-1 bg-backend text-white font-medium rounded-lg py-3 flex items-center justify-center gap-2"
            >
              <IconCaixaMensagens class="w-5 h-5" />
              Mensagem
            </button>
          </div>
        </div>
      </div>
    </div>
  </MobileLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, inject } from "vue";
import { useRoute } from "vue-router";
import MobileLayout from "../../../components/layout/MobileLayout.vue";
import IconFavorito from "../../../components/icons/IconFavorito.vue";
import IconCaixaMensagens from "../../../components/icons/IconCaixaMensagens.vue";
import IconWhatsApp from "../../../components/icons/IconWhatsApp.vue";
import IconLoja from "../../../components/icons/IconLoja.vue";
import { ProductGateway } from "../../../gateway/ProductGateway";
import { IProduct } from "../../../domain/entities/Product";

const route = useRoute();
const productGateway = inject("productGateway") as ProductGateway;

const productId = route.params.id as string;
const product = ref<IProduct | null>(null);
const loading = ref(true);
const error = ref(false);

const formatPreco = (preco: number | undefined) => {
  if (preco == 0) return "R$ 0,00";
  if (preco == undefined) return "R$ -,--";
  return preco?.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
};

onMounted(async () => {
  try {
    loading.value = true;
    const response = await productGateway.getById(productId);
    product.value = response;
  } catch (err) {
    console.error("Erro ao carregar produto:", err);
    error.value = true;
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.corpo {
  display: grid;
  grid-template-rows: auto 1fr auto;
}
.corpo_detail {
  display: grid;
  grid-template-rows: auto 1fr;
}
.header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: white;
}
</style>
