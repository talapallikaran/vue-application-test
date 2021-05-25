import { routerPaths, storeActions } from "../../constants";
import router from "../../router";

const getters = {
  isAppInitialized: (state: any) => {
    return state.isAppInitialized;
  },
  message: (state: any) => {
    return state.message;
  },
  isLoading: (state: any) => {
    return state.isLoading;
  },
};

const actions = {
  initApplication({ commit }: any, payload: any) {
    if (!localStorage.getItem("user-token")) {
      // Store token if not existed
      localStorage.setItem("user-token", payload);
      commit(storeActions.INIT_APPLICATION, payload);
    }
  },
  reValidateUrl({ commit }: any) {
    const token: any = localStorage.getItem("user-token");
    const userVisit: any = localStorage.getItem("user-try");
    let message;
    if (!token) {
      // If the link opens on other browsers, consider it invalid
      message = "You are not on the same device.";
      commit(storeActions.RE_VALIDATE_URL, message);
    } else {
      if (!userVisit) {
        // Set user tries to one so that application can calculate user has met the link only once
        localStorage.setItem("user-try", "1");
        message = "Welcome aboard.";
        commit(storeActions.RE_VALIDATE_URL, message);
      }
      if (parseInt(userVisit) === 1) {
        // Using code from the token itself
        // *******************
        // *******************
        commit(storeActions.IS_LOADING, true);
        const validationCode = token.split("-").pop();
        if (!localStorage.getItem("validation-code")) {
          message =
            "You have accessed this URL multiple time. Refresh to validate the authentication.";
          commit(storeActions.RE_VALIDATE_URL, message);
          localStorage.setItem("validation-code", validationCode);
          router.push({
            name: "User",
            params: { token },
            query: { validationCode },
          });
        } else {
          // Once validation code confirms, remove it from the storage
          // *******************
          // *******************
          // localStorage.removeItem("validation-code");
          commit(storeActions.IS_LOADING, true);
          message =
            "Validation code confirmed, redirecting to the user page again.";
          commit(storeActions.RE_VALIDATE_URL, message);
          setTimeout(() => {
            router.push({
              name: "User",
              params: { token },
            });
            // Will always redirect to user/home page
            // *******************
            // *******************
            message = "Welcome aboard!";
            commit(storeActions.RE_VALIDATE_URL, message);
            commit(storeActions.IS_LOADING, false);
          }, 2000);
        }
      } else {
        // Will always redirect to user/home page
        // *******************
        // *******************
        message = "Welcome aboard.";
        commit(storeActions.RE_VALIDATE_URL, message);
      }
    }
  },
  isLoadingIndicator({ commit }: any, payload: any) {
    commit(storeActions.IS_LOADING, payload);
  },
};

const mutations = {
  [storeActions.INIT_APPLICATION](state: any, payload: any) {
    state.isAppInitialized = payload;
  },
  [storeActions.RE_VALIDATE_URL](state: any, payload: any) {
    state.message = payload;
  },
  [storeActions.IS_LOADING](state: any, payload: any) {
    state.isLoading = payload;
  },
};

const state = {
  isAppInitialized: false,
  isLoading: false,
  message: "",
};

export default {
  state,
  getters,
  actions,
  mutations,
};
