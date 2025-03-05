<template>
   <div class="w-full">
      <div class="w-full p-2 grid grid-cols-2 items-center md:shadow-lg">
         <div class="flex items-center space-x-2">
            <!-- <div class="w-full mb-2 flex items-center justify-start">
            <span>
               <a href="/"> <IconVoltar class="text-slate-800" /></a>
            </span>
         </div> -->
            <div
               class="w-8 h-8 flex items-center justify-center text-white bg-backend rounded-full"
            >
               <IconPassager />
            </div>
            <div>
               <label>{{ profile.name }}</label>
            </div>
         </div>
         <div class="flex-1 flex justify-end">
            <IconShopping />
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
import IconShopping from "../icons/IconShopping.vue";
import IconPassager from "../icons/IconPassager.vue";

import { computed } from "vue";

import { userStore } from "../../stores/userStore";
const storeUser = userStore();

const obterProfile = async () => {
   await storeUser.getProfile();
};

obterProfile();

const profile = computed(() => storeUser.state.data);
</script>
