import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { initialized, logout } from "../../bll/reducers/app-reducer"
import { getAppState } from "../../../utils/selectors/selectors"
import InterfaceApp from "./InterfaceApp/InterfaceApp"

const App: React.FunctionComponent = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initialized())
    }, [])

    const { status, isInitialized, isLogining } = useSelector(getAppState)

    const logoutMe = () => {
        dispatch(logout())
    }

    return (
        <InterfaceApp
            isInitialized={isInitialized}
            isLogining={isLogining}
            logoutMe={logoutMe}
            status={status}
        />
    )
}

export default App
