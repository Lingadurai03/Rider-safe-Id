import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    loading?: boolean;
    loadingText?: string;
}

const Button: React.FC<ButtonProps> = ({
    label,
    loading,
    loadingText,
    disabled,
    ...props
}) => {
    return (
        <button
            {...props}
            disabled={loading || disabled}
            className={`w-full flex items-center justify-center gap-2 py-2 px-6 mt-4 rounded-md bg-primary text-[color:var(--color-bg)] font-semibold transition-transform duration-300
                ${loading ? 'opacity-80 hover:opacity-70' : 'hover:opacity-80'} 
                text-white disabled:cursor-not-allowed ${disabled && 'bg-muted'}`}
        >
            {props.children}
            {loading && <Loader2 className='h-4 w-4 animate-spin' />}
            {loading ? loadingText || 'Submitting...' : label}
        </button>
    );
};

export default Button;
