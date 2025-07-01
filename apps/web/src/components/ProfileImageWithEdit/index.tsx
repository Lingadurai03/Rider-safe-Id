'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Edit } from 'lucide-react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import { useToggle } from '@/hooks';
import { getCroppedImg } from '@/utils';

import { Modal } from '@/components';
import ImagePickerWithCrop from '@/components/ImagePickerWithCrop';
import { useUploadProfileImageMutation } from '@/store/profile/profile.api';

interface Props {
    url: string | null;
    alt: string | null;
    setImageUrl: React.Dispatch<React.SetStateAction<string | null | undefined>>;
}

const ProfileImageWithEdit = ({ url, alt, setImageUrl }: Props) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [modalState, _, setModalState] = useToggle(false);
    const [image, setImage] = useState<null | string>(null);
    const [imageId, setImageId] = useState<number>(0);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
        height: number;
        width: number;
        x: number;
        y: number;
    } | null>(null);

    const t = useTranslations();

    const [uploadProfileImage, { isLoading: isProfileImageUploading }] =
        useUploadProfileImageMutation();

    const editButtonClickHandler = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result as string);
                setImageId(Date.now());
            };
            reader.readAsDataURL(file);
        }
    };
    useEffect(() => {
        if (imageId) {
            setModalState(true);
        }
    }, [imageId, setModalState]);

    const modalOnClose = () => {
        setModalState(false);
        setImage(null);
    };
    const modalOnConfirm = async () => {
        if (!image || !croppedAreaPixels) return;

        const croppedBlob = await getCroppedImg(image, croppedAreaPixels);
        const formData = new FormData();
        formData.append('file', croppedBlob, 'profile.jpg');
        try {
            const data = await uploadProfileImage(formData).unwrap();
            setImageUrl(data.url);
            // optionally close modal and refresh image
            setModalState(false);
        } catch (err) {
            console.error('Failed to upload image:', err);
        }
    };

    return (
        <div className="group relative mx-auto my-4 h-60 w-60">
            <Image
                src={url ? url : 'https://placehold.co/600x400/png'}
                alt={alt || 'Profile Image'}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 256px"
                className="rounded-full object-cover"
                priority
            />
            <div
                className="md:invisible absolute inset-0 z-10 flex cursor-pointer items-center justify-center rounded-full bg-zinc-900/60 text-fuchsia-400 transition md group-hover:visible"
                onClick={editButtonClickHandler}
            >
                <Edit className="h-6 w-6" />
                <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />
            </div>
            <Modal
                isOpen={modalState}
                onClose={modalOnClose}
                cancelText={t('modal.cancel')}
                confirmText={t('modal.upload')}
                onConfirm={modalOnConfirm}
                title={t('modal.title')}
                isConfirmButtonLoading={isProfileImageUploading}
                confiirmButtonLoadingText={t('modal.uploading')}
            >
                <ImagePickerWithCrop image={image!} setCroppedAreaPixels={setCroppedAreaPixels} />
            </Modal>
        </div>
    );
};

export default ProfileImageWithEdit;
