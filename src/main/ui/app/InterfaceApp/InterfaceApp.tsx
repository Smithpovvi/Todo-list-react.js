import AppBar from "@material-ui/core/AppBar/AppBar"
import Button from "@material-ui/core/Button/Button"
import Container from "@material-ui/core/Container/Container"
import IconButton from "@material-ui/core/IconButton/IconButton"
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress"
import Toolbar from "@material-ui/core/Toolbar/Toolbar"
import { Menu } from "@material-ui/icons"
import React from "react"
import { Redirect, Route, Switch } from "react-router-dom"
import { ErrorSnackbar } from "../../../../utils/features/errors/errorSnackBar/ErrorSnackbar"
import LoginingContainer from "../../../../utils/features/logining/LoginingContainer"
import TodolistsContainer from "../../../../utils/features/todolists/todolistsPage/TodolistsPageContainer"

type InterfaceAppPropsType = {
    isLogining: boolean
    isInitialized: boolean
    status: "idle" | "loading" | "succeeded" | "failed"
    logoutMe: () => void
}

const InterfaceApp: React.FunctionComponent<InterfaceAppPropsType> = (props) => {
    const { isLogining, logoutMe, isInitialized, status } = props
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
                        <Route exact path="/" render={() => <TodolistsContainer />} />
                        <Route path="/logining" render={() => <LoginingContainer />} />
                        <Route path={"/404"} render={() => <h1>404: PAGE NOT FOUND</h1>} />
                        <Redirect from={"*"} to={"/404"} />
                    </Switch>
                )}
            </Container>
        </div>
    )
}

export default InterfaceApp
