import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    Box,
    Checkbox,
    IconButton,
    InputAdornment,
    Stack,
    Typography,
} from '@mui/material';
import { unwrapResult } from '@reduxjs/toolkit';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import bgLogin from '../../assets/images/bg_login.svg';
import { loginUser, registerUser } from '../../redux/reducers/authSlice';
import { AppDispatch } from '../../redux/store';
import { signup } from '../../services/auth';
import { CustomButton, Input, Label, SubmitBtn } from './styled';

export interface LoginState {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const [isSignUp, setIsSignUp] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [acceptTerms, setAcceptTerms] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const location = useLocation();
    useEffect(() => {
        setIsSignUp(location.pathname === '/signup' ? true : false);
    }, [location]);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () =>
        setShowConfirmPassword((show) => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    const handleLogin = async (data: any) => {
        setLoading(true);
        try {
            const resultAction = await dispatch(
                loginUser({ email: data.email, password: data.password })
            );
            const user = unwrapResult(resultAction);
            if (user) {
                toast.success('Login successfully');
                setLoading(false);
                navigate('/');
            }
        } catch (error: any) {
            setLoading(false);
            toast.error(error.message);
        }
    };

    const handleSignUp = async (data: any) => {
        setLoading(true);
        try {
            const resultAction = await dispatch(
                registerUser({ email: data.email, password: data.password })
            );
            const user = unwrapResult(resultAction);
            if (user) {
                toast.success('Signup successfully');
                navigate('/');
                setLoading(false);
            }
        } catch (error: any) {
            setLoading(false);
            toast.error(error.message);
        }
    };

    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundImage: `url(${bgLogin})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                position: 'relative',
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    right: '10%',
                    transform: 'translateY(-50%)',
                    width: '600px',
                    bgcolor: '#fff',
                    borderRadius: '30px',
                    boxShadow: '0px 8px 50px rgba(150, 140, 169, 0.1)',
                    padding: '77px 74px',
                }}
            >
                <form
                    onSubmit={
                        isSignUp
                            ? handleSubmit(handleSignUp)
                            : handleSubmit(handleLogin)
                    }
                >
                    <Typography fontSize={39} fontWeight={600}>
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </Typography>
                    <Typography sx={{ marginBottom: '20px' }}>
                        {isSignUp
                            ? 'Have an account?'
                            : "Don't have an account?"}
                        <CustomButton
                            onClick={() => {
                                reset();
                                setIsSignUp((prev) => !prev);
                                !isSignUp
                                    ? navigate('/signup')
                                    : navigate('/login');
                            }}
                        >
                            {isSignUp ? 'Sign In' : 'Sign Up'}
                        </CustomButton>
                    </Typography>

                    <Label>Email Address</Label>
                    <Input
                        {...register('email', {
                            required: true,
                            pattern:
                                /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i,
                        })}
                        error={!!errors.email}
                        helperText={
                            (errors.email?.type === 'required' &&
                                'Email is required') ||
                            (errors.email?.type === 'pattern' &&
                                'Email is invalid')
                        }
                        fullWidth
                    />
                    <Label sx={{ marginTop: '20px' }}>Password</Label>
                    <Input
                        {...register('password', {
                            required: true,
                            minLength: 6,
                        })}
                        error={!!errors.password}
                        helperText={
                            (errors.password?.type === 'required' &&
                                'Password is required') ||
                            (errors.password?.type === 'minLength' &&
                                'Password must be at least 6 characters')
                        }
                        fullWidth
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {showPassword ? (
                                            <Visibility />
                                        ) : (
                                            <VisibilityOff />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    {isSignUp && (
                        <>
                            <Label sx={{ marginTop: '20px' }}>
                                Confirm Password
                            </Label>
                            <Input
                                {...register('confirmPassword', {
                                    required: true,
                                    minLength: 6,
                                    validate: (val: string) => {
                                        if (watch('password') != val) {
                                            return 'Your passwords do no match';
                                        }
                                    },
                                })}
                                error={!!errors.confirmPassword}
                                helperText={
                                    errors.confirmPassword?.type ===
                                        'validate' &&
                                    'Your passwords do no match'
                                }
                                fullWidth
                                type={showConfirmPassword ? 'text' : 'password'}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <IconButton
                                                onClick={
                                                    handleClickShowConfirmPassword
                                                }
                                                onMouseDown={
                                                    handleMouseDownPassword
                                                }
                                            >
                                                {showConfirmPassword ? (
                                                    <Visibility />
                                                ) : (
                                                    <VisibilityOff />
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </>
                    )}
                    {isSignUp && (
                        <Stack ml='-9px' direction='row' alignItems='center'>
                            <Checkbox
                                checked={acceptTerms}
                                onChange={(e) =>
                                    setAcceptTerms(e.target.checked)
                                }
                                size='small'
                                sx={{
                                    color: '#9854df',
                                    '&.Mui-checked': {
                                        color: '#b772ff',
                                    },
                                }}
                            />
                            <Typography
                                sx={{
                                    display: 'inline-block',
                                    fontSize: '13px',
                                }}
                            >
                                I accept the{' '}
                                <CustomButton
                                    href='#'
                                    sx={{ display: 'inline-block' }}
                                >
                                    Terms & Conditions.
                                </CustomButton>
                            </Typography>
                        </Stack>
                    )}

                    <SubmitBtn
                        loading={loading}
                        loadingIndicator='Loading...'
                        type='submit'
                        variant='contained'
                    >
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </SubmitBtn>
                    {!isSignUp && (
                        <CustomButton
                            sx={{
                                marginTop: '20px',
                            }}
                            onClick={() => navigate('/email-authen')}
                        >
                            Forgot your password?
                        </CustomButton>
                    )}
                </form>
            </Box>
        </Box>
    );
};

export default Login;

