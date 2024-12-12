import { defineStore } from "pinia";
import { computed, reactive } from "vue";

export const processoStore = defineStore("processoStore", () => {
  // VALIDATIONS
  const isValidName = computed(() => {
    if (!state.input.name.dirty) return "";
    if (!state.input.name.value) return "Campo obrigatório";
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
    },
    filter: {
      ator: {
        value: "",
        dirty: false,
        valid: true,
      },
      periodo: {
        value: "",
        dirty: false,
        valid: true,
      },
      numeroProcesso: {
        value: "",
        dirty: false,
        valid: true,
      },
      statusProcesso: {
        value: "",
        dirty: false,
        valid: true,
      },
      tipoDataProcesso: {
        value: "",
        dirty: false,
        valid: true,
      },
      dtInicioProcesso: {
        value: "",
        dirty: false,
        valid: true,
      },
      dtFimProcesso: {
        value: "",
        dirty: false,
        valid: true,
      },
    },
  });

  //GETTERS

  // RETURN

  return {
    state,
  };
});
