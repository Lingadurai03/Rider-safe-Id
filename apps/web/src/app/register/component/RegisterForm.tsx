'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { RegisterApiPayload, RTKError } from '@ridersafeid/types';
import { useRouter } from 'next/navigation';

import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constant';
import { saveToken } from '@/utils';

import { Button, Error, Input } from '@/components';
import { useRegisterMutation } from '@/store/auth/authApi';

interface RegisterData extends RegisterApiPayload {
    confirmPassword: string;
}

const RegisterForm = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<RegisterData>();

    const passwordInputText = watch('password');

    const [registerFn, { isLoading }] = useRegisterMutation();

    const navigate = useRouter();

    const onSubmit = async (data: RegisterApiPayload) => {
        try {
            const userData = await registerFn(data).unwrap();
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
                type='email'
                error={errors.email}
                isDarkPage
            />
            <Input
                label='FullName'
                registration={register('fullName', {
                    required: 'Full Name is required',
                })}
                error={errors.fullName}
                isDarkPage
            />
            <Input
                label='Phone Number'
                registration={register('phone', {
                    required: 'Phone Number is required',
                })}
                error={errors.phone}
                isDarkPage
            />
            <Input
                label='Password'
                type='password'
                registration={register('password', {
                    required: 'Password is required',
                })}
                error={errors.password}
                isDarkPage
            />
            <Input
                label='Confirm Password'
                type='password'
                registration={register('confirmPassword', {
                    required: 'Confirm Password is required',
                    validate: (value) =>
                        value === passwordInputText || 'Passwords do not match',
                })}
                error={errors.confirmPassword}
                isDarkPage
            />
            <div className='flex justify-center items-center '>
                <Button
                    isLoading={isLoading}
                    loadingText='Submiting'
                    glow
                    type='submit'
                    label='Submit'
                />
            </div>
        </form>
    );
};

export default RegisterForm;
