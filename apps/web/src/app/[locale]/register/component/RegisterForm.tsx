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
import { useTranslations } from 'next-intl';
import { useGenerateErrorMessage } from '@/hooks';

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

    const t = useTranslations();
    const generateErrorMessage = useGenerateErrorMessage();

    const onSubmit = async (data: RegisterApiPayload) => {
        const { email, password, fullName, phone } = data;

        const userData: RegisterApiPayload = {
            email,
            password,
            fullName,
            ...(phone ? { phone } : {}),
        };

        try {
            const res = await registerFn(userData).unwrap();
            saveToken(ACCESS_TOKEN, res.accessToken);
            saveToken(REFRESH_TOKEN, res.refreshToken);
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
                type='email'
                error={errors.email}
                isDarkPage
            />
            <Input
                label={t('fields.fullName')}
                registration={register('fullName', {
                    required: generateErrorMessage('fullName'),
                })}
                error={errors.fullName}
                isDarkPage
            />
            <Input
                label={t('fields.phoneNumber')}
                registration={register('phone', {})}
                error={errors.phone}
                isDarkPage
            />
            <Input
                label={t('fields.password')}
                type='password'
                registration={register('password', {
                    required: generateErrorMessage('password'),
                })}
                error={errors.password}
                isDarkPage
            />
            <Input
                label={t('fields.confirmPassword')}
                type='password'
                registration={register('confirmPassword', {
                    required: generateErrorMessage('confirmPassword'),
                    validate: (value) =>
                        value === passwordInputText ||
                        t('validation.passwordDoNotMatch'),
                })}
                error={errors.confirmPassword}
                isDarkPage
            />
            <div className='flex justify-center items-center '>
                <Button
                    isLoading={isLoading}
                    loadingText={t('register.submitting')}
                    type='submit'
                    label={t('register.submit')}
                />
            </div>
        </form>
    );
};

export default RegisterForm;
