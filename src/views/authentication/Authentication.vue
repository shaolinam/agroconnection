<template>
   <div class="w-full min-h-screen py-5 corpo items-center">
      <!-- <div class="w-full py-2 flex items-center justify-start">
         <span>
            <a href="/"> <IconVoltar class="text-slate-800" /></a>
         </span>
      </div> -->
      <!-- <div class="w-full h-full"> -->
      <RouterView></RouterView>
      <!-- </div> -->
   </div>
</template>

<script setup lang="ts">
// import IconVoltar from "../../components/icons/IconVoltar.vue";
</script>

<style scoped>
.corpo {
   display: grid;
   grid-template-rows: 1fr;
}
</style>
