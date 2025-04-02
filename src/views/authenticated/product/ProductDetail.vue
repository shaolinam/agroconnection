<template>
  <div class="flex flex-col">
    <div class="container mx-auto p-4">
      <!-- Header com botão voltar -->
      <div class="flex items-center mb-6">
        <button @click="navigateToHome" class="mr-4">
          <IconArrowLeft class="w-6 h-6" />
        </button>
        <h1 class="text-2xl font-bold">Detalhes do Produto</h1>
      </div>

      <!-- Conteúdo do Produto -->
      <div v-if="product" class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Imagens do Produto -->
        <div class="space-y-4">
          <img
            :src="product.images[0]"
            :alt="product.name"
            class="w-full h-96 object-cover rounded-lg"
          />
          <div class="grid grid-cols-4 gap-2">
            <img
              v-for="(image, index) in product.images.slice(1)"
              :key="index"
              :src="image"
              :alt="`${product.name} - Imagem ${index + 2}`"
              class="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-75"
            />
          </div>
        </div>

        <!-- Informações do Produto -->
        <div class="space-y-4">
          <h2 class="text-3xl font-bold">{{ product.name }}</h2>
          <p class="text-gray-600">{{ product.description }}</p>
          <p class="text-2xl font-bold text-green-600">
            R$ {{ product.price }}
          </p>

          <!-- Informações da Loja -->
          <div class="border-t pt-4">
            <h3 class="text-xl font-semibold mb-2">Loja</h3>
            <p class="text-gray-600">{{ product.storeId.name }}</p>
          </div>

          <!-- Localização -->
          <div class="border-t pt-4">
            <h3 class="text-xl font-semibold mb-2">Localização</h3>
            <p class="text-gray-600">{{ product.city }}, {{ product.state }}</p>
          </div>

          <!-- Categorias -->
          <div class="border-t pt-4">
            <h3 class="text-xl font-semibold mb-2">Categorias</h3>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="category in product.categories"
                :key="category"
                class="bg-gray-100 px-3 py-1 rounded-full text-sm"
              >
                {{ category }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-else class="text-center py-8">
        <p class="text-gray-600">Carregando...</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import CmpHeader from "../../../components/layout/CmpHeader.vue";
import CmpBottom from "../../../components/layout/CmpBottom.vue";
import IconVoltar from "../../../components/icons/IconVoltar.vue";
import IconFavorito from "../../../components/icons/IconFavorito.vue";
import { ProductGateway } from "../../../gateway/ProductGateway";
import { IProduct } from "../../../domain/entities/Product";
import IconCaixaMensagens from "../../../components/icons/IconCaixaMensagens.vue";
import IconWhatsApp from "../../../components/icons/IconWhatsApp.vue";
import IconArrowLeft from "../../../components/icons/IconArrowLeft.vue";

const route = useRoute();
const router = useRouter();
const productGateway = inject("productGateway") as ProductGateway;

const productId = route.params.id as string;
const product = ref<IProduct | null>(null);
const loading = ref(true);
const error = ref(false);

const goBack = () => {
  router.back();
};

const formatPreco = (preco: number | undefined) => {
  if (preco == 0) return "R$ 0,00";
  if (preco == undefined) return "R$ -,--";
  return preco?.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
};

const navigateToHome = () => {
  router.push({ name: "home" });
};

onMounted(async () => {
  try {
    loading.value = true;
    // Assumindo que o ProductGateway tem um método para obter produto por ID
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
