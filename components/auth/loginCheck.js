import store from "../../redux/store";
import { LOADING_REQUEST } from "../../redux/types";

const loadingUser = async () => {
  try {
    if (localStorage.getItem("jwt")) {
      await store.dispatch({
        type: LOADING_REQUEST,
        payload: localStorage.getItem("jwt"),
      });
    } else {
      store.dispatch({
        type: LOADING_REQUEST,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

export default loadingUser;
