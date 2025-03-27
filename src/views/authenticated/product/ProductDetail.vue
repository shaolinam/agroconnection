<template>
  <div class="w-full h-full corpo">
    <CmpHeader class="header" />
    <div class="corpo_detail my-3 space-y-3">
      <div class="flex items-center">
        <div @click="goBack" class="cursor-pointer p-2">
          <IconVoltar />
        </div>
        <h1 class="text-xl font-semibold">Detalhes do Produto</h1>
      </div>

      <div v-if="loading" class="w-full flex justify-center items-center py-10">
        <p>Carregando...</p>
      </div>

      <div v-else-if="error" class="w-full p-2 bg-yellow-200">
        <p
          class="w-full text-sm text-slate-800 antialiased font-semibold tracking-wide rounded-lg"
        >
          Erro ao carregar produto
        </p>
      </div>

      <div v-else-if="product" class="w-full flex flex-col space-y-4">
        <!-- Imagem do Produto -->
        <div class="w-full h-64 bg-fundoBase rounded-lg overflow-hidden">
          <img
            :src="product.images[0]"
            class="w-full h-full object-cover"
            alt="Imagem do produto"
          />
        </div>

        <!-- Informações do Produto -->
        <div
          class="w-full flex flex-col space-y-2 p-2 bg-white rounded-lg shadow"
        >
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-semibold">{{ product.name }}</h2>
            <div
              class="w-8 h-8 flex items-center justify-center border rounded-full cursor-pointer"
            >
              <IconFavorito />
            </div>
          </div>

          <p class="text-2xl font-bold text-slate-800">
            {{ formatPreco(product.price) }}
          </p>

          <div class="py-2">
            <h3 class="text-lg font-medium mb-1">Descrição</h3>
            <p class="text-sm text-slate-600">{{ product.description }}</p>
          </div>

          <div class="py-2" v-if="product.category">
            <h3 class="text-lg font-medium mb-1">Categoria</h3>
            <p class="text-sm text-slate-600">{{ product.category }}</p>
          </div>

          <div class="py-2" v-if="product.brand">
            <h3 class="text-lg font-medium mb-1">Marca</h3>
            <p class="text-sm text-slate-600">{{ product.brand }}</p>
          </div>

          <!-- Botão Adicionar ao Carrinho -->

          <a
            :href="`https://wa.me/5548988098989?text=Olá, tenho interesse no produto: ${product.name}`"
            target="_blank"
            rel="noopener noreferrer"
            class="w-full bg-green-600 text-white py-3 rounded-lg flex items-center justify-center space-x-2 mt-4"
          >
            <IconWhatsApp />
            <span>Entre em contato com o vendedor</span>
          </a>
        </div>
      </div>
    </div>
    <CmpBottom />
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
