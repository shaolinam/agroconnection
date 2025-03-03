<script setup lang="ts">
import NotificationAlert from "./components/layout/NotificationAlert.vue";

import { computed } from "vue";

import { geralStore } from "./stores/geralStore";
const storeGeral = geralStore();
const isShowNotification = computed(() => storeGeral.getShowNotification());
</script>

<template>
   <div class="min-h-screen relative mx-auto max-w-[375px]">
      <RouterView></RouterView>
      <div id="modalGeral"></div>
      <div id="modalLoading"></div>
      <teleport to="#modalGeral" v-if="isShowNotification">
         <NotificationAlert :espera="0" :sucesso="false" />
      </teleport>
   </div>
</template>

<style></style>
