import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    isLoading?: boolean;
    glow?: boolean;
    loadingText?: string;
}

const Button: React.FC<ButtonProps> = ({
    label,
    isLoading,
    loadingText,
    disabled,
    glow,
    ...props
}) => {
    return (
        <button
            {...props}
            disabled={isLoading || disabled}
            className={`w-full flex items-center justify-center gap-2 py-2 px-6 mt-4 rounded-md bg-primary text-[color:var(--color-bg)] font-semibold transition-all duration-300
            ${isLoading ? 'opacity-80 hover:opacity-70' : 'hover:opacity-80'} 
            text-white disabled:cursor-not-allowed ${disabled && 'bg-muted'} cursor-pointer
            ${glow && 'shadow-[0_0_10px_var(--color-primary)] hover:shadow-[0_0_20px_var(--color-primary)]'}`}
        >
            {props.children}
            {isLoading && <Loader2 className='h-4 w-4 animate-spin' />}
            {isLoading ? loadingText || 'Submitting...' : label}
        </button>
    );
};

export default Button;
