<script setup lang="ts">
import CmpProduto from "../../components/CmpProduto.vue";
import CmpBottom from "../../components/layout/CmpBottom.vue";
import CmpHeader from "../../components/layout/CmpHeader.vue";
import CmpSearch from "../../components/layout/CmpSearch.vue";
import CmpTopFilters from "../../components/layout/CmpTopFilters.vue";
</script>

<template>
   <div class="w-full h-full corpo">
      <CmpHeader />
      <div class="corpo_busca my-3 space-y-3">
         <CmpSearch />
         <CmpTopFilters />
         <div class="w-full">
            <label class="text-lg capitalize">Recomendados</label>
         </div>
         <div class="flex-grow">
            <div class="w-full overflow-y-auto" v-for="item in 5" :key="item">
               <CmpProduto class="mb-2" />
            </div>
         </div>
      </div>
      <CmpBottom />
   </div>
</template>

<style scoped>
.corpo {
   display: grid;
   grid-template-rows: auto 1fr auto;
}
.corpo_busca {
   display: grid;
   grid-template-rows: auto auto auto 1fr;
}
</style>
