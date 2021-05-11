import { combineReducers } from "redux";
import auth from "./authReducer";
import board from "./boardReducer";
import comment from "./commentReducer";
import profile from "./profileReducer";
import trade from "./tradeReducer";

export default combineReducers({
  auth: auth,
  board: board,
  comment: comment,
  trade: trade,
  profile: profile,
});
