import { applyMiddleware, legacy_createStore as createStore } from "redux";
import logger from "redux-logger";
import persistStore from "redux-persist/es/persistStore";
import rootReducer from "./rootReducer";

const middlewares=[logger]
export const store=createStore(rootReducer,applyMiddleware(...middlewares))
export const persistor=persistStore(store)
export default {store,persistor}