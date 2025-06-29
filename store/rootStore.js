import { createWrapper } from "next-redux-wrapper";
import { configureStore } from "@reduxjs/toolkit";

import eventsReducer from "./events";

const makeStore = () => {
  const store = configureStore({
    reducer: {
      events: eventsReducer,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
  });

  return store;
};

export const wrapper = createWrapper(makeStore, { debug: false });
