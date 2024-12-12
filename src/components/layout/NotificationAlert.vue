<!-- class="z-[70] top-0 left-0 min-h-screen min-w-full flex items-center shadow-lg bg-slate-100" -->
<template>
   <div
      style="background: rgba(0, 0, 0, 0.1)"
      class="overflow-x-hidden overflow-y-auto fixed h-screen top-4 left-0 right-0 md:inset-0 z-[70] flex justify-center items-center animated fadeIn faster"
   >
      <div
         class="mx-auto bg-white rounded-xl min-[90%] max-w-xl p-4 grid grid-rows-1 shadow-lg"
      >
         <div class="flex flex-row space-x-2">
            <div
               :class="
                  notificationParams.sucesso ? 'text-green-400' : 'text-red-400'
               "
               class="shrink"
            >
               <svg
                  v-if="notificationParams.sucesso"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
               >
                  <path
                     stroke-linecap="round"
                     stroke-linejoin="round"
                     d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
               </svg>
               <svg
                  v-else
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
               >
                  <path
                     stroke-linecap="round"
                     stroke-linejoin="round"
                     d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                  />
               </svg>
            </div>
            <div class="grow flex flex-col items-start text-base">
               <h3 class="w-full text-gray-600 font-semibold antialiased">
                  {{ cmpTitulo }}
               </h3>
               <p class="w-full text-gray-500 text-sm">{{ cmpSubTitulo }}</p>
            </div>
            <div class="w-8 flex justify-start">
               <a
                  @click="onClickedClose()"
                  class="p-1 w-7 h-7 text-gray-500 hover:text-gray-800 hover:bg-gray-300 rounded-full"
               >
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke-width="1.5"
                     stroke="currentColor"
                     class="w-5 h-5"
                  >
                     <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                     />
                  </svg>
               </a>
            </div>
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
import { geralStore } from "../../stores/geralStore";
import { computed, onMounted } from "vue";

const storeGeral = geralStore();

// const props = defineProps({
//   titulo: {
//     type: String,
//     default: "Sucesso !",
//   },
//   subTitulo: {
//     type: String,
//     default: "Operação realizada com Sucesso.",
//   },
//   sucesso: {
//     type: Boolean,
//     default: true,
//   },
//   espera: {
//     type: Number,
//     default: 0,
//   },
// });

const notificationParams = computed(() => storeGeral.getNotificationParams());

const cmpTitulo = computed(() =>
   notificationParams.value.sucesso
      ? notificationParams.value.titulo
         ? notificationParams.value.titulo
         : "Sucesso !"
      : notificationParams.value.titulo
        ? notificationParams.value.titulo
        : "Erro !",
);
const cmpSubTitulo = computed(() =>
   notificationParams.value.sucesso
      ? notificationParams.value.subTitulo
         ? notificationParams.value.subTitulo
         : "Operação realizada com Sucesso."
      : notificationParams.value.subTitulo
        ? notificationParams.value.subTitulo
        : "Ocorreu um problema! Tente novamente.",
);

const onClickedClose = () => storeGeral.setShowNotification(false);

const contagemRegressiva = () => {
   if (notificationParams.value.espera > 0)
      setTimeout(() => {
         onClickedClose();
      }, +notificationParams.value.espera);
};

onMounted(() => {
   contagemRegressiva();
});
</script>

<style scoped></style>
