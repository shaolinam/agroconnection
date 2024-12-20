<template>
   <div class="grid grid-cols-1 p-4 gap-2 text-white">
      <div class="flex items-center justify-center">
         <IconLogo class="md:w-40 md:h-40 border rounded-lg" />
      </div>
      <div class="text-center mb-5">
         <h2 class="text-2xl font-bold antialiased tracking-wider">
            Entre com sua Conta
         </h2>
      </div>
      <div class="h-20">
         <!-- <label for="cpf">CPF</label> -->
         <input
            type="text"
            id="cpf"
            v-model="dados.cpf.value"
            @focus="dados.cpf.dirty = true"
            placeholder="Entre com seus cpf ou e-mail"
         />
         <p v-if="dados.cpf.valid.length > 0" class="msg-campo-invalido">
            *{{ dados.cpf.valid }}
         </p>
      </div>
      <div class="relative h-20">
         <!-- <label for="password">Senha</label> -->
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
         <p v-if="dados.password.valid.length > 0" class="msg-campo-invalido">
            *{{ dados.password.valid }}
         </p>
      </div>
      <div class="w-full my-3 text-center">
         <!-- <RouterLink to="/authentication/forget-password"> -->
         <RouterLink :to="{ name: 'forgetPassword' }">
            <p class="text-white underline">Esqueci minha senha</p>
         </RouterLink>
      </div>
      <div class="mt-5 flex items-center justify-center">
         <button
            @click="onClickedEntrar()"
            class="btn-padrao w-full"
         >
            <p>Login</p>
         </button>
      </div>
      <div class="w-full my-3 text-center">
         <!-- <RouterLink to="/authentication/forget-password"> -->
         <p>Ainda não tem conta ?
            <RouterLink :to="{ name: 'newUser' }">
               <span class="font-bold text-white underline">Clique aqui</span>
            </RouterLink>
         </p>
      </div>
   </div>
</template>

<script setup lang="ts">
// import IconNovoUser from "../../components/icons/IconNovoUser.vue";
// import IconLogin from "../../components/icons/IconLogin.vue";
import IconLogo from "../../components/icons/IconLogo.vue";

import { computed, inject, reactive, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

import { UserGateway } from "../../gateway/UserGateway";
const userGateway = inject("userGateway") as UserGateway;

import { geralStore } from "../../stores/geralStore";
const storeGeral = geralStore();

import Tools from "../../tools/Tools";

import { userStore } from "../../stores/userStore";
import { IResponseLogin } from "../../domain/entities/User";
const storeUser = userStore();

const tools = new Tools();

const showPassword = ref(false);

const notificationParams = reactive({
   titulo: "",
   subTitulo: "",
   sucesso: false,
   espera: 0,
});

const isValidCpf = computed(() => {
   if (!dados.cpf.dirty) return "";
   if (!dados.cpf.value) return "Campo obrigatório";
   return "";
});

const isValidPassword = computed(() => {
   if (!dados.password.dirty) return "";
   if (!dados.password.value) return "Campo obrigatório";
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

const onClickedEntrar = async () => {
   try {
      dirtyAll();

      if (!isValidAllFields()) return;

      const cpfSomenteNumeros = tools.somenteNumeros(dados.cpf.value);
      const payload = {
         cpf: cpfSomenteNumeros,
         password: dados.password.value,
      };
      // console.log('Login ', payload)

      const res: IResponseLogin = await userGateway.login(payload);
      
      storeUser.resetData()
      storeUser.setData(res.user)

      localStorage.setItem('appToken',JSON.stringify(res))

      notificationParams.sucesso = true;
      notificationParams.espera = 2000;
      notificationParams.titulo = "LOGIN";
      notificationParams.subTitulo = "Login realizado com sucesso!";
      await storeGeral.setNotificationParams(notificationParams);
      storeGeral.setShowNotification(true);
      router.push({ name: "home" });
   } catch (error: any) {
      console.log("ERROR: ", error.response);
      notificationParams.sucesso = false;
      notificationParams.espera = 0; // milisegundos - dividir por 1000 = segundos
      notificationParams.titulo = "LOGIN";
      notificationParams.subTitulo = error.response.data.message;
      await storeGeral.setNotificationParams(notificationParams); // setando os valores
      storeGeral.setShowNotification(true); // comando pra executar a exibicao do modal
   }
};

</script>

<style scoped></style>
