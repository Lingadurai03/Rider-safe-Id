import React from 'react';
import { Loader2 } from 'lucide-react';

interface GlowingButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    isLoading?: boolean;
    loadingText?: string;
    glow?: boolean;
    glowColor?: string;
}

const GlowingButton: React.FC<GlowingButtonProps> = ({
    label,
    isLoading = false,
    loadingText,
    disabled,
    glow = false,
    glowColor = 'var(--color-primary)',

    ...props
}) => {
    const baseStyle = `
        w-full flex items-center justify-center gap-2 py-2 px-4 mt-4 rounded-md 
        font-normal text-xs transition-all duration-300 cursor-pointer
        disabled:cursor-not-allowed ${
            glowColor === 'var(--color-primary)'
                ? 'bg-[var(--color-primary)]'
                : 'bg-[var(--color-secondary)]'
        }
    `;

    const outlineStyle = `
         text-white border border-[${glowColor}] rounded-xl}
    `;

    const outlineGlow = glow
        ? {
              boxShadow: `
                  inset 0 0 8px ${glowColor},
                  inset 0 0 16px ${glowColor},
                  0 0 8px ${glowColor},
                  0 0 16px ${glowColor},
                  0 0 24px ${glowColor}
              `,
          }
        : {};

    return (
        <button
            {...props}
            disabled={isLoading || disabled}
            className={`${baseStyle} ${outlineStyle}`}
            style={outlineGlow}
        >
            {props.children}
            {isLoading && <Loader2 className='h-4 w-4 animate-spin' />}
            {isLoading ? loadingText || 'Loading...' : label}
        </button>
    );
};

export default GlowingButton;
