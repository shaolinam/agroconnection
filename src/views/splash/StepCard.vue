<script setup lang="ts">
import { ref } from "vue";
import StepBall from "../../components/layout/StepBall.vue";

const texto = [
   {
      titulo: "Conecte-se diretamente",
      subtitulo: "Fale direto com o produtor.",
   },
   {
      titulo: "Negocie com transparência",
      subtitulo: "Evite contato com atravessadores.",
   },
   {
      titulo: "Simplifique suas operações",
      subtitulo: "Gerencie suas compras. Tudo no mesmo lugar.",
   },
];

// const props = defineProps({
//    position: {
//       type: Number,
//       default: 0,
//    },
// });

const step = ref(0);

const addStep = () => {
   if (step.value == 2) return;
   step.value++;
};
// const subStep = () => {
//    if (step.value == 1) return;
//    step.value--;
// };
</script>

<template>
   <div class="h-full grid grid-rows-2">
      <div class="w-full bg-fundoBase rounded" @click="addStep()"></div>
      <div class="w-full flex flex-col">
         <div class="w-full flex items-center justify-center my-3">
            <StepBall :position="step" />
         </div>
         <div
            class="w-full h-full flex flex-col items-center text-center justify-center gap-y-5 bg-white shadow-md"
         >
            <div class="w-full">
               <h3 class="font-bold text-3xl antialiased tracking-wide">
                  {{ texto[step].titulo }}
               </h3>
            </div>
            <div class="w-full">
               <h4 class="text-xl text-slate-400">
                  {{ texto[step].subtitulo }}
               </h4>
            </div>
         </div>
      </div>
   </div>
</template>
