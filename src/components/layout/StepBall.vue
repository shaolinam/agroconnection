<script setup lang="ts">
// const activedPosition = ref(0)
const props = defineProps({
   position: {
      type: Number,
      default: 0,
   },
});
</script>

<template>
   <div class="flex flex-row space-x-2 items-center align-middle p-2">
      <div
         class="rounded-full"
         :class="
            props.position == 0 ? 'w-3 h-7 bg-backend' : 'w-3 h-3 bg-fundoBase'
         "
      ></div>
      <div
         class="rounded-full"
         :class="
            props.position == 1 ? 'w-3 h-7 bg-backend' : 'w-3 h-3 bg-fundoBase'
         "
      ></div>
      <div
         class="rounded-full"
         :class="
            props.position == 2 ? 'w-3 h-7 bg-backend' : 'w-3 h-3 bg-fundoBase'
         "
      ></div>
   </div>
</template>
