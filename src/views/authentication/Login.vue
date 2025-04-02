<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- Container principal -->
    <div class="flex-1 flex items-center justify-center px-4 py-12">
      <div class="w-full max-w-md">
        <!-- Logo e Título -->
        <div class="text-center mb-8">
          <IconLogo class="h-16 mx-auto mb-4 text-backend" />
          <h1 class="text-3xl font-bold text-gray-900">Seja bem-vindo!</h1>
          <p class="mt-2 text-gray-600">Entre com suas credenciais</p>
        </div>

        <!-- Formulário -->
        <div class="bg-white rounded-2xl shadow-xl p-8">
          <form @submit.prevent="onClickedEntrar" class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >CPF</label
              >
              <input
                type="text"
                v-model="dados.cpf.value"
                @focus="dados.cpf.dirty = true"
                @input="inputformatCPF()"
                maxlength="14"
                placeholder="Entre com seu CPF"
                class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
              />
              <p
                v-if="dados.cpf.valid.length > 0"
                class="mt-1 text-sm text-red-600"
              >
                * {{ dados.cpf.valid }}
              </p>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Senha</label
              >
              <div class="relative">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  v-model="dados.password.value"
                  @focus="dados.password.dirty = true"
                  placeholder="Entre com sua senha"
                  class="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors pr-12"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  <svg
                    v-if="showPassword"
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                    />
                  </svg>
                  <svg
                    v-else
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </button>
              </div>
              <p
                v-if="dados.password.valid.length > 0"
                class="mt-1 text-sm text-red-600"
              >
                * {{ dados.password.valid }}
              </p>
            </div>

            <div class="flex items-center justify-between">
              <RouterLink
                :to="{ name: 'forgetPassword' }"
                class="text-sm text-green-600 hover:text-green-700"
              >
                Esqueci minha senha
              </RouterLink>
            </div>

            <button
              type="submit"
              class="w-full bg-green-600 text-white py-3 px-4 rounded-xl hover:bg-green-700 transition-colors font-medium"
            >
              Entrar
            </button>
          </form>

          <!-- Divisor -->
          <div class="relative my-8">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">Ou continue com</span>
            </div>
          </div>

          <!-- Botões de Login Social -->
          <div class="grid grid-cols-2 gap-4">
            <button
              type="button"
              class="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <svg class="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span class="text-gray-700">Google</span>
            </button>
            <button
              type="button"
              class="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
            >
              <svg class="h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
                />
              </svg>
              <span class="text-gray-700">Facebook</span>
            </button>
          </div>
        </div>

        <!-- Link para cadastro -->
        <p class="mt-8 text-center text-sm text-gray-600">
          Ainda não tem conta?
          <RouterLink
            :to="{ name: 'newUser' }"
            class="font-medium text-green-600 hover:text-green-700"
          >
            Clique aqui
          </RouterLink>
        </p>
      </div>
    </div>

    <!-- Footer com versão -->
    <div class="py-4 text-center text-sm text-gray-500">Versão 1.0.0</div>
  </div>
</template>

<script setup lang="ts">
import { computed, ComputedRef, inject, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { UserGateway } from "../../gateway/UserGateway";
import { geralStore } from "../../stores/geralStore";
import { userStore } from "../../stores/userStore";
import { IResponseLogin } from "../../domain/entities/User";
import Tools from "../../tools/Tools";
import IconLogo from "../../components/icons/IconLogo.vue";

const router = useRouter();
const userGateway = inject("userGateway") as UserGateway;
const storeGeral = geralStore();
const storeUser = userStore();
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

    console.log("res: ", res);

    await storeUser.setToken(res.access_token);

    const userRes = await userGateway.getProfile();

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
    notificationParams.sucesso = false;
    notificationParams.espera = 0;
    notificationParams.titulo = "LOGIN";
    if (error && error.response.data && error.response.data.message) {
      if (error.response.data.statusCode == 401)
        notificationParams.subTitulo = "Login não autorizado";
      else notificationParams.subTitulo = error.response.data.message;
    } else notificationParams.subTitulo = error;
    await storeGeral.setNotificationParams(notificationParams);
    storeGeral.setShowNotification(true);
  }
};
</script>
