<script setup lang="ts">
// import { ref } from 'vue';
// import Step1 from './Step1.vue';
// import Step2 from './Step2.vue';
// import Step3 from './Step3.vue';
// import { useRouter } from 'vue-router';

// const router = useRouter()

// const stepComponente = [
//    Step1,
//    Step2,
//    Step3,
// ]

// const step = ref(0)

// const addStep = ()=> {
//    if (step.value == 3) return
//    step.value++
// }
// const subStep = ()=> {
//    if (step.value == 1) return
//    step.value--
// }

</script>

<template>
   <div class="w-full min-h-screen flex items-center justify-center p-4">
      <div class="w-full grid grid-rows-2 border">
         <div class="h-40 bg-indigo-500 p-2 border">1</div>
         <div class="h-40 bg-gray-300">2</div>
         <!-- <component :is="stepComponente[step]"></component>
         <div class="flex flex-row space-x-2 items-center align-middle p-2">
            <div class="w-3 h-3 rounded-full bg-backend"></div>
            <div class="w-3 h-3 rounded-full bg-backend"></div>
            <div class="w-3 h-3 rounded-full bg-backend"></div>
         </div>
         <div class="grid grid-rows-2 md:grid-rows-1 gap-2">
            <button @click="subStep" class="w-full px-4 py-2 text-center">
               <span>Anterior</span>
            </button>
            <button @click="addStep" class="w-full px-4 py-2 text-center">
               <span>Próximo</span>
            </button>
         </div> -->
      </div>
   </div>
</template>
