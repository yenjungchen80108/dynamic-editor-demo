import { combineReducers } from "redux";

import config from "./config/slice";
import imageUploader from "./imageUploader/slice";

const rootReducer = combineReducers({
  config,
  imageUploader,
});

export default rootReducer;
