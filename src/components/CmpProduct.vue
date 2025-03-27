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
    class="w-full grid grid-flow-col grid-cols-12 bg-white border rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-200"
    @click="navigateToProductDetail"
  >
    <div class="col-span-4 row-span-2 h-44 bg-fundoBase">
      <img
        class="w-full h-full object-cover rounded-l-lg"
        :src="props.product?.images[0]"
      />
    </div>
    <div class="col-span-8 row-span-2 flex flex-col p-2 space-y-2 rounded-r-lg">
      <div class="w-full flex flex-row justify-between">
        <div class="flex-grow-0">
          <label class="truncate ...">{{ props.product?.name }}</label>
        </div>
        <div class="flex-shrink">
          <div
            class="w-8 h-8 flex items-center justify-center border rounded-full cursor-pointer"
            @click.stop="() => {}"
          >
            <IconFavorito />
          </div>
        </div>
      </div>
      <div class="w-full h-20">
        <p class="text-sm text-slate-500">
          {{ props.product?.description }}
        </p>
      </div>
      <div class="w-full flex flex-row justify-between">
        <div>
          <p
            class="text-slate-800 text-sm font-semibold antialiased tracking-wide"
          >
            {{ formatPreco(props.product?.price) }}
          </p>
        </div>
        <div
          class="w-8 h-8 flex items-center justify-center border rounded-full cursor-pointer"
          @click.stop="() => {}"
        >
          <IconAdicionar />
        </div>
      </div>
    </div>
  </div>
</template>
