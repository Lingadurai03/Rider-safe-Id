'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { RegisterApiPayload } from '@ridersafeid/types';
import { useRouter } from 'next/navigation';

import { Button, Input } from '@/components';

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

    const navigate = useRouter();

    const onSubmit = async (data) => {};
    return (
        <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
            <Input
                label='Email'
                registration={register('email', {
                    required: 'Email is required',
                })}
                type='email'
                error={errors.email}
            />
            <Input
                label='Name'
                registration={register('fullName', {
                    required: 'Name is required',
                })}
                error={errors.fullName}
            />
            <Input
                label='Username'
                registration={register('phone', {
                    required: 'Username is required',
                })}
                error={errors.phone}
            />
            <Input
                label='Password'
                type='password'
                registration={register('password', {
                    required: 'Password is required',
                })}
                error={errors.password}
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
            />
            <div className='flex justify-center items-center '>
                <Button glow type='submit' label='Submit' />
            </div>
        </form>
    );
};

export default RegisterForm;
