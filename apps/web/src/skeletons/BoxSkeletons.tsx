import React from 'react';

const BoxSkeletons = ({ className }: { className: string }) => {
    return (
        <div
            className={`rounded-md bg-[var(--color-border)] shadow inset-shadow animate-shimmer ${className}`}
        />
    );
};

export default BoxSkeletons;
