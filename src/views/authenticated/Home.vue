<script setup lang="ts">
// import CmpProduto from "../../components/CmpProduto.vue";
// import CmpBottom from "../../components/layout/CmpBottom.vue";
// import CmpHeader from "../../components/layout/CmpHeader.vue";
import CmpSearch from "../../components/layout/CmpSearch.vue";
import CmpTopFilters from "../../components/layout/CmpTopFilters.vue";
import ListProduct from "./product/ListProduct.vue";
import MobileLayout from "../../components/layout/MobileLayout.vue";
</script>

<template>
  <MobileLayout title="AgroConnection">
    <div class="space-y-4 mt-2">
      <CmpSearch />
      <CmpTopFilters />
      <div class="w-full">
        <label class="text-lg capitalize">Recomendados</label>
      </div>
      <div class="flex-grow">
        <ListProduct />
      </div>
    </div>
  </MobileLayout>
</template>

<style scoped>
.corpo {
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.corpo_busca {
  display: grid;
  grid-template-rows: auto auto auto 1fr;
}

.header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: white;
}
</style>
