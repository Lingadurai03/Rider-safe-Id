import React from 'react';

const BoxSkeletons = ({ className }: { className: string }) => {
    return (
        <div
            className={`rounded-md border-white-sm shadow inset-shadow animate-shimmer ${className}`}
        />
    );
};

export default BoxSkeletons;
