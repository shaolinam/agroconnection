<template>
   <div class="w-full flex flex-col">
      <div v-if="!resp" class="w-full p-2 bg-yellow-200">
         <p
            class="w-full text-sm text-slate-800 antialiased font-semibold tracking-wide rounded-lg"
         >
            Não foram encontrados dados
         </p>
      </div>
      <div v-else>
         <div class="w-full py-3 flex justify-end items-center">
            <CmpPagination :page="page" />
         </div>
         <!-- {{ dados }} -->
         <div class="w-full" v-for="product in dados" key="produto">
            <!-- <div class="w-full h-80 overflow-y-scroll"> -->
            <!-- <div class="w-full" v-for="product in dados" key="produto"> -->
            <CmpProduct class="mb-3" :product="product" />
            <!-- </div> -->
         </div>
      </div>
   </div>
</template>

<script setup lang="ts">
import CmpPagination from "../../../components/layout/CmpPagination.vue";
import CmpProduct from "../../../components/CmpProduct.vue";

import { computed, inject, reactive } from "vue";

import { ProductGateway } from "../../../gateway/ProductGateway";
import { IProduct } from "../../../domain/entities/Product";
const productGateway = inject("productGateway") as ProductGateway;

// import { geralStore } from "../../../stores/geralStore";
// const storeGeral = geralStore();
//
const produtos = reactive([]);

let resp = reactive({});

let paginacao = reactive({
   count: 0,
   total: 0,
   pagination: {
      page: 0,
      limit: 0,
      totalPages: 0,
      hasNextPage: false,
      hasPrevPage: false,
   },
});

const obterProdutos = async (): Promise<void> => {
   resp = await productGateway.getAll();
   // console.log(resp);
   if (resp) {
      if (resp.data) resp.data.map((p: IProduct) => produtos.push(p));
      if (resp.pagination) {
         paginacao.count = resp.count;
         paginacao.total = resp.total;
         paginacao.pagination.page = resp.pagination.page;
         paginacao.pagination.limit = resp.pagination.limit;
         paginacao.pagination.totalPages = resp.pagination.totalPages;
         paginacao.pagination.hasNextPage = resp.pagination.hasNextPage;
         paginacao.pagination.hasPrevPage = resp.pagination.hasPrevPage;
      }
   }
   // if (resp && resp.pagination)
};

const dados = computed(() => {
   return produtos;
});

const page = computed(() => {
   return paginacao;
});

obterProdutos();
</script>
