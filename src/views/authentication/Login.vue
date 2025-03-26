<template>
   <div class="w-full h-full corpo">
      <div class="w-full mb-2 flex items-center justify-start">
         <span>
            <a href="/"> <IconVoltar class="text-slate-800" /></a>
         </span>
      </div>
      <div
         class="w-full h-full grid grid-cols-1 md:p-4 bg-white items-center md:shadow-lg"
      >
         <div class="w-full grid gird-cols-6 gap-2">
            <div class="col-span-6 text-center mb-5">
               <h2 class="text-2xl font-bold antialiased tracking-wider">
                  Seja bem vindo !
               </h2>
            </div>
            <div class="col-span-6 text-left mb-5">
               <label> Entre com sua Conta</label>
            </div>
            <div class="col-span-6 h-24 space-y-1">
               <label for="cpf">CPF</label>
               <input
                  type="text"
                  id="cpf"
                  v-model="dados.cpf.value"
                  @focus="dados.cpf.dirty = true"
                  @input="inputformatCPF()"
                  maxlength="14"
                  placeholder="Entre com seu cpf"
               />
               <p v-if="dados.cpf.valid.length > 0" class="msg-campo-invalido">
                  * {{ dados.cpf.valid }}
               </p>
            </div>
            <div class="col-span-6 relative h-24 space-y-1">
               <label for="cpf">Senha</label>
               <div class="relative w-full flex items-center">
                  <input
                     id="senha"
                     name="senha"
                     @focus="dados.password.dirty = true"
                     v-model="dados.password.value"
                     :type="showPassword ? 'text' : 'password'"
                     placeholder="Entre com a senha"
                     class="text-sm sm:text-base relative w-full border rounded-full placeholder-gray-400 focus:outline-none h-12 py-3 pr-2 pl-4"
                  />
                  <div
                     class="absolute flex border border-transparent right-0 top-0 h-full w-10"
                  >
                     <div
                        class="flex items-center justify-center rounded-tl rounded-bl text-gray-600 text-lg h-ful w-full"
                     >
                        <button
                           @click="showPassword = !showPassword"
                           class="w-10 ml-12 focus:outline-none flex items-center"
                        >
                           <svg
                              v-if="showPassword"
                              class="w-6 h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                           >
                              <path
                                 stroke-linecap="round"
                                 stroke-linejoin="round"
                                 stroke-width="2"
                                 d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                              ></path>
                           </svg>
                           <svg
                              v-else
                              class="w-6 h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                           >
                              <path
                                 stroke-linecap="round"
                                 stroke-linejoin="round"
                                 stroke-width="2"
                                 d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              ></path>
                              <path
                                 stroke-linecap="round"
                                 stroke-linejoin="round"
                                 stroke-width="2"
                                 d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              ></path>
                           </svg>
                        </button>
                     </div>
                  </div>
               </div>
               <p
                  v-if="dados.password.valid.length > 0"
                  class="msg-campo-invalido"
               >
                  * {{ dados.password.valid }}
               </p>
            </div>
            <div class="col-span-6 my-3">
               <RouterLink :to="{ name: 'forgetPassword' }">
                  <p class="text-gray-800 underline">Esqueci minha senha</p>
               </RouterLink>
            </div>
            <div class="mt-5 col-span-6 flex items-center justify-center">
               <button @click="onClickedEntrar()" class="btn-padrao w-full">
                  <p>Login</p>
               </button>
            </div>
            <div class="col-span-6 my-3">
               <p>
                  Ainda não tem conta ?
                  <RouterLink :to="{ name: 'newUser' }">
                     <span class="font-bold text-backend underline"
                        >Clique aqui</span
                     >
                  </RouterLink>
               </p>
            </div>
         </div>
      </div>
   </div>
</template>

<style scoped>
.corpo {
   display: grid;
   grid-template-rows: auto 1fr;
}
</style>

<script setup lang="ts">
import IconVoltar from "../../components/icons/IconVoltar.vue";
import { computed, ComputedRef, inject, reactive, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

import { UserGateway } from "../../gateway/UserGateway";
const userGateway = inject("userGateway") as UserGateway;

import { geralStore } from "../../stores/geralStore";
const storeGeral = geralStore();

import Tools from "../../tools/Tools";

import { userStore } from "../../stores/userStore";
const storeUser = userStore();

import { IResponseLogin } from "../../domain/entities/User";

const tools = new Tools();

const showPassword = ref(false);

const notificationParams = reactive({
   titulo: "",
   subTitulo: "",
   sucesso: false,
   espera: 0,
});

const isValidCpf: ComputedRef<string> = computed(() => {
   if (!dados.cpf.dirty) return "";
   if (!dados.cpf.value) return "Campo obrigatório";
   if (dados.cpf.value.length < 14)
      return `Incompleto: ${tools.somenteNumeros(dados.cpf.value).length}/11`;
   if (dados.cpf.value.length == 14) {
      if (!tools.validarCPF(dados.cpf.value)) return "CPF inválido";
   }
   return "";
});

const isValidPassword: ComputedRef<string> = computed(() => {
   if (!dados.password.dirty) return "";
   if (!dados.password.value) return "Campo obrigatório";
   if (dados.password.value.length < 8)
      return `Mínimo de 8 caracteres (${dados.password.value.length}/8)`;
   return "";
});

const dados = reactive({
   cpf: {
      value: "",
      dirty: false,
      valid: isValidCpf,
   },
   password: {
      value: "",
      dirty: false,
      valid: isValidPassword,
   },
});

const dirtyAll = () => {
   dados.cpf.dirty = true;
   dados.password.dirty = true;
};

const isValidAllFields = () => {
   if (dados.cpf.valid.length == 0 && dados.password.valid.length == 0)
      return true;
   return false;
};

const inputformatCPF = () => {
   const somenteNumeros = tools.somenteNumeros(dados.cpf.value);
   dados.cpf.value = tools.formatCPF(somenteNumeros);
};

const onClickedEntrar = async () => {
   try {
      dirtyAll();

      if (!isValidAllFields()) return;

      const cpfSomenteNumeros = tools.somenteNumeros(dados.cpf.value);
      const payload = {
         cpf: cpfSomenteNumeros,
         password: dados.password.value,
      };

      const res: IResponseLogin = await userGateway.login(payload);

      await storeUser.setToken(res.access_token);

      const userRes = await userGateway.getProfile();

      // console.log("profile: ", userRes);

      storeUser.resetProfile();
      storeUser.setProfile({
         id: userRes.user.userId,
         name: userRes.user.username,
         email: "",
      });

      notificationParams.sucesso = true;
      notificationParams.espera = 2000;
      notificationParams.titulo = "LOGIN";
      notificationParams.subTitulo = "Login realizado com sucesso!";
      await storeGeral.setNotificationParams(notificationParams);
      storeGeral.setShowNotification(true);
      router.push({ name: "home" });
   } catch (error: any) {
      // console.log("ERROR: ", error.response.data);
      notificationParams.sucesso = false;
      notificationParams.espera = 0; // milisegundos - dividir por 1000 = segundos
      notificationParams.titulo = "LOGIN";
      if (error && error.response.data && error.response.data.message) {
         if (error.response.data.statusCode == 401)
            notificationParams.subTitulo = "Login não autorizado";
         else notificationParams.subTitulo = error.response.data.message;
      } else notificationParams.subTitulo = error;
      await storeGeral.setNotificationParams(notificationParams); // setando os valores
      storeGeral.setShowNotification(true); // comando pra executar a exibicao do modal
   }
};
</script>
