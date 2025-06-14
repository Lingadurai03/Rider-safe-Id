'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { LoginApiPayload } from '@ridersafeid/types';
import { useRouter } from 'next/navigation';

import { Button, Input } from '@/components';

const LoginForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginApiPayload>();

    // const [login, { isLoading }] = useLoginMutation();

    const navigate = useRouter();

    const onSubmit = async (data) => {};
    return (
        <form className='space-y-4'>
            <Input
                label='Email'
                registration={register('email', {
                    required: 'Username is required',
                })}
                error={errors.password}
            />
            <Input
                label='Password'
                type='password'
                registration={register('password', {
                    required: 'Password is required',
                })}
                error={errors.password}
            />
            <div className='flex justify-center items-center '>
                <Button type='submit' label='Submit' />
            </div>
        </form>
    );
};

export default LoginForm;
