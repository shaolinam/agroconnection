import { computed, reactive } from "vue";
import { defineStore } from "pinia";
// import { MenuPrincipal } from "@/db/mocks/MenuPrincipal";
// import type { IMenuPrincipal, ItemMenu } from "@/db/mocks/IMenuPrincipal";

export interface INotificationParams {
  titulo: string;
  subTitulo: string;
  sucesso: boolean;
  espera: number;
}

export const geralStore = defineStore("geral", () => {
  // STATE
  const data: any = reactive({
    loading: false,
    showModal: false,
    showModalExcluir: false,
    showMenuSider: false,
    // menuPrincipal: MenuPrincipal,
    notificationParams: {
      titulo: "",
      subTitulo: "",
      sucesso: false,
      espera: 0,
    },
    selectedMenu: null,
  });

  // ACTIONS

  const setLoading = (value: boolean) => {
    data.loading = value;
  };

  const getLoading = computed(() => {
    return data.loading;
  });
  const getShowMenuSider = () => {
    return data.showMenuSider;
  };
  const setShowMenuSider = (value: boolean) => {
    return (data.showMenuSider = value);
  };
  const toggleShowMenuSider = () => {
    return (data.showMenuSider = !data.showMenuSider);
  };
  const abrirModalExcluir = async (): Promise<void> => {
    return new Promise(() => {
      data.showModalExcluir = true;
    });
  };

  const abrirModal = async (): Promise<void> => {
    return new Promise(() => {
      data.showModal = true;
    });
  };

  const fecharModalExcluir = async (): Promise<void> => {
    return new Promise(() => {
      data.showModalExcluir = false;
    });
  };

  const fecharModal = async (): Promise<void> => {
    return new Promise(() => {
      data.showModal = false;
    });
  };

  // GETTERS

  const exibirModal = computed(() => data.showModal);
  const exibirModalExcluir = computed(() => data.showModalExcluir);

  // const setSelectedMenu = async (
  //   item: IMenuPrincipal | ItemMenu | null
  // ): Promise<void> => {
  //   return new Promise(() => {
  //     if (!item) {
  //       const currentUrl = window.location.pathname;
  //       if (currentUrl.indexOf("home") >= 0) {
  //         data.selectedMenu = MenuPrincipal[0];
  //       } else {
  //         const pathLocalStore = window.localStorage.getItem("selectedMenu");
  //         if (pathLocalStore) {
  //           const pls = JSON.parse(pathLocalStore);
  //           data.selectedMenu = pls;
  //         }
  //       }
  //     } else {
  //       data.selectedMenu = item;
  //     }
  //     localStorage.setItem("selectedMenu", JSON.stringify(data.selectedMenu));
  //   });
  // };

  const getSelectedMenu = computed(() => {
    const selectedMenu = localStorage.getItem("selectedMenu");
    if (selectedMenu) {
      data.selectedMenu = JSON.parse(selectedMenu);
    }
    return data.selectedMenu;
  });

  const getUrlMainModules = () => {
    const ambiente = import.meta.env.VITE_BASE_NODE_ENV;
    let url = "/";
    switch (ambiente) {
      case "development":
        url = "http://cetam-sadm.desenvolvimento.am.gov.br/";
        break;
      case "staging":
        url = "http://cetam-sadm.homologacao.am.gov.br/";
        break;
      default:
        url = "https://sadm.cetam.am.gov.br/";
        break;
    }
    return url;
  };

  // const getShowMenu = () => {
  //   if (!getSelectedMenu.value || getSelectedMenu.value.id == 1) {
  //     return data.menuPrincipal.slice(1);
  //   } else {
  //     return data.menuPrincipal.filter((m: IMenuPrincipal | ItemMenu) => {
  //       if (getSelectedMenu.value?.id > 10) {
  //         return m.id == Math.trunc(getSelectedMenu.value?.id / 10);
  //       } else if (getSelectedMenu.value?.id > 1) {
  //         return m.id == Math.trunc(getSelectedMenu.value?.id);
  //       } else return m;
  //     });
  //   }
  // };

  // const toggleExpandMenu = (item: IMenuPrincipal) => {
  //   data.menuPrincipal.map((m: IMenuPrincipal | ItemMenu) => {
  //     if (m.id == item.id) m.expanded = !m.expanded;
  //   });
  // };

  // const setToggleExpandMenu = (item: IMenuPrincipal, value: boolean) => {
  //   data.menuPrincipal.map((m: IMenuPrincipal | ItemMenu) => {
  //     if (m.id == item.id) m.expanded = value;
  //   });
  // };

  // const closeAllToggleExpandMenu = () => {
  //   data.menuPrincipal.map((m: IMenuPrincipal | ItemMenu) => {
  //     m.expanded = false;
  //   });
  // };

  const setShowNotification = (value: boolean): Promise<void> => {
    return new Promise((resolve) => {
      data.showNotification = value;
      resolve();
    });
  };

  const getShowNotification = () => {
    return data.showNotification;
  };

  const getNotificationParams = (): INotificationParams =>
    data.notificationParams;

  const setNotificationParams = (
    params: INotificationParams
  ): Promise<void> => {
    return new Promise((resolve) => {
      data.notificationParams.titulo = params.titulo;
      data.notificationParams.subTitulo = params.subTitulo;
      data.notificationParams.sucesso = params.sucesso;
      data.notificationParams.espera = params.espera;
      resolve();
    });
  };

  return {
    setLoading,
    getLoading,
    getShowMenuSider,
    setShowMenuSider,
    toggleShowMenuSider,
    // setToggleExpandMenu,
    // closeAllToggleExpandMenu,
    // setSelectedMenu,
    abrirModal,
    fecharModal,
    abrirModalExcluir,
    fecharModalExcluir,
    exibirModal,
    exibirModalExcluir,
    getSelectedMenu,
    getUrlMainModules,
    // getShowMenu,
    // toggleExpandMenu,
    setShowNotification,
    getShowNotification,
    setNotificationParams,
    getNotificationParams,
  };
});
