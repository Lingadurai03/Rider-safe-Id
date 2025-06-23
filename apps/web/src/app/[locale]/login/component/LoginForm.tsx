'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { LoginApiPayload, RTKError } from '@ridersafeid/types';
import { useRouter } from 'next/navigation';

import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constant';
import { saveToken } from '@/utils';

import { Button, Error, Input } from '@/components';
import { useLoginMutation } from '@/store/auth/authApi';

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginApiPayload>();

    const [login, { isLoading }] = useLoginMutation();

    const navigate = useRouter();

    const onSubmit = async (data: LoginApiPayload) => {
        try {
            const userData = await login(data).unwrap();
            saveToken(ACCESS_TOKEN, userData.accessToken);
            saveToken(REFRESH_TOKEN, userData.refreshToken);
            navigate.push('/');
        } catch (err) {
            const error = err as RTKError;
            toast.error(
                <Error
                    title={error.data?.error}
                    message={error.data?.message}
                />,
            );
        }
    };
    return (
        <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
            <Input
                label='Email'
                registration={register('email', {
                    required: 'Email is required',
                })}
                isDarkPage
                error={errors.email}
            />
            <Input
                label='Password'
                type='password'
                isDarkPage
                registration={register('password', {
                    required: 'Password is required',
                })}
                error={errors.password}
            />
            <div className='flex justify-center items-center '>
                <Button
                    isLoading={isLoading}
                    loadingText='Submiting'
                    label='Submit'
                />
            </div>
        </form>
    );
};

export default LoginForm;
