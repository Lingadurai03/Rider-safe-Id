import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    isLoading?: boolean;
    loadingText?: string;
}

const Button: React.FC<ButtonProps> = ({
    label,
    isLoading,
    loadingText,
    disabled,
    ...props
}) => {
    return (
        <button
            {...props}
            disabled={isLoading || disabled}
            className={`
                w-full flex items-center justify-center gap-2 bg-primary py-2 px-6 mt-4 rounded-md 
                font-semibold transition-all duration-300
                ${isLoading ? 'opacity-80 hover:opacity-70' : 'hover:opacity-80'} 
                text-white disabled:cursor-not-allowed ${disabled && 'bg-muted'} cursor-pointer
            `}
        >
            {props.children}
            {isLoading && <Loader2 className='h-4 w-4 animate-spin' />}
            {isLoading ? loadingText || 'Submitting...' : label}
        </button>
    );
};

export default Button;
