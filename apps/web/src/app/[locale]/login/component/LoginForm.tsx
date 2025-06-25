'use client';

import React, { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { LoginApiPayload, RTKError } from '@ridersafeid/types';
import { useRouter } from 'next/navigation';

import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constant';
import { saveToken } from '@/utils';

import { Button, Error, Input } from '@/components';
import { useLoginMutation } from '@/store/auth/authApi';
import { useTranslations } from 'next-intl';
import { useGenerateErrorMessage } from '@/hooks';

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginApiPayload>();

    const [login, { isLoading }] = useLoginMutation();

    const t = useTranslations();
    const generateErrorMessage = useGenerateErrorMessage();

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
                label={t('fields.email')}
                registration={register('email', {
                    required: generateErrorMessage('email'),
                })}
                isDarkPage
                error={errors.email}
            />
            <Input
                label={t('fields.password')}
                type='password'
                isDarkPage
                registration={register('password', {
                    required: generateErrorMessage('password'),
                })}
                error={errors.password}
            />
            <div className='flex justify-center items-center '>
                <Button
                    isLoading={isLoading}
                    loadingText={t('login.submitting')}
                    label={t('login.submit')}
                />
            </div>
        </form>
    );
};

export default LoginForm;
