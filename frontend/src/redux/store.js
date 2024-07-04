import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { dataReducer } from "./reducers/dataReducer";
import { DomUpdate } from "./reducers/DomUpdate";
import {thunk} from 'redux-thunk'

const rootReducer = combineReducers({
    data:dataReducer,
    DomUpdate:DomUpdate,

})


const store = legacy_createStore(rootReducer,applyMiddleware(thunk));

export default store;