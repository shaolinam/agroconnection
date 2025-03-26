<template>
   <div class="w-full grid grid-cols-2 justify-center items-center">
      <!-- <div class=""></div> -->
      <div class="">
         <nav aria-label="Page navigation example">
            <ul
               class="flex list-style-none items-center"
               v-for="item in props.page.pagination.totalPages"
               key="item"
            >
               <!-- <li v-if="item == 0"> -->
               <li v-if="item == 1">
                  <div
                     :class="
                        props.page.pagination.hasPrevPage ? 'ativo' : 'desativo'
                     "
                  >
                     <IconLeft class="w-6 h-6" />
                  </div>
               </li>

               <li>
                  <div
                     :class="
                        props.page.pagination.page == item ? 'atual' : 'ativo'
                     "
                  >
                     {{ item }}
                  </div>
               </li>

               <li v-if="item == props.page.pagination.totalPages">
                  <div
                     :class="
                        props.page.pagination.hasNextPage ? 'ativo' : 'desativo'
                     "
                  >
                     <IconRight class="w-6 h-6" />
                  </div>
               </li>
            </ul>
         </nav>
      </div>
      <div class="text-right">
         <p>
            Página
            <span class="text-sm antialiased p-2 border rounded-lg">
               {{ props.page.pagination.page }}
            </span>
            /
            <span class="text-sm antialiased p-2 border rounded-lg">
               {{ props.page.pagination.totalPages }}
            </span>
            Total
         </p>
      </div>
   </div>
</template>

<script setup lang="ts">
import IconLeft from "../icons/IconLeft.vue";
import IconRight from "../icons/IconRight.vue";

import { PropType } from "vue";
import { IPage } from "../../domain/entities/Page";

const props = defineProps({
   page: {
      type: Object as PropType<IPage>,
      default: null,
   },
});
</script>

<style scoped lang="postcss">
.desativo {
   @apply relative block py-1 px-2 rounded border-0 bg-transparent outline-none transition-all duration-300 text-gray-500 pointer-events-none;
}
.desativo:focus {
   @apply shadow-none;
}
.ativo {
   @apply relative block py-1 px-2 rounded border-0 bg-transparent outline-none transition-all duration-300 text-gray-800;
}
.ativo:hover {
   @apply text-gray-800 bg-gray-200 cursor-pointer;
}
.ativo:focus {
   @apply shadow-none;
}
.atual {
   @apply relative block py-1 px-2 rounded border-0 bg-backend outline-none transition-all duration-300 text-white shadow-md;
}
.atual:hover {
   @apply text-white bg-green-800 cursor-pointer;
}
.atual:focus {
   @apply shadow-md;
}
</style>
