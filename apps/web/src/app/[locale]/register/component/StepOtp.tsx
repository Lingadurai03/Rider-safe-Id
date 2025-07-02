'use client';

import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useTranslations } from 'next-intl';

import { useGenerateErrorMessage } from '@/hooks';

import { Button, Input } from '@/components';
import { useValidateOtpMutation } from '@/store/auth/authApi';

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
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <Input
                label={t('fields.enterOtp')}
                registration={register('otp', {
                    required: generateErrorMessage('enterOtp'),
                })}
                error={errors.otp}
                isDarkPage
            />
            <div className="flex justify-between gap-3">
                <Button label={t('register.back')} type="button" onClick={goBack} />
                <Button
                    label={t('register.verifyOtp')}
                    type="submit"
                    isLoading={isLoading}
                    loadingText={t('register.verifying')}
                />
            </div>
        </form>
    );
}
