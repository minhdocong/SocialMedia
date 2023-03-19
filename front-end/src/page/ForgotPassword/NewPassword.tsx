import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, IconButton, InputAdornment, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosClient from '../../api/axiosClient';
import bgLogin from '../../assets/images/bg_login.svg';
import { Input, Label, SubmitBtn } from './styled';

const NewPassword: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState<boolean>(false);

    const [isVerify, setIsVerify] = useState<boolean>(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () =>
        setShowConfirmPassword((show) => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();
    const params = useParams();

    const handleSaveNewPass = async (data: any, e: any) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axiosClient.post(
                `/users/reset-password/${params.token}`,
                {
                    password: data.password,
                }
            );
            if (res.data.status === 'success') {
                toast.success('Reset password successfully');
                navigate('/login');
            }
        } catch (error: any) {
            setLoading(false);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axiosClient.get(
                    `/users/reset-password/${params.token}`
                );
                if (res.data.status === 'verified') {
                    setIsVerify(true);
                    setLoading(false);
                }
            } catch (error: any) {
                console.log(error);
                toast.error(error.response.data.msg);
                setLoading(false);
            }
        };
        getUser();
    }, []);

    if (!isVerify && loading) return <p>Loading...</p>;

    return !isVerify && !loading ? (
        <p>Authenticated Fail</p>
    ) : (
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
                <form onSubmit={handleSubmit(handleSaveNewPass)}>
                    <Typography fontSize={39} fontWeight={600}>
                        Enter your password
                    </Typography>
                    <Label sx={{ marginTop: '20px' }}>New Password</Label>
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
                    <Label sx={{ marginTop: '20px' }}>Confirm Password</Label>
                    <Input
                        {...register('confirmPassword', {
                            validate: (val: string) => {
                                if (watch('password') != val) {
                                    return 'Your passwords do no match';
                                }
                            },
                        })}
                        error={!!errors.confirmPassword}
                        helperText={
                            errors.confirmPassword?.type === 'validate' &&
                            'Your passwords do no match'
                        }
                        fullWidth
                        type={showConfirmPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position='end'>
                                    <IconButton
                                        onClick={handleClickShowConfirmPassword}
                                        onMouseDown={handleMouseDownPassword}
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
                    <SubmitBtn
                        loading={loading}
                        loadingIndicator='Loading...'
                        type='submit'
                        variant='contained'
                    >
                        Confirm
                    </SubmitBtn>
                </form>
            </Box>
        </Box>
    );
};

export default NewPassword;