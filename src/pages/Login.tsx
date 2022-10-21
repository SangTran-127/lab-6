import React, { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from '../hooks';
import { useNavigate } from 'react-router-dom';
import { useFormik, FormikProps } from 'formik';

import * as Yup from 'yup'
import { errorHelper } from '../utils/tool';
import { login } from '../store/slice/user.slice';

const theme = createTheme();


interface FormikLogin {
    email: string;
    password: string;
}

export default function Login() {
    const { auth } = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()

    const formik: FormikProps<FormikLogin> = useFormik<FormikLogin>({
        initialValues: {
            email: "sang@gmail.com",
            password: "12072002"
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().required('This field is required'),
            password: Yup.string().required('This field is required').min(6).max(255)
        }),
        onSubmit: (values) => {
            const { email, password } = values
            dispatch(login({ email, password }))
        }
    })




    const nav = useNavigate()

    useEffect(() => {
        if (auth) {
            nav('/');
        }
    }, [auth, nav]);
    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box >
                        <form onSubmit={formik.handleSubmit}>
                            <TextField
                                margin="normal"
                                fullWidth
                                id="email"
                                label="Email Address"
                                autoComplete="email"
                                autoFocus
                                {...formik.getFieldProps('email')}
                                {...errorHelper(formik, 'email')}
                            />
                            <TextField
                                margin="normal"
                                fullWidth
                                label="Password"
                                type="password"
                                id="password"
                                {...formik.getFieldProps('password')}
                                {...errorHelper(formik, 'password')}
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Button>
                        </form>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>

            </Container>
        </ThemeProvider>
    );
}