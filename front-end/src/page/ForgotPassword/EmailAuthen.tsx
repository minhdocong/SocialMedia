import { Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosClient from '../../api/axiosClient';
import bgLogin from '../../assets/images/bg_login.svg';
import { CustomButton, Input, SubmitBtn } from './styled'

const EmailAuthen: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const handleSendEmail = async (data: any) => {
        setLoading(true);
        try {
            await axiosClient.post('/users/forgot', { email: data.email });
            toast.success('Please check your email', { autoClose: 10000 });
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
                <form onSubmit={handleSubmit(handleSendEmail)}>
                    <Typography fontSize={39} fontWeight={600}>
                        Forget password
                    </Typography>
                    <Typography sx={{ marginBottom: '20px' }}>
                        Enter your email
                    </Typography>
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

                    <SubmitBtn
                        loading={loading}
                        loadingIndicator='Loading...'
                        type='submit'
                        variant='contained'
                    >
                        Send
                    </SubmitBtn>
                    <CustomButton
                        onClick={() => {
                            reset();
                            navigate('/login');
                        }}
                        sx={{ marginTop: '20px' }}
                    >
                        Back to Login
                    </CustomButton>
                </form>
            </Box>
        </Box>
    );
};

export default EmailAuthen;