<template>
   <div class="w-full">
      <div class="w-full p-2 grid grid-cols-2 items-center md:shadow-lg">
         <div class="flex items-center space-x-2">
            <div class="relative">
               <div
                  class="w-8 h-8 flex items-center justify-center text-white bg-backend rounded-full cursor-pointer"
                  @click="touggleMenu()"
               >
                  <IconUser />
               </div>
               <CmpMenuSide v-if="showMenu" class="absolute z-10" />
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
import IconUser from "../icons/IconUser.vue";

import { ref, computed } from "vue";

import { userStore } from "../../stores/userStore";
import CmpMenuSide from "./CmpMenuSide.vue";
const storeUser = userStore();

const showMenu = ref(false);

const touggleMenu = () => (showMenu.value = !showMenu.value);

const obterProfile = async () => {
   await storeUser.getProfile();
};

obterProfile();

const profile = computed(() => storeUser.state.data);
</script>
