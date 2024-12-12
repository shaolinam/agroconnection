<template>
  <div
    style="background: rgba(0, 0, 0, 0.4)"
    class="overflow-x-hidden overflow-y-auto fixed h-modal md:h-full top-4 left-0 right-0 md:inset-0 z-[70] flex justify-center items-center animated fadeIn faster"
  >
    <div class="w-10/12 max-w-2xl p-4 h-auto rounded">
      <div
        class="relative flex flex-col bg-white border shadow-sm rounded-xl overflow-hidden"
      >
        <div class="p-4 sm:p-10 overflow-y-auto">
          <div class="flex gap-x-4 md:gap-x-7">
            <!-- Icon -->
            <span
              class="flex-shrink-0 inline-flex justify-center items-center w-[46px] h-[46px] sm:w-[62px] sm:h-[62px] rounded-full border-4 border-red-50 bg-red-100 text-red-500"
            >
              <svg
                class="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                />
              </svg>
            </span>
            <!-- End Icon -->
            <div>
              <h3 class="mb-2 text-xl font-bold text-gray-800">Atenção</h3>
              <p class="text-gray-500">{{ props.confirmMessage }}</p>
            </div>
          </div>
        </div>
        <div
          class="flex justify-end items-center gap-x-2 py-3 px-4 bg-gray-50 border-t"
        >
          <button
            @click="onClickedCancelar"
            type="button"
            class="w-20 py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm"
            data-hs-overlay="#hs-danger-alert"
          >
            Cancel
          </button>
          <a
            @click="onClickedConfirmar"
            class="w-20 py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-sky-600 text-white hover:bg-primary focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-all text-sm"
            href="#"
          >
            Confirmar
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { geralStore } from "../../../stores/geralStore";
const storeGeral = geralStore();

const props = defineProps({
  confirmMessage: {
    type: String,
    default: "Confirma ação",
  },
});

// const emit = defineEmits(["onCancelar", "onConfirmar"]);

const emits = defineEmits<{
  (e: "onCancelar"): void;
  (e: "onConfirmar"): void;
}>();

const onClickedCancelar = () => {
  storeGeral.fecharModal();
  emits("onCancelar");
};

const onClickedConfirmar = () => {
  storeGeral.fecharModal();
  emits("onConfirmar");
};
</script>