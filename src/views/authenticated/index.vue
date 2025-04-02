<template>
  <!-- <div class="max-w-[375px] mx-auto min-h-screen py-5 corpo items-center"> -->
  <div
    class="min-w-sm md:max-w-screen-md max-w-[375px] mx-auto min-h-screen py-5 corpo items-center"
  >
    <!-- <CmpHeader class="top-0 z-20" /> -->
    <div class="overflow-y-auto">
      <RouterView></RouterView>
    </div>
    <!-- <CmpBottom class="bottom-0 z-20" /> -->
  </div>
</template>

<script setup lang="ts">
// import IconVoltar from "../../components/icons/IconVoltar.vue";
</script>

<style scoped>
.corpo {
  display: grid;
  grid-template-rows: auto 1fr auto;
}
</style>
