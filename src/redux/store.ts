import { configureStore } from "@reduxjs/toolkit"
import { UserInfo } from "../models/user.models"
import { userSlice } from "./states/user"
import { apiSlice } from "../api/api.slice";
import { openFormsSlice } from "./states/openForms";

export interface AppStore {
    user: UserInfo
}

const store = configureStore<AppStore>({
    reducer : {
        user : userSlice.reducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        openForms : openFormsSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
