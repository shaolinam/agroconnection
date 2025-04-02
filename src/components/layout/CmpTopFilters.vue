<template>
  <div class="overflow-x-auto hide-scrollbar">
    <div class="flex gap-1">
      <button v-for="top in tops" :key="top.title" class="mini-card">
        <img :src="top.image" :alt="top.title" class="mini-card-icon" />
        <span class="mini-card-text">{{ top.title }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const tops = [
  {
    title: "Pecuária",
    image: "https://cdn-icons-png.flaticon.com/512/2395/2395796.png",
  },
  {
    title: "Orti-fruti",
    image: "https://cdn-icons-png.flaticon.com/512/3194/3194766.png",
  },
  {
    title: "Veículos",
    image: "https://cdn-icons-png.flaticon.com/512/2194/2194813.png",
  },
  {
    title: "Insumos",
    image: "https://cdn-icons-png.flaticon.com/512/3382/3382765.png",
  },
];
</script>

<style scoped>
.mini-card {
  @apply flex flex-col items-center justify-center;
  @apply bg-white rounded-xl shadow-sm;
  @apply p-3 min-w-[90px] h-[90px];
  @apply border border-gray-100;
  @apply transition-all duration-200;
}

.mini-card:hover {
  @apply shadow-md transform -translate-y-0.5;
  @apply bg-gray-50;
}

.mini-card:active {
  @apply bg-gray-100 transform translate-y-0;
}

.mini-card-icon {
  @apply w-8 h-8 mb-2;
  filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.2));
}

.mini-card-text {
  @apply text-xs text-center font-medium text-gray-700;
  @apply line-clamp-2;
}

.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
