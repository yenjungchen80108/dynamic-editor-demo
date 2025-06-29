import { combineReducers } from "redux";

import config from "./config/slice";

const rootReducer = combineReducers({
  config,
});

export default rootReducer;
