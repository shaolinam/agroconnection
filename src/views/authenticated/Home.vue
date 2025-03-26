<script setup lang="ts">
// import CmpProduto from "../../components/CmpProduto.vue";
import CmpBottom from "../../components/layout/CmpBottom.vue";
import CmpHeader from "../../components/layout/CmpHeader.vue";
import CmpSearch from "../../components/layout/CmpSearch.vue";
import CmpTopFilters from "../../components/layout/CmpTopFilters.vue";
import ListProduct from "./product/ListProduct.vue";
</script>

<template>
   <div class="w-full h-full corpo">
      <CmpHeader class="header" />
      <div class="corpo_busca my-3 space-y-3">
         <CmpSearch />
         <CmpTopFilters />
         <div class="w-full">
            <label class="text-lg capitalize">Recomendados</label>
         </div>
         <div class="flex-grow">
            <ListProduct />
         </div>
      </div>
      <CmpBottom />
   </div>
</template>

<style scoped>
/* grid-template-rows: auto 1fr auto; */
.corpo {
   display: grid;
   grid-template-rows: auto 1fr auto;
}
.corpo_busca {
   display: grid;
   grid-template-rows: auto auto auto 1fr;
}

.header {
   position: sticky;
   top: 0;
   z-index: 10;
   /* padding: 10px 16px; */
   background: white;
   /* color: #f1f1f1; */
}
</style>
