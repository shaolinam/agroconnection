<template>
  <div class="mobile-layout">
    <!-- Header Fixo -->
    <header class="fixed-header">
      <div class="header-content">
        <div class="header-left">
          <slot name="header-left">
            <button
              v-if="showBackButton"
              @click="goBack"
              class="tap-highlight p-2"
            >
              <IconLeft class="w-6 h-6 text-gray-700" />
            </button>
          </slot>
        </div>
        <div class="header-title">
          <h1 class="text-lg font-medium truncate">{{ title }}</h1>
        </div>
        <div class="header-right">
          <slot name="header-right">
            <button @click="handleLogout" class="tap-highlight p-2">
              <IconLogout class="w-6 h-6 text-gray-700" />
            </button>
          </slot>
        </div>
      </div>
    </header>

    <!-- Conteúdo Principal -->
    <main class="main-content overscroll-contain">
      <slot></slot>
    </main>

    <!-- Bottom Menu Fixo -->
    <nav class="fixed-bottom">
      <div class="bottom-nav">
        <button
          v-for="item in navigationItems"
          :key="item.route"
          class="nav-item tap-highlight"
          @click="navigateTo(item.route)"
        >
          <component :is="item.icon" :class="getActiveClass(item.route)" />
          <span :class="getActiveClass(item.route)">{{ item.label }}</span>
        </button>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import IconHome from "../icons/IconHome.vue";
import IconPesquisar from "../icons/IconPesquisar.vue";
import IconShopping from "../icons/IconShopping.vue";
import IconFavorito from "../icons/IconFavorito.vue";
import IconUser from "../icons/IconUser.vue";
import IconLeft from "../icons/IconLeft.vue";
import IconLogout from "../icons/IconLogout.vue";

defineProps({
  title: {
    type: String,
    default: "",
  },
  showBackButton: {
    type: Boolean,
    default: false,
  },
});

const router = useRouter();
const route = useRoute();

const currentRoute = computed(() => route.name);

const getActiveClass = (routeName: string) => {
  return currentRoute.value === routeName ? "text-backend" : "text-gray-500";
};

const navigateTo = (route: string) => {
  router.push({ name: route });
};

const goBack = () => {
  router.back();
};

const handleLogout = () => {
  // Aqui você pode adicionar a lógica de logout
  router.push("/authentication/login");
};

const navigationItems = [
  { route: "home", icon: IconHome, label: "Início" },
  { route: "search", icon: IconPesquisar, label: "Buscar" },
  { route: "stores", icon: IconShopping, label: "Lojas" },
  { route: "favorites", icon: IconFavorito, label: "Favoritos" },
  { route: "profile", icon: IconUser, label: "Perfil" },
];
</script>

<style scoped>
.mobile-layout {
  @apply min-h-screen bg-gray-50 w-full relative;
  height: 100vh;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  max-width: 100vw;
}

.fixed-header {
  @apply bg-white/95 backdrop-blur-sm border-b z-50;
  padding-top: env(safe-area-inset-top);
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
}

.header-content {
  @apply w-full mx-auto px-4 flex items-center justify-between;
  max-width: 520px;
  height: 3.5rem;
}

.header-left {
  @apply flex items-center;
  width: 48px;
  flex-shrink: 0;
}

.header-title {
  @apply flex-1 flex items-center justify-center;
  min-width: 0;
  padding: 0 8px;
}

.header-title h1 {
  @apply text-lg font-medium truncate;
  max-width: 100%;
}

.header-right {
  @apply flex items-center;
  width: 48px;
  flex-shrink: 0;
}

.main-content {
  @apply w-full mx-auto px-4 overflow-y-auto flex-1;
  max-width: 520px;
  -webkit-overflow-scrolling: touch;
  padding-top: calc(3.5rem + env(safe-area-inset-top));
  padding-bottom: calc(4rem + env(safe-area-inset-bottom));
}

.fixed-bottom {
  @apply bg-white/95 backdrop-blur-sm border-t z-50;
  padding-bottom: env(safe-area-inset-bottom);
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: calc(4rem + env(safe-area-inset-bottom));
}

.bottom-nav {
  @apply w-full mx-auto grid grid-cols-5 items-center px-2;
  max-width: 520px;
  height: 4rem;
}

.nav-item {
  @apply flex flex-col items-center justify-center gap-1 p-1;
}

.nav-item span {
  @apply text-xs font-medium;
}

.nav-item svg {
  @apply w-6 h-6;
}

.tap-highlight {
  -webkit-tap-highlight-color: transparent;
  @apply active:opacity-70 transition-opacity select-none;
}
</style>
