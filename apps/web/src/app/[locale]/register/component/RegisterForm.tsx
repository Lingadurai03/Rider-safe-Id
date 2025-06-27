'use client';

import { useState } from 'react';
import StepEmail from './StepEmail';
import StepOtp from './StepOtp';
import StepRegister from './StepRegister';
import { StepWrapper } from '@/components';

type Step = 'email' | 'otp' | 'register';

const RegisterForm = () => {
    const [step, setStep] = useState<Step>('email');
    const [email, setEmail] = useState('');

    const goNext = () =>
        setStep((prev) => (prev === 'email' ? 'otp' : 'register'));
    const goBack = () =>
        setStep((prev) => (prev === 'register' ? 'otp' : 'email'));

    return (
        <StepWrapper stepKey={step}>
            {step === 'email' && (
                <StepEmail setEmail={setEmail} goNext={goNext} />
            )}
            {step === 'otp' && (
                <StepOtp email={email} goNext={goNext} goBack={goBack} />
            )}
            {step === 'register' && (
                <StepRegister email={email} goBack={goBack} />
            )}
        </StepWrapper>
    );
};

export default RegisterForm;
