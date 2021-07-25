import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { LoginingDataType } from "../../../api/todolists-api"
import { getAppState } from "../../../selectors"
import { logining } from "../../../state/app-reducer"
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
