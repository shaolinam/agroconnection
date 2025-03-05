<script setup lang="ts">
import IconFavorito from "./icons/IconFavorito.vue";
import IconAdicionar from "./icons/IconAdicionar.vue";
</script>

<template>
   <div class="w-full grid grid-cols-12 bg-white border rounded-lg">
      <div class="col-span-4 bg-fundoBase"></div>
      <div class="col-span-8 flex flex-col p-2 space-y-2">
         <div class="w-full flex flex-row justify-between">
            <div class="flex-grow-0">
               <label class="truncate ...">Produto de teste</label>
            </div>
            <div class="flex-shrink">
               <div
                  class="w-8 h-8 flex items-center justify-center border rounded-full cursor-pointer"
               >
                  <IconFavorito />
               </div>
            </div>
         </div>
         <div class="w-full h-16 truncate">
            <p class="text-sm text-slate-500">
               Lorem ipsum dolor sit amet consectetur adipisicing elit.
               Explicabo fugiat exercitationem nam perferendis voluptatibus?
               Dolorum porro aliquid perferendis accusantium voluptatem magnam
               sunt illo, velit odio nam. Esse ad reiciendis obcaecati.
            </p>
         </div>
         <div class="w-full flex flex-row justify-between">
            <div>
               <p
                  class="text-slate-800 text-sm font-semibold antialiased tracking-wide"
               >
                  R$ 2,99
               </p>
            </div>
            <div
               class="w-8 h-8 flex items-center justify-center border rounded-full cursor-pointer"
            >
               <IconAdicionar />
            </div>
         </div>
      </div>
   </div>
</template>
