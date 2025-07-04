'use client';

import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { RequestOtpPayload } from '@ridersafeid/types';
import { useTranslations } from 'next-intl';

import { Button, Input } from '@/components';
import { useRequestOtpMutation } from '@/store/auth/authApi';

type StepEmailProps = {
    goNext: () => void;
    setEmail: (email: string) => void;
};

export default function StepEmail({ setEmail, goNext }: StepEmailProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RequestOtpPayload>();

    const t = useTranslations();

    const [requestOtp] = useRequestOtpMutation();

    const onSubmit = async (data: RequestOtpPayload) => {
        try {
            await requestOtp(data).unwrap();
            toast.success('OTP sent to your email');
            setEmail(data.email);
            goNext();
        } catch (err: any) {
            toast.error(err.message || 'Failed to send OTP');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 animate-fade-in">
            <Input
                label={t('fields.email')}
                type="email"
                registration={register('email', {
                    required: 'Email is required',
                    pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Invalid email format',
                    },
                })}
                error={errors.email}
                isDarkPage
            />
            <Button
                type="submit"
                label={t('register.sendOtp')}
                loadingText={t('register.sending')}
                isLoading={isSubmitting}
            />
        </form>
    );
}
