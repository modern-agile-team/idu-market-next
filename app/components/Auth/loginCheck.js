import store from "../../redux/store";
import { LOGIN_CHECK_REQUEST } from "../../redux/types";

const loadingUser = async () => {
  try {
    if (localStorage.getItem("jwt")) {
      await store.dispatch({
        type: LOGIN_CHECK_REQUEST,
        payload: localStorage.getItem("jwt"),
      });
    } else {
      store.dispatch({
        type: LOGIN_CHECK_REQUEST,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

export default loadingUser;
