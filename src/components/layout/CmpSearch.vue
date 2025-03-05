<script setup lang="ts">
import IconPesquisar from "../icons/IconPesquisar.vue";
import IconFilter from "../icons/IconFilter.vue";
</script>

<template>
   <div class="w-full">
      <!-- <div class="flex items-center">
         <div class="relative w-full flex justify-between">
            <div
               class="flex absolute inset-y-0 right-0 items-center pr-3 pointer-events-none"
            >
               <IconPesquisar class="w-5 h-5 text-slate-400" />
            </div>
            <input
               type="text"
               id="voice-search"
               class=""
               placeholder="O que vc procura ..."
            />
         </div>
         <div
            class="w-12 h-12 flex items-center justify-center ml-2 rounded-lg border text-slate-500 hover:bg-backend hover:text-white hover:cursor-pointer"
         >
            <IconFilter />
         </div>
      </div> -->
      <div class="w-full flex flex-row item-center space-x-2">
         <div class="relative flex-grow">
            <div
               class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
            >
               <IconPesquisar class="w-5 h-5 text-slate-400" />
            </div>
            <input
               type="search"
               id="search"
               class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none"
               placeholder="O que você procura..."
               required
            />
         </div>
         <div
            class="w-12 h-auto flex items-center justify-center ml-2 rounded-lg border text-slate-500 hover:bg-backend hover:text-white hover:cursor-pointer"
         >
            <IconFilter />
         </div>
      </div>
   </div>
</template>
