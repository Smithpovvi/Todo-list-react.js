import { tasksReducer } from "./reducers/tasks-reducer";
import { todolistsReducer } from "./reducers/todolists-reducer";
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { appReducer } from "./reducers/app-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type AppRootStateType = ReturnType<typeof rootReducer>;

// @ts-ignore
window.store = store;
