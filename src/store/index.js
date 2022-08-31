import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import Reducers from "./reducer";

export default createStore(Reducers, compose(
  applyMiddleware(thunk)
));