<script setup lang="ts">
// import { ref } from "vue";
// import Step1 from "./Step1.vue";
import StepCard from "./StepCard.vue";

import { useRouter } from "vue-router";

const router = useRouter();

// const stepComponente = [Step1, Step2, Step3];

// const step = ref(0);

// const addStep = () => {
//    if (step.value == 3) return;
//    step.value++;
// };
// const subStep = () => {
//    if (step.value == 1) return;
//    step.value--;
// };

const iniciar = () => {
   router.push({ name: "login" });
};
</script>

<template>
   <div class="max-w-[375px] mx-auto min-h-screen corpo py-5">
      <div class="w-full h-auto">
         <StepCard />
      </div>
      <div class="w-full mt-5 h-auto p-2 flex items-center justify-center">
         <button
            @click="iniciar"
            class="w-full px-6 py-4 text-center font-semibold antialiased bg-backend rounded-lg"
         >
            <span class="text-white">Iniciar</span>
         </button>
      </div>
   </div>
</template>

<style scoped>
.corpo {
   display: grid;
   grid-template-rows: 1fr auto;
}
</style>
