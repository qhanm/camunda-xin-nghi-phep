import {applyMiddleware, combineReducers, createStore} from 'redux';
import TaskReducer from "./reducers/TaskReducer";
import {CamundaReducer} from "./reducers/CamundaReducer";


const rootReducer = combineReducers({
    TaskReducer,
    CamundaReducer,
}, )

export default rootReducer;