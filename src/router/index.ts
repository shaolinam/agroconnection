import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "splash",
  },
  {
    path: "/splash",
    name: "splash",
    component: () =>
      import(/* webpackChunkName: "splash" */ "../views/splash/index.vue"),
  },
  {
    path: "/step",
    name: "step",
    component: () =>
      import(/* webpackChunkName: "step" */ "../views/splash/Step.vue"),
  },
  {
    path: "/authenticated",
    name: "authenticated",
    component: () =>
      import(
        /* webpackChunkName: "authenticated" */ "../views/authenticated/index.vue"
      ),
    children: [
      {
        path: "home",
        name: "home",
        component: () =>
          import(
            /* webpackChunkName: "login" */ "../views/authenticated/Home.vue"
          ),
      },
      {
        path: "product/:id",
        name: "productDetail",
        component: () =>
          import(
            /* webpackChunkName: "productDetail" */ "../views/authenticated/product/ProductDetail.vue"
          ),
      },
    ],
  },
  {
    path: "/authentication",
    name: "authentication",
    component: () =>
      import(
        /* webpackChunkName: "authentication" */ "../views/authentication/Authentication.vue"
      ),
    children: [
      {
        path: "login",
        name: "login",
        component: () =>
          import(
            /* webpackChunkName: "login" */ "../views/authentication/Login.vue"
          ),
      },
      {
        path: "new-user",
        name: "newUser",
        component: () =>
          import(
            /* webpackChunkName: "newUser" */ "../views/authentication/NewUser.vue"
          ),
      },
      {
        path: "forget-password",
        name: "forgetPassword",
        component: () =>
          import(
            /* webpackChunkName: "forgetPassword" */ "../views/authentication/ForgetPassword.vue"
          ),
      },
    ],
  },
  // {
  //   path: "/principal",
  //   name: "home",
  //   component: Home,
  //   children: [
  //     {
  //       path: "cities",
  //       name: "cities",
  //       component: () => import("../views/cities/index.vue"),
  //     },
  //     {
  //       path: "dashboard",
  //       name: "dashboard",
  //       component: () => import("../views/dashboard/index.vue"),
  //     },
  //     {
  //       path: "processos",
  //       name: "processos",
  //       component: () => import("../views/processos/index.vue"),
  //     },
  //     {
  //       path: "mensagens",
  //       name: "mensagens",
  //       component: () => import("../views/mensagens/index.vue"),
  //     },
  //     {
  //       path: "configuracoes",
  //       name: "configuracoes",
  //       component: () => import("../views/configuracoes/index.vue"),
  //     },
  //     {
  //       path: "usuarios",
  //       name: "usuarios",
  //       component: () => import("../views/usuarios/index.vue"),
  //     },
  //   ],
  // },
  // {
  //   path: "/about",
  //   name: "about",
  //   component: () => import("../views/About.vue"),
  // },
];

const route = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
});

export default route;
