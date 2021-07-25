import React from "react"
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    TextField,
    Button,
    Grid,
} from "@material-ui/core"
import { useFormik } from "formik"
import Paper from "@material-ui/core/Paper/Paper"
import { LoginingDataType } from "../../../main/server-api/todolists-api"
import { Redirect } from "react-router-dom"

type LoginingPropsType = {
    loginIn: (loginingData: LoginingDataType) => void
    isLoginig: boolean
}

type FormErrorType = {
    email?: string
    password?: string
}

export const Logining: React.FunctionComponent<LoginingPropsType> = (props) => {
    const { loginIn, isLoginig } = props
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
        validate: (values) => {
            const errors: FormErrorType = {}
            if (!values.email) {
                errors.email = "This field required"
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = "Invalid email address"
            }
            if (!values.password) {
                errors.password = "This field required"
            }
            return errors
        },
        onSubmit: (values) => {
            loginIn(values)
        },
    })
    if (isLoginig) return <Redirect to={"/"} />
    return (
        <Grid container direction={"column"} justify={"center"} alignItems={"center"}>
            <Grid item xs={4} style={{ marginTop: "100px" }}>
                <form onSubmit={formik.handleSubmit}>
                    <Paper style={{ padding: "10px" }} elevation={3}>
                        <FormControl>
                            <FormLabel>
                                <p>
                                    To log in get registered
                                    <a
                                        href={"https://social-network.samuraijs.com/"}
                                        target={"_blank"}
                                    >
                                        here
                                    </a>
                                </p>
                                <p>or use common test account credentials:</p>
                                <p>Email: free@samuraijs.com</p>
                                <p>Password: free</p>
                            </FormLabel>
                            <FormGroup>
                                <TextField
                                    label="Email"
                                    margin="normal"
                                    name={"email"}
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.email && formik.errors.email ? (
                                    <div style={{ color: "red" }}>{formik.errors.email}</div>
                                ) : (
                                    <></>
                                )}
                                <TextField
                                    type="password"
                                    label="Password"
                                    margin="normal"
                                    name={"password"}
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.password && formik.errors.password ? (
                                    <div style={{ color: "red" }}>{formik.errors.password}</div>
                                ) : (
                                    <></>
                                )}
                                <FormControlLabel
                                    label={"Remember me"}
                                    control={
                                        <Checkbox
                                            name={"rememberMe"}
                                            onChange={formik.handleChange}
                                        />
                                    }
                                />
                                <Button
                                    type={"submit"}
                                    variant={"contained"}
                                    color={"primary"}
                                    onClick={formik.submitForm}
                                >
                                    Login
                                </Button>
                            </FormGroup>
                        </FormControl>
                    </Paper>
                </form>
            </Grid>
        </Grid>
    )
}
