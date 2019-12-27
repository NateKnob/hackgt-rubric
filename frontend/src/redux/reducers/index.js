import { combineReducers } from "redux";
import authReducer from "./authReducer";
import coreReducer from "./coreReducer";
// import todos from "./todos";

export default combineReducers({auth: authReducer, core: coreReducer});
