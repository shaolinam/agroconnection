<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const sleep = async (timeout: number): Promise<void> => {
   return new Promise(() => {
      setTimeout(() => {
         // router.push({ name: "step"})
         router.push({ name: "login"})
      }, timeout);
   })
}

onMounted(async () => {
   await sleep(2000);
})

</script>

<template>
   <div class="w-full min-h-screen flex items-center justify-center">
      <div class="w-full h-full flex items-center justify-center">
         <img src="../../assets/img/Logo.svg" alt="">
      </div>
   </div>
</template>
