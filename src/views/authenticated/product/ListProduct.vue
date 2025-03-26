<template>
   <div class="w-full">
      <div v-if="error">Erro ! {{ error }}</div>
      <Suspense v-else>
         <template #default>
            <CmpListProduct />
         </template>
         <template #fallback> Loading... </template>
      </Suspense>
   </div>
</template>

<script setup lang="ts">
import CmpListProduct from "./CmpListProduct.vue";

import { ref, onErrorCaptured } from "vue";
const error = ref();

onErrorCaptured((e) => {
   error.value = e;
   return true;
});
</script>
