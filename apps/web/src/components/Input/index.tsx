'use client';

import { InputHTMLAttributes, useState } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    registration: UseFormRegisterReturn;
    error?: FieldError;
}

export default function Input({
    label,
    type = 'text',
    registration,
    error,
    ...props
}: InputProps) {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';

    return (
        <div>
            <label className='mb-1 block text-sm font-medium text-white-muted'>
                {label}
            </label>

            <div className='relative mt-1'>
                <input
                    type={isPassword && showPassword ? 'text' : type}
                    {...registration}
                    {...props}
                    className='block w-full rounded-md border border-white-sm  p-2 pr-10 outline-none text-white-medium focus:shadow'
                />

                {isPassword && (
                    <button
                        type='button'
                        onClick={() => setShowPassword((prev) => !prev)}
                        className='absolute right-3 top-[50%] transform -translate-y-1/2 text-white-muted focus:outline-none cursor-pointer'
                    >
                        {showPassword ? (
                            <EyeOff size={20} />
                        ) : (
                            <Eye size={20} />
                        )}
                    </button>
                )}
            </div>
            {error && (
                <p className='mt-1 text-sm text-red-500'>
                    {error.message || `${label} is required`}
                </p>
            )}
        </div>
    );
}
