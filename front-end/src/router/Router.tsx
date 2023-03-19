import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../layout/layout';
import EmailAuthen from '../page/ForgotPassword/EmailAuthen';
import NewPassword from '../page/ForgotPassword/NewPassword';
import Home from '../page/Home/Homepage';
import Login from '../page/Login/LoginPage';
import ProtectedRoute from './ProtectedRoute';

const Router: React.FC = () => {
    return (
        <Routes>
            <Route
                path='/'
                element={
                    <ProtectedRoute>
                        <Layout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<Home />} />
            </Route>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Login />} />
            <Route path='/email-authen' element={<EmailAuthen />} />
            <Route path='/new-pass/:token' element={<NewPassword />} />
        </Routes>
    );
};

export default Router;