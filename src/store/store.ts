import { todosApi } from '../service/TodosService';
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    [todosApi.reducerPath]: todosApi.reducer
})

export const setupStore = ( ) => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todosApi.middleware)
    })
}


export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof  setupStore>
export type AppDispatch = AppStore['dispatch']
