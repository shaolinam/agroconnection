<template>
   <div class="max-w-2xl mx-auto">
      <aside class="w-64" aria-label="Sidebar">
         <div class="px-3 py-4 overflow-y-auto rounded bg-gray-50">
            <ul class="space-y-2">
               <li>
                  <RouterLink to="/" class="item_home">
                     <IconHome class="icon_home" />
                     <span class="ml-3">Home</span>
                  </RouterLink>
               </li>
               <li>
                  <RouterLink to="/" class="item">
                     <IconPesquisar class="icon" />
                     <span class="ml-3">Encontrar</span>
                  </RouterLink>
               </li>
               <li>
                  <RouterLink to="/" class="item">
                     <IconFavorito class="icon" />
                     <span class="ml-3">Favoritos</span>
                  </RouterLink>
               </li>
               <li>
                  <RouterLink to="/" target="_blank" class="item">
                     <IconShopping class="icon" />
                     <span class="flex-1 ml-3 whitespace-nowrap"
                        >Minhas compras</span
                     >
                     <span
                        class="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-green-600 bg-green-200 rounded-full"
                        >3</span
                     >
                  </RouterLink>
               </li>
               <li>
                  <RouterLink to="/" target="_blank" class="item">
                     <IconNotificacao class="icon" />
                     <span class="flex-1 ml-3 whitespace-nowrap"
                        >Notificações</span
                     >
                     <span
                        class="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-green-600 bg-green-200 rounded-full"
                        >1</span
                     >
                  </RouterLink>
               </li>
               <hr class="my-2 border-blue-gray-50" />
               <li>
                  <RouterLink to="/" class="item">
                     <IconUser class="icon" />
                     <span class="flex-1 ml-3 whitespace-nowrap">Perfil</span>
                  </RouterLink>
               </li>
               <li>
                  <RouterLink to="/" class="item">
                     <IconDashboard class="icon" />
                     <span class="ml-3">Dashboard</span>
                  </RouterLink>
               </li>
               <li>
                  <RouterLink to="/" class="item">
                     <IconLoja class="icon" />
                     <span class="flex-1 ml-3 whitespace-nowrap"
                        >Minha(s) Loja(s)</span
                     >
                  </RouterLink>
               </li>
               <li>
                  <RouterLink to="/" class="item">
                     <IconProduto class="icon" />
                     <span class="flex-1 ml-3 whitespace-nowrap"
                        >Meu(s) Produtos(s)</span
                     >
                  </RouterLink>
               </li>
               <hr class="my-2 border-blue-gray-50" />
               <li>
                  <div @click="onLogout" class="item">
                     <IconLogout class="icon" />
                     <span class="flex-1 ml-3 whitespace-nowrap">Sair</span>
                  </div>
               </li>
            </ul>
         </div>
      </aside>
   </div>
</template>

<script setup lang="ts">
import IconLogout from "../icons/IconLogout.vue";
import IconShopping from "../icons/IconShopping.vue";
import IconUser from "../icons/IconUser.vue";
import IconLoja from "../icons/IconLoja.vue";
import IconDashboard from "../icons/IconDashboard.vue";
import IconProduto from "../icons/IconProduto.vue";

import { userStore } from "../../stores/userStore";
const storeUser = userStore();

import { useRouter } from "vue-router";
import IconHome from "../icons/IconHome.vue";
import IconNotificacao from "../icons/IconNotificacao.vue";
import IconFavorito from "../icons/IconFavorito.vue";
import IconPesquisar from "../icons/IconPesquisar.vue";
const router = useRouter();

const onLogout = async () => {
   await storeUser.logout;
   router.push({ name: "splash" });
};
</script>

<style lang="postcss" scoped>
.icon {
   @apply flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75;
}
icon:group-hover {
   @apply text-slate-800 font-semibold;
}
.icon_home {
   @apply flex-shrink-0 w-6 h-6 text-slate-800 transition duration-75;
}
.item_home {
   @apply flex items-center p-2 text-base font-bold text-gray-900 rounded-lg bg-fundoBase;
}
.item_home:hover {
   @apply bg-backend cursor-pointer;
}
.item {
   @apply flex items-center p-2 text-base font-normal text-gray-900 rounded-lg;
}
.item:hover {
   @apply bg-fundoBase font-semibold text-slate-800 cursor-pointer;
}
</style>
