import { combineReducers } from "redux";
import auth from "./authReducer";
import board from "./boardReducer";

export default combineReducers({
  auth: auth,
  board: board,
});
