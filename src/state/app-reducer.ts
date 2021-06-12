export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
export type appReducerStateType = typeof initialState
export type ActionType = ChangeLoadingStatusType | SetAppErrorType | ResetErrorType
export type ChangeLoadingStatusType = ReturnType<typeof changeLoadingStatus>
export type SetAppErrorType = ReturnType<typeof setAppError>
export type ResetErrorType = ReturnType<typeof resetError>

const initialState = {
    status: "succeeded" as RequestStatusType,
    error: null as string | null,
}

export const appReducer = (state: appReducerStateType = initialState, action: ActionType): appReducerStateType => {
    switch (action.type) {
        case "APP/SET-STATUS":
            return { ...state, status: action.status }
        case "APP/SET-ERROR":
            return { ...state, error: action.error }
        case "APP/RESET-ERROR":
            return { ...state, error: null }
        default:
            return state
    }
}

export const changeLoadingStatus = (status: RequestStatusType) => ({ type: "APP/SET-STATUS", status } as const)
export const setAppError = (error: string) => ({ type: "APP/SET-ERROR", error } as const)
export const resetError = () => ({ type: "APP/RESET-ERROR" } as const)
