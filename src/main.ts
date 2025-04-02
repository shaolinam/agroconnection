import { createApp } from "vue";
import { createPinia } from "pinia";

import "./assets/css/style.css";
import "./assets/css/tailwind.css";
import "./assets/css/form.css";

import App from "./App.vue";
import Router from "./router";

import AxiosAuth from "./Axios-Auth";
import AxiosAdapter from "./infra/AxiosAdapter";

const app = createApp(App);
const pinia = createPinia();

app.use(Router);
app.use(pinia);

const httpClient = new AxiosAdapter(AxiosAuth);

import UserHttpGateway from "./gateway/UserHttpGateway";
import ProductHttpGateway from "./gateway/ProductHttpGateway";
import StoreHttpGateway from "./gateway/StoreHttpGateway";

const userGateway = new UserHttpGateway(httpClient);
app.provide("userGateway", userGateway);

const productGateway = new ProductHttpGateway(httpClient);
app.provide("productGateway", productGateway);

const storeGateway = new StoreHttpGateway(httpClient);
app.provide("storeGateway", storeGateway);

app.mount("#app");
