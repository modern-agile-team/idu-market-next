import { combineReducers } from "redux";
import auth from "./authReducer";
import board from "./boardReducer";
import comment from "./commentReducer";

export default combineReducers({
  auth: auth,
  board: board,
  comment: comment,
});
