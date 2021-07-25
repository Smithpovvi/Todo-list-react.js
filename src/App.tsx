import React, { useEffect } from "react"
import { Redirect, Route, Switch } from "react-router-dom"
import TodoListsContainer from "./utils/features/todolist/TodoListsContainer"
import { useDispatch, useSelector } from "react-redux"
import { initialized, logout } from "./state/app-reducer"
import { ErrorSnackbar } from "./ErrorSnackbar"
import AppBar from "@material-ui/core/AppBar/AppBar"
import Toolbar from "@material-ui/core/Toolbar/Toolbar"
import IconButton from "@material-ui/core/IconButton/IconButton"
import { Menu } from "@material-ui/icons"
import Button from "@material-ui/core/Button/Button"
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress"
import Container from "@material-ui/core/Container/Container"
import LoginingContainer from "./utils/features/logining/LoginingContainer"
import { getAppState } from "./selectors"

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
        <div>
            <ErrorSnackbar />
            <AppBar position="static">
                <Toolbar variant={"dense"} style={{ backgroundColor: "#00418c" }}>
                    {isLogining && (
                        <>
                            <IconButton edge="start" color="secondary" aria-label="menu">
                                <Menu />
                            </IconButton>

                            <Button color="inherit" onClick={logoutMe}>
                                Logout
                            </Button>
                        </>
                    )}
                </Toolbar>
                {status === "loading" && <LinearProgress color={"secondary"} />}
            </AppBar>
            <Container fixed>
                {!isInitialized ? (
                    <div></div>
                ) : (
                    <Switch>
                        <Route exact path="/" render={() => <TodoListsContainer />} />
                        <Route path="/logining" render={() => <LoginingContainer />} />
                        <Route path={"/404"} render={() => <h1>404: PAGE NOT FOUND</h1>} />
                        <Redirect from={"*"} to={"/404"} />
                    </Switch>
                )}
            </Container>
        </div>
    )
}

export default App
