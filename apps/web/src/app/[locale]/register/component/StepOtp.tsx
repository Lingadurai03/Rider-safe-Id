'use client';

import { Input, Button } from '@/components';
import { useGenerateErrorMessage } from '@/hooks';
import {
    useRegisterMutation,
    useValidateOtpMutation,
} from '@/store/auth/authApi';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type Props = {
    email: string;
    goNext: () => void;
    goBack: () => void;
};

type OtpForm = {
    otp: string;
};

export default function StepOtp({ email, goNext, goBack }: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<OtpForm>();

    const t = useTranslations();
    const generateErrorMessage = useGenerateErrorMessage();

    const [validateOtp, { isLoading }] = useValidateOtpMutation();

    const onSubmit = async (data: OtpForm) => {
        try {
            await validateOtp({ ...data, email }).unwrap();
            toast.success('OTP Verified!');
            goNext();
        } catch (err: any) {
            toast.error(err.message || 'Invalid OTP');
        }
    };

    return (
        <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
            <Input
                label={t('fields.enterOtp')}
                registration={register('otp', {
                    required: generateErrorMessage('enterOtp'),
                })}
                error={errors.otp}
                isDarkPage
            />
            <div className='flex justify-between'>
                <Button
                    label={t('register.back')}
                    type='button'
                    onClick={goBack}
                />
                <Button
                    label={t('register.verifyOtp')}
                    type='submit'
                    isLoading={isLoading}
                    loadingText={t('register.verifying')}
                />
            </div>
        </form>
    );
}
