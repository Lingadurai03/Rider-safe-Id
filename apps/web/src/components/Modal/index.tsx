'use client';

import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import Button from '@/components/Button';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    confirmText?: string;
    cancelText?: string;
    children: React.ReactNode;
    isConfirmButtonLoading?: boolean;
    confiirmButtonLoadingText?: string;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title = 'Are you sure?',
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    children,
    isConfirmButtonLoading,
    confiirmButtonLoadingText,
}) => {
    const [isMounted, setIsMounted] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Scroll lock
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                modalRef.current &&
                !modalRef.current.contains(event.target as Node)
            ) {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    // Escape key close
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose();
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen || !isMounted) return null;

    const modalRoot = document.getElementById('modal-root');
    if (!modalRoot) return null;

    return ReactDOM.createPortal(
        <div className='backdrop-blur-[2px] fixed inset-0 z-50 flex items-center justify-center bg-black/40'>
            <div
                ref={modalRef}
                className='w-full max-w-md rounded-xl bg-zinc-200 p-6 shadow-xl dark:bg-zinc-800'
            >
                <h2 className='mb-4 text-lg font-semibold text-zinc-900 dark:text-white'>
                    {title}
                </h2>
                <div className='mb-6 text-zinc-700 dark:text-zinc-200'>
                    {children}
                </div>
                <div className='flex justify-end gap-3'>
                    <button
                        onClick={onClose}
                        className='rounded-md px-5 py-2 text-sm text-zinc-600 hover:bg-zinc-200 dark:text-zinc-300 dark:hover:bg-zinc-700 cursor-pointer'
                    >
                        {cancelText}
                    </button>
                    <div className='inline-flex'>
                        <Button
                            onClick={onConfirm}
                            isLoading={isConfirmButtonLoading}
                            loadingText={confiirmButtonLoadingText}
                            label={confirmText}
                        />
                    </div>
                </div>
            </div>
        </div>,
        modalRoot,
    );
};

export default Modal;
