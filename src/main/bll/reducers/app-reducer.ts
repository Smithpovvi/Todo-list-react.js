import { Dispatch } from "redux";
import { handleServerNetworkError } from "../../../utils/features/errors/error-utils";
import { LoginingDataType, todolistsAPI } from "../../server-api/todolists-api";
export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";
export type appReducerStateType = typeof initialState;
export type AppActionType =
    | ChangeLoadingStatusType
    | SetAppErrorType
    | ResetErrorType
    | SetUserDataType
    | IsLoginingChangeType
    | OnInitializedType;
export type ChangeLoadingStatusType = ReturnType<typeof changeLoadingStatus>;
export type SetAppErrorType = ReturnType<typeof setAppError>;
export type ResetErrorType = ReturnType<typeof resetError>;
export type SetUserDataType = ReturnType<typeof setUserData>;
export type IsLoginingChangeType = ReturnType<typeof isLoginingChange>;
export type OnInitializedType = ReturnType<typeof onInitalized>;

const initialState = {
    status: "loading" as RequestStatusType,
    error: null as string | null,
    isLogining: false,
    isInitialized: false,
    auth: {
        userId: 0,
        email: "",
        login: "",
    },
};

export const appReducer = (
    state: appReducerStateType = initialState,
    action: AppActionType
): appReducerStateType => {
    switch (action.type) {
        case "APP/SET-STATUS":
            return { ...state, status: action.status };
        case "APP/SET-ERROR":
            return { ...state, error: action.error };
        case "APP/RESET-ERROR":
            return { ...state, error: null };
        case "APP/LOGINING":
            state.auth = action.userData;
            return { ...state };
        case "APP/IS-LOGINING":
            return { ...state, isLogining: action.logVal };
        case "APP/INITIALIZED":
            return { ...state, isInitialized: action.initVal };
        default:
            return state;
    }
};

export const changeLoadingStatus = (status: RequestStatusType) =>
    ({ type: "APP/SET-STATUS", status } as const);
export const setAppError = (error: string) => ({ type: "APP/SET-ERROR", error } as const);
export const resetError = () => ({ type: "APP/RESET-ERROR" } as const);
export const setUserData = (userData: { userId: number; email: string; login: string }) =>
    ({ type: "APP/LOGINING", userData } as const);
export const isLoginingChange = (logVal: boolean) => ({ type: "APP/IS-LOGINING", logVal } as const);
export const onInitalized = (initVal: boolean) => ({ type: "APP/INITIALIZED", initVal } as const);

export const logining = (loginingData: LoginingDataType) => {
    return async (dispatch: Dispatch) => {
        dispatch(changeLoadingStatus("loading"));
        try {
            const { resultCode, data, messages } = await (
                await todolistsAPI.loginIn(loginingData)
            ).data;
            const userId = data.userId;
            if (resultCode === 0) {
                dispatch(setUserData({ userId, email: "", login: "" }));
                dispatch(isLoginingChange(true));
            } else {
                dispatch(setAppError(messages[0]));
            }
        } catch (error) {
            handleServerNetworkError(error, dispatch);
        } finally {
            dispatch(changeLoadingStatus("succeeded"));
        }
    };
};
export const authMe = () => {
    return async (dispatch: Dispatch) => {
        dispatch(changeLoadingStatus("loading"));
        try {
            const response = await (await todolistsAPI.authMe()).data;
            if (response.resultCode === 0) {
                dispatch(setUserData(response.data));
                dispatch(isLoginingChange(true));
            } else {
                dispatch(isLoginingChange(false));
            }
        } catch (error) {
            handleServerNetworkError(error, dispatch);
        } finally {
            dispatch(changeLoadingStatus("succeeded"));
        }
    };
};
export const logout = () => {
    return async (dispatch: Dispatch) => {
        dispatch(changeLoadingStatus("loading"));
        try {
            const response = await (await todolistsAPI.logout()).data;
            if (response.resultCode === 0) {
                dispatch(setUserData({ email: "", login: "", userId: 0 }));
                dispatch(isLoginingChange(false));
            }
        } catch (error) {
            handleServerNetworkError(error, dispatch);
        } finally {
            dispatch(changeLoadingStatus("succeeded"));
        }
    };
};

export const initialized = () => {
    return async (dispatch: any) => {
        dispatch(changeLoadingStatus("loading"));
        try {
            await dispatch(authMe());
            dispatch(onInitalized(true));
        } catch (error) {
            handleServerNetworkError(error, dispatch);
        } finally {
            dispatch(changeLoadingStatus("succeeded"));
        }
    };
};
