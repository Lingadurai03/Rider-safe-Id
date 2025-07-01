'use client';

import React, { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { RTKError } from '@ridersafeid/types';
import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { Button, Error, Input, ProfileImageWithEdit } from '@/components';
import { useGetProfileQuery, useUpdateProfileMutation } from '@/store/profile/profile.api';

interface FormData {
    profileName: string;
    bloodGroup: string;
    address: string;
    pincode: string;
    dob: string;
    state: string;
    city: string;
    showPrivateData: boolean;
    emergencyContacts: { name: string; phone: string }[];
}

const DetailsForm = ({ mode }: { mode: string }) => {
    const { data: profileData } = useGetProfileQuery(undefined, {
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true,
        pollingInterval: 0,
    });
    const [imageUrl, setImageUrl] = useState(profileData?.imageUrl);
    const t = useTranslations();

    const [updateProfile, { isLoading: isUpdateProfileLoading }] = useUpdateProfileMutation();

    const router = useRouter();

    const {
        register,
        control,
        handleSubmit,
        reset, // Important for setting default values after fetch
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            profileName: '',
            bloodGroup: '',
            address: '',
            pincode: '',
            dob: '',
            state: '',
            city: '',
            showPrivateData: false,
            emergencyContacts: [{ name: '', phone: '' }],
        },
    });

    useEffect(() => {
        if (profileData) {
            reset({
                profileName: profileData.profileName,
                bloodGroup: profileData.bloodGroup,
                address: profileData.address,
                pincode: profileData.pincode,
                dob: profileData.dob.toString().slice(0, 10),
                state: profileData.state,
                city: profileData.city,
                showPrivateData: profileData.showPrivateData,
                emergencyContacts: profileData.emergencyContacts?.length
                    ? profileData.emergencyContacts
                    : [{ name: '', phone: '' }],
            });
            setImageUrl(profileData.imageUrl);
        }
    }, [profileData, reset]);

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'emergencyContacts',
    });

    const onSubmit = async (data: FormData) => {
        try {
            await updateProfile({
                ...data,
                ...(imageUrl ? { imageUrl } : {}),
                emergencyContacts: data.emergencyContacts.map((eContact) => ({
                    phone: eContact.phone,
                    name: eContact.name,
                })),
            }).unwrap();
            toast.success('Profile Updated Sucessfully');
            router.push('/');
        } catch (err: unknown) {
            const error = err as RTKError;
            toast.error(<Error title={error.data?.error} message={error.data?.message} />);
        }
    };

    return (
        <div>
            <ProfileImageWithEdit
                url={imageUrl || ''}
                alt={t('fields.profileName')}
                setImageUrl={setImageUrl}
            />
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid grid-cols-1 gap-4 lg:grid-cols-2"
            >
                <Input
                    label={t('fields.profileName') + '*'}
                    registration={register('profileName', {
                        required: t('validation.isRequired', { name: t('fields.profileName') }),
                    })}
                    error={errors.profileName}
                />

                <Input
                    label={t('fields.bloodGroup') + '*'}
                    registration={register('bloodGroup', {
                        required: t('validation.isRequired', { name: t('fields.bloodGroup') }),
                    })}
                    error={errors.bloodGroup}
                />

                <Input
                    label={t('fields.address') + '*'}
                    registration={register('address', {
                        required: t('validation.isRequired', { name: t('fields.address') }),
                    })}
                    error={errors.address}
                />

                <Input
                    label={t('fields.pincode') + '*'}
                    registration={register('pincode', {
                        required: t('validation.isRequired', { name: t('fields.pincode') }),
                    })}
                    error={errors.pincode}
                />

                <Input
                    label={t('fields.dateOfBirth') + '*'}
                    type="date"
                    registration={register('dob', {
                        required: t('validation.isRequired', { name: t('fields.dateOfBirth') }),
                    })}
                    error={errors.dob}
                />

                <Input
                    label={t('fields.state') + '*'}
                    registration={register('state', {
                        required: t('validation.isRequired', { name: t('fields.state') }),
                    })}
                    error={errors.state}
                />

                <Input
                    label={t('fields.city') + '*'}
                    registration={register('city', {
                        required: t('validation.isRequired', { name: t('fields.city') }),
                    })}
                    error={errors.city}
                />

                <label className="flex items-center gap-2 col-span-1 lg:col-span-2 text-sm text">
                    <input type="checkbox" {...register('showPrivateData')} />
                    {t('fields.showPrivateData')}
                </label>

                {fields.map((field, index) => (
                    <div
                        key={field.id}
                        className="grid grid-cols-1 gap-4 lg:grid-cols-2 col-span-1 lg:col-span-2 transition-all duration-500 ease-out transform scale-100 opacity-0 animate-fadeIn"
                    >
                        <Input
                            label={`${t('details.emergencyContact')} ${index + 1} ${t('fields.fullName')}*`}
                            registration={register(`emergencyContacts.${index}.name`, {
                                required: t('validation.isRequired', {
                                    name: `${t('details.emergencyContact')} ${index + 1} ${t('fields.fullName')}`,
                                }),
                            })}
                            error={errors.emergencyContacts?.[index]?.name}
                        />
                        <Input
                            label={`${t('details.emergencyContact')} ${index + 1} ${t('fields.phoneNumber')}*`}
                            registration={register(`emergencyContacts.${index}.phone`, {
                                required: t('validation.isRequired', {
                                    name: `${t('details.emergencyContact')} ${index + 1} ${t('fields.phoneNumber')}`,
                                }),
                            })}
                            error={errors.emergencyContacts?.[index]?.phone}
                        />
                        {fields.length > 1 && (
                            <Trash2
                                size={20}
                                className="absolute top-2 right-2 text-red-500 cursor-pointer hover:scale-102 transition-transform"
                                onClick={() => remove(index)}
                            />
                        )}
                    </div>
                ))}

                {fields.length != 3 && (
                    <div className="flex justify-start col-span-1 lg:col-span-2">
                        <button
                            type="button"
                            onClick={() => {
                                if (fields.length < 3) append({ name: '', phone: '' });
                            }}
                            className="text-xs py-2 px-4 text-[var(--color-primary)] underline cursor-pointer"
                            disabled={fields.length >= 3}
                        >
                            {t('details.AddemergencyContact')}
                        </button>
                    </div>
                )}

                <div className="col-span-1 lg:col-span-2 max-w-[200px] m-auto">
                    <Button
                        type="submit"
                        isLoading={isUpdateProfileLoading}
                        loadingText={mode === 'edit' ? t('details.updating') : t('details.adding')}
                        label={
                            mode === 'edit' ? t('details.updateDetails') : t('details.addDetails')
                        }
                    />
                </div>
            </form>
        </div>
    );
};

export default DetailsForm;
