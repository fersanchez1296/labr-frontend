import { configureStore } from "@reduxjs/toolkit"
import { UserInfo } from "../models/user.models"
import { userSlice } from "./states/user"
import { apiSlice } from "../api/api.slice";

export interface AppStore {
    user: UserInfo
}

const store = configureStore<AppStore>({
    reducer : {
        user : userSlice.reducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
