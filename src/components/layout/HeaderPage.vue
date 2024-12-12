<template>
  <div class="p-2 w-full">
    <h2 class="titulo">{{ title }}</h2>
    <h3 class="subTitulo">{{ subTitle}}</h3>
  </div>
</template>

<script setup lang="ts">

  defineProps({
    title: {
      type: String,
      default: "Title"
    },
    subTitle: {
      type: String,
      default: "SubTitle"
    },
  })

</script>

<style scoped>

</style>