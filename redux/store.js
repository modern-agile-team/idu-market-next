import { createStore, compose, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";

import rootReducer from "./reducers";
import rootSaga from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const initialState = {};
const middleware = [sagaMiddleware];

const enhancer =
  process.env.NODE_ENV === "production"
    ? compose(applyMiddleware(...middleware))
    : composeWithDevTools(applyMiddleware(...middleware));

const store = createStore(rootReducer, initialState, enhancer);

store.sagaTask = sagaMiddleware.run(rootSaga);

export default store;
