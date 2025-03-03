import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import Tools from "../tools/Tools";
const tools = new Tools();

export const userStore = defineStore("userStore", () => {
   // VALIDATIONS
   const isValidName = computed(() => {
      if (!state.input.name.dirty) return "";
      if (!state.input.name.value) return "Campo obrigatório";
      return "";
   });
   const isValidLastName = computed(() => {
      if (!state.input.lastname.dirty) return "";
      if (!state.input.lastname.value) return "Campo obrigatório";
      return "";
   });

   const isValidEmail = computed(() => {
      if (!state.input.email.dirty) return "";
      if (!state.input.email.value) return "Campo obrigatório";
      if (!tools.isValidEmail(state.input.email.value)) return "Email inválido";
      return "";
   });
   const isValidCpf = computed(() => {
      if (!state.input.cpf.dirty) return "";
      if (!state.input.cpf.value) return "Campo obrigatório";
      if (!tools.validarCPF(state.input.cpf.value)) return "CPF inválido";
      return "";
   });
   const isValidBirthday = computed(() => {
      if (!state.input.birthday.dirty) return "";
      if (!state.input.birthday.value) return "Campo obrigatório";
      const birthday = new Date(state.input.birthday.value);
      const age = tools.idade(birthday);
      if (!tools.isAdult(age)) return "Você deve ser maior de idade";
      return "";
   });
   const isValidPassword = computed(() => {
      if (!state.input.password.dirty) return "";
      if (!state.input.password.value) return "Campo obrigatório";
      if (!tools.isValidPassword(state.input.password.value))
         return "Senha inválida! Mínimo de 8 caracteres";
      return "";
   });
   const isValidConfirmPassword = computed(() => {
      if (!state.input.confirmPassword.dirty) return "";
      if (!state.input.confirmPassword.value) return "Campo obrigatório";
      if (state.input.password.value !== state.input.confirmPassword.value)
         return "Senhas devem ser iguais";
      return "";
   });

   // STATE
   const state = reactive({
      input: {
         name: {
            value: "",
            dirty: false,
            valid: isValidName,
         },
         lastname: {
            value: "",
            dirty: false,
            valid: isValidLastName,
         },
         email: {
            value: "",
            dirty: false,
            valid: isValidEmail,
         },
         cpf: {
            value: "",
            dirty: false,
            valid: isValidCpf,
         },
         birthday: {
            value: "",
            dirty: false,
            valid: isValidBirthday,
         },
         password: {
            value: "",
            dirty: false,
            valid: isValidPassword,
         },
         confirmPassword: {
            value: "",
            dirty: false,
            valid: isValidConfirmPassword,
         },
      },
      data: {
         id: "",
         name: "",
         email: "",
      },
   });

   // ACTIONS
   //
   //

   const setToken = (token: string): Promise<void> => {
      return new Promise((resolve) => {
         localStorage.setItem("appToken", JSON.stringify(token));
         resolve();
      });
   };

   const dirtyAll = () => {
      state.input.name.dirty = true;
      state.input.lastname.dirty = true;
      state.input.email.dirty = true;
      state.input.cpf.dirty = true;
      state.input.birthday.dirty = true;
      state.input.password.dirty = true;
      state.input.confirmPassword.dirty = true;
   };

   const resetData = () => {
      state.data.id = "";
      state.data.name = "";
      state.data.email = "";
   };

   const setData = (data: { id: string; name: string; email: string }) => {
      state.data.id = data.id;
      state.data.name = data.name;
      state.data.email = data.email;
   };

   const logout: Promise<void> = new Promise((resolve) => {
      resetData();
      localStorage.removeItem("appLogin");
      resolve();
   });

   // GETTERS
   const getInput = () => state.input;

   const isValidAllFields = () => {
      if (
         state.input.name.valid.length == 0 &&
         state.input.lastname.valid.length == 0 &&
         state.input.cpf.valid.length == 0 &&
         state.input.email.valid.length == 0 &&
         state.input.birthday.valid.length == 0 &&
         state.input.password.valid.length == 0 &&
         state.input.confirmPassword.valid.length == 0
      )
         return true;
      return false;
   };

   const getData = () => {
      return state.data;
   };

   // RETURN

   return {
      state,
      getInput,
      dirtyAll,
      isValidAllFields,
      resetData,
      setData,
      getData,
      setToken,
      logout,
   };
});
