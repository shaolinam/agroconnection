<template>
  <div class="w-full mb-10 flex flex-col">
    <div class="w-full">
      <RouterLink to="/splash" class="text-white underline">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
      </RouterLink>
    </div>
    <div class="w-full my-5 p-2">
      <h2 class="titulo-page">Cadastro de Usuário</h2>
    </div>
    <div class="grid grid-cols-6 gap-x-2 gap-y-6">
      <!-- Primeiro nome -->
      <div class="col-span-6 md:col-span-3 h-20 space-y-1 ">
        <label for="nome">Primeiro Nome</label>
        <input type="text" id="nome" 
          maxlength="20"
          v-model="state.input.name.value"
          @focus="state.input.name.dirty = true"
        >
        <p v-if="state.input.name.valid.length > 0" class="msg-campo-invalido">{{ state.input.name.valid }}</p>
      </div>
      <!-- Último nome -->
      <div class="col-span-6 md:col-span-3 h-20 space-y-1 ">
        <label for="ultimonome">Último Nome</label>
        <input type="text" id="ultimonome" 
          maxlength="20"
          v-model="state.input.lastname.value"
          @focus="state.input.lastname.dirty = true"
        >
        <p v-if="state.input.lastname.valid.length > 0" class="msg-campo-invalido">{{ state.input.lastname.valid }}</p>
      </div>
      <!-- email -->
      <div class="col-span-6 h-20 space-y-1">
        <label for="email">Email</label>
        <input type="text" id="email" 
          v-model="state.input.email.value"
          @focus="state.input.email.dirty = true"
        >
        <p v-if="state.input.email.valid.length > 0" class="msg-campo-invalido">{{ state.input.email.valid }}</p>
      </div>
      <!-- cpf -->
      <div class="col-span-6 md:col-span-3 h-20 space-y-1">
        <label for="cpf">CPF</label>
        <input type="text" id="cpf" 
          v-model="state.input.cpf.value"
          @focus="state.input.cpf.dirty = true"
          @blur="formatarCampo()"
        >
        <p v-if="state.input.cpf.valid.length > 0" class="msg-campo-invalido">{{ state.input.cpf.valid }}</p>
      </div>
      <!-- aniversario -->
      <div class="col-span-6 md:col-span-3 h-20 space-y-1">
        <label for="birthday">Data Aniversário</label>
        <input type="date" id="birthday" 
          v-model="state.input.birthday.value"
          @focus="state.input.birthday.dirty = true"
        >
        <p v-if="state.input.birthday.valid.length > 0" class="msg-campo-invalido">{{ state.input.birthday.valid }}</p>
      </div>
      <!-- senha -->
      <div class="col-span-6 md:col-span-3 h-20 space-y-1">
        <label for="password">Senha</label>
        <input type="text" id="password"
          v-model="state.input.password.value"
          @focus="state.input.password.dirty = true"
          >
          <p v-if="state.input.password.valid.length > 0" class="msg-campo-invalido">{{ state.input.password.valid }}</p>
      </div>
      <!-- confirmar senha -->
      <div class="col-span-6 md:col-span-3 h-20 space-y-1">
        <label for="confirmPassword">Confirmar Senha</label>
        <input type="text" id="confirmPassword"
          v-model="state.input.confirmPassword.value"
          @focus="state.input.confirmPassword.dirty = true"
          >
          <p v-if="state.input.confirmPassword.valid.length > 0" class="msg-campo-invalido">{{ state.input.confirmPassword.valid }}</p>
      </div>
    </div>
    <div class="w-full mt-10 flex flex-col md:flex-row md:items-center md:justify-center space-y-4 md:space-y-0 md:space-x-5">
      <button @click="onClickedCancelar()" class="btn-cancelar">Cancelar</button>
      <button @click="onClickedSalvar()" class="btn-salvar">Salvar</button>
    </div>
  </div>
  <teleport to="#modalLoading" v-if="isLoading">
    <Loading :msg="msgLoading" />
  </teleport>
  <Teleport to="#modalGeral" v-if="statusModal">
    <ConfirmDialog @onConfirmar="onConfirmDialog"/>
  </Teleport>
</template>

<script setup lang="ts">
import ConfirmDialog from "../../components/layout/modal/ConfirmDialog.vue"
import Loading from "../../components/layout/modal/Loading.vue";

import { computed, inject, reactive, ref } from 'vue';

import { RouterLink, useRouter } from 'vue-router';
const router = useRouter()

import { geralStore } from "../../stores/geralStore";
const storeGeral = geralStore();

import { userStore } from "../../stores/userStore"
const storeUser = userStore()

import { UserGateway } from "../../gateway/UserGateway";
import User from "../../domain/entities/User";
const userGateway = inject("userGateway") as UserGateway;

import Tools from "../../tools/Tools"
const tools = new Tools()

const state = reactive({
  input: storeUser.state.input
})

// const input = computed(() => storeUser.getInput())

const statusModal = computed(() => storeGeral.exibirModal);

const msgLoading = ref("");
const isLoading = ref(false);
const confirmMessage = ref("");

const notificationParams = reactive({
  titulo: "",
  subTitulo: "",
  sucesso: false,
  espera: 0,
});

const formatarCampo = () => {
  const tmp = tools.somenteNumeros(state.input.cpf.value)
  state.input.cpf.value = tools.formatCPF(tmp);
}

const onClickedCancelar = () => {
  router.push({ name: "login" })
}

const onClickedSalvar = async () => {
  confirmMessage.value = "";
  storeUser.dirtyAll()
  if (!storeUser.isValidAllFields()) return 
  confirmMessage.value = "Confirma salvar o registro ?";
  await storeGeral.abrirModal();
}

const onConfirmDialog = async () => {
  try {
    const user = User.create(
      state.input.name.value, 
      state.input.cpf.value,
      state.input.email.value,
      new Date(state.input.birthday.value),
      state.input.password.value,
      true
    )

    await userGateway.create(user)

    notificationParams.sucesso = true;
    notificationParams.espera = 2000;
    notificationParams.subTitulo = "Operação realizada com sucesso!";
    await storeGeral.setNotificationParams(notificationParams);
    storeGeral.setShowNotification(true);

    router.push({ name: "login" })
  } catch (error: any) {
    notificationParams.subTitulo = error.response.data;
    await storeGeral.setNotificationParams(notificationParams);
    storeGeral.setShowNotification(true);
    // if (error.response) {
    //   if (error.response.status == 500) {
    //     notificationParams.subTitulo =
    //       "Servidor não responde! Tente mais tarde.";
    //   } else if (error.response.status == 401) {
    //     notificationParams.subTitulo = "Não autorizado! Faça login novamente.";
    //   } else if (error.response.data.message) {
    //     notificationParams.subTitulo = error.response.data.message;
    //   } else if (error.response.data.mensage) {
    //     notificationParams.subTitulo = error.response.data.mensage;
    //   } else {
    //     notificationParams.subTitulo = error.response.data;
    //   }
    // }
    // await storeGeral.setNotificationParams(notificationParams);
    // storeGeral.setShowNotification(true);
  }
}
</script>

<style scoped>

</style>