<template>
   <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
   <div
      class="w-full h-12 px-2 py-5 border flex flex-row items-center overflow-x-auto rounded-lg"
   >
      <div class="flex flex-row" v-for="item in tops" :key="item">
         <div class="mr-2">
            <!-- <a
               href="#"
               class="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
               v-if="index == 0"
               >{{ item }}</a
            > -->
            <a
               href="#"
               class="rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:bg-gray-700 hover:text-white border"
               >{{ item }}</a
            >
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
const tops = [
   "Grãos e Cereais",
   "Pecuária",
   "Orti-fruti",
   "Ração Animal",
   "Adulbos orgánicos",
   "Cursos",
   // "Apóio",
   // "Serviços",
];
</script>
