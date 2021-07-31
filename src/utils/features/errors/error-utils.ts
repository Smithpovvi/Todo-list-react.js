import { Dispatch } from "redux";
import { ResponseType } from "../../../main/server-api/todolists-api";
import {
    changeLoadingStatus,
    ChangeLoadingStatusType,
    setAppError,
    SetAppErrorType,
} from "../../../main/bll/reducers/app-reducer";

export const handleServerAppError = <T>(
    data: ResponseType<T>,
    dispatch: ErrorUtilsDispatchType
) => {
    if (data.messages.length) {
        dispatch(setAppError(data.messages[0]));
    } else {
        dispatch(setAppError("Some error occurred"));
    }
    dispatch(changeLoadingStatus("succeeded"));
};

export const handleServerNetworkError = (
    error: { message: string },
    dispatch: ErrorUtilsDispatchType
) => {
    dispatch(setAppError(error.message));
    dispatch(changeLoadingStatus("failed"));
};

type ErrorUtilsDispatchType = Dispatch<SetAppErrorType | ChangeLoadingStatusType>;
