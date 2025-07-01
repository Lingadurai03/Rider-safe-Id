'use client';

import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { RegisterApiPayload } from '@ridersafeid/types';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { ACCESS_TOKEN, REFRESH_TOKEN } from '@/constant';
import { useGenerateErrorMessage } from '@/hooks';
import { saveToken } from '@/utils';

import { Button, Error, Input } from '@/components';
import { useRegisterMutation } from '@/store/auth/authApi';

interface RegisterData extends RegisterApiPayload {
    confirmPassword: string;
}

export default function StepRegister({ email, goBack }: any) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<RegisterData>();

    const passwordInputText = watch('password');
    const [registerFn, { isLoading }] = useRegisterMutation();
    const router = useRouter();

    const t = useTranslations();
    const generateErrorMessage = useGenerateErrorMessage();

    const onSubmit = async (data: RegisterData) => {
        const payloadData: RegisterApiPayload = {
            email,
            phone: data.phone,
            fullName: data.fullName,
            password: data.password,
        };
        try {
            const res = await registerFn(payloadData).unwrap();
            saveToken(ACCESS_TOKEN, res.accessToken);
            saveToken(REFRESH_TOKEN, res.refreshToken);
            router.push('/');
        } catch (err: any) {
            toast.error(
                <Error
                    title='Error'
                    message={err?.data?.message || 'Registration failed'}
                />,
            );
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
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
                registration={register('phone')}
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
            <div className='flex justify-between items-center'>
                <Button label={t('register.back')} onClick={goBack} />
                <Button
                    type='submit'
                    isLoading={isLoading}
                    loadingText={t('register.submitting')}
                    label={t('register.submit')}
                />
            </div>
        </form>
    );
}
