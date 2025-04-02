<script setup lang="ts">
import IconFavorito from "./icons/IconFavorito.vue";
import IconAdicionar from "./icons/IconAdicionar.vue";
import { PropType } from "vue";
import { IProduct } from "../domain/entities/Product";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  product: {
    type: Object as PropType<IProduct>,
  },
});

const formatPreco = (preco: number | undefined) => {
  if (preco == 0) return "R$ 0,00";
  if (preco == undefined) return "R$ -,--";
  return preco?.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
};

const navigateToProductDetail = () => {
  if (props.product && props.product._id) {
    router.push(`/authenticated/product/${props.product._id}`);
  }
};
</script>

<template>
  <div
    class="group relative w-full bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
    @click="navigateToProductDetail"
  >
    <!-- Imagem do Produto -->
    <div class="relative h-48 overflow-hidden">
      <img
        class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        :src="props.product?.images[0]"
        :alt="props.product?.name"
      />
      <!-- Overlay com botões de ação -->
      <div class="absolute top-2 right-2 flex gap-2">
        <button
          class="w-10 h-10 flex items-center justify-center bg-white/90 rounded-full shadow-md hover:bg-white transition-colors duration-200"
          @click.stop="() => {}"
        >
          <IconFavorito class="w-5 h-5 text-gray-700" />
        </button>
        <button
          class="w-10 h-10 flex items-center justify-center bg-white/90 rounded-full shadow-md hover:bg-white transition-colors duration-200"
          @click.stop="() => {}"
        >
          <IconAdicionar class="w-5 h-5 text-gray-700" />
        </button>
      </div>
    </div>

    <!-- Informações do Produto -->
    <div class="p-4">
      <h3 class="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
        {{ props.product?.name }}
      </h3>
      <p class="text-sm text-gray-600 mb-3 line-clamp-2">
        {{ props.product?.description }}
      </p>
      <div class="flex items-center justify-between">
        <span class="text-xl font-bold text-primary">
          {{ formatPreco(props.product?.price) }}
        </span>
        <span class="text-sm text-gray-500">
          {{ props.product?.storeId?.name }}
        </span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
