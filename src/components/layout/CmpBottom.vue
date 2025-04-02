<template>
  <div class="w-full p-2 grid grid-cols-5 md:shadow-lg">
    <div class="flex items-center justify-center p-1">
      <IconHome @click="navigateToHome" class="cursor-pointer" />
    </div>
    <div class="flex items-center justify-center p-1">
      <IconPesquisar />
    </div>
    <div class="flex items-center justify-center p-1">
      <IconShopping @click="navigateToStores" class="cursor-pointer" />
    </div>
    <div class="flex items-center justify-center p-1">
      <IconFavorito />
    </div>
    <div class="flex items-center justify-center p-1">
      <IconNotificacao />
    </div>
  </div>
</template>

<script setup lang="ts">
import IconHome from "../../components/icons/IconHome.vue";
import IconPesquisar from "../../components/icons/IconPesquisar.vue";
import IconShopping from "../../components/icons/IconShopping.vue";
import IconFavorito from "../../components/icons/IconFavorito.vue";
import IconNotificacao from "../../components/icons/IconNotificacao.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const navigateToStores = () => {
  router.push("/authenticated/stores");
};

const navigateToHome = () => {
  router.push("/authenticated/home");
};
</script>
