<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header com busca -->
    <div class="bg-white shadow-sm">
      <div class="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between">
          <div class="flex-1 max-w-2xl">
            <div class="relative">
              <input
                type="text"
                v-model="searchQuery"
                @input="handleSearch"
                placeholder="Buscar produtos..."
                class="w-full px-4 py-2 pl-10 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
              />
              <div
                class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
              >
                <svg
                  class="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Conteúdo principal -->
    <div class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <!-- Grid de produtos -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <div
          v-for="product in products"
          :key="product._id"
          @click="navigateToProduct(product._id)"
          class="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden group"
        >
          <!-- Imagem do produto -->
          <div class="relative aspect-square overflow-hidden">
            <img
              :src="product.images[0]"
              :alt="product.name"
              class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
            />
            <div
              class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
            ></div>
          </div>

          <!-- Informações do produto -->
          <div class="p-4">
            <h3 class="text-lg font-semibold text-gray-900 mb-1">
              {{ product.name }}
            </h3>
            <p class="text-sm text-gray-600 mb-3 line-clamp-2">
              {{ product.description }}
            </p>
            <div class="flex items-center justify-between">
              <span class="text-lg font-bold text-green-600"
                >R$ {{ product.price.toFixed(2) }}</span
              >
              <span class="text-sm text-gray-500">{{
                product.storeId.name
              }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Estado de carregamento -->
      <div v-if="loading" class="flex justify-center py-8">
        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"
        ></div>
      </div>

      <!-- Estado vazio -->
      <div v-if="!loading && products.length === 0" class="text-center py-12">
        <svg
          class="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
          />
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900">
          Nenhum produto encontrado
        </h3>
        <p class="mt-1 text-sm text-gray-500">
          Tente ajustar sua busca ou filtrar os resultados.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, inject } from "vue";
import { useRouter } from "vue-router";
import { ProductGateway } from "../../../gateway/ProductGateway";
import { IProduct } from "../../../domain/entities/Product";
import { IResponseProduct } from "../../../domain/entities/Product";

const router = useRouter();
const productGateway = inject("productGateway") as ProductGateway;

const products = ref<IProduct[]>([]);
const loading = ref(false);
const page = ref(1);
const hasMore = ref(true);
const searchQuery = ref("");
const searchTimeout = ref<number | null>(null);

// Função para carregar produtos
const loadProducts = async (reset = false) => {
  if (loading.value || (!hasMore.value && !reset)) return;

  try {
    loading.value = true;
    if (reset) {
      page.value = 1;
      products.value = [];
      hasMore.value = true;
    }

    const response: IResponseProduct = await productGateway.getAll(
      page.value,
      12,
      searchQuery.value
    );

    if (reset) {
      products.value = response.data;
    } else {
      products.value = [...products.value, ...response.data];
    }

    hasMore.value = response.pagination.hasNextPage;
    page.value++;
  } catch (error) {
    console.error("Erro ao carregar produtos:", error);
  } finally {
    loading.value = false;
  }
};

// Função para lidar com a busca
const handleSearch = () => {
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value);
  }
  searchTimeout.value = window.setTimeout(() => {
    loadProducts(true);
  }, 500);
};

// Função para verificar scroll
const handleScroll = () => {
  if (loading.value || !hasMore.value) return;

  const scrollPosition = window.innerHeight + window.scrollY;
  const documentHeight = document.documentElement.scrollHeight;
  const threshold = 200;

  if (scrollPosition >= documentHeight - threshold) {
    loadProducts();
  }
};

// Navegação para detalhes do produto
const navigateToProduct = (productId: string) => {
  router.push({ name: "productDetail", params: { id: productId } });
};

// Event listeners
onMounted(() => {
  loadProducts();
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value);
  }
});
</script>
