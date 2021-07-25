import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { LoginingDataType } from "../../../main/server-api/todolists-api"
import { getAppState } from "../../selectors/selectors"
import { logining } from "../../../main/bll/reducers/app-reducer"
import { Logining } from "./Logining"

const LoginingContainer: React.FunctionComponent = () => {
    const dispatch = useDispatch()
    const { isLogining } = useSelector(getAppState)

    const loginIn = (loginingData: LoginingDataType) => {
        dispatch(logining(loginingData))
    }

    return <Logining loginIn={loginIn} isLoginig={isLogining} />
}

export default LoginingContainer
