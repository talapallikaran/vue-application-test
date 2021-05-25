// Define constant for the token
const TOKEN_ID_NAMESPACE = "65f9af5d-f23f-4065-ac85-da725569fdcd";

const routerPaths = {
  root: "/",
  user: "/user/:token",
};
const storeActions = {
  INIT_APPLICATION: "INIT_APPLICATION",
  INIT_VALIDATION: "INIT_VALIDATION",
  RE_VALIDATE_URL: "RE_VALIDATE_URL",
  IS_LOADING: "IS_LOADING",
};

export { routerPaths, storeActions, TOKEN_ID_NAMESPACE };
