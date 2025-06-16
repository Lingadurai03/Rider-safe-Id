'use client';

import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Trash2 } from 'lucide-react';

import { Button, Input, ProfileImageWithEdit } from '@/components';

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
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        defaultValues: {
            emergencyContacts: [{ name: '', phone: '' }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'emergencyContacts',
    });

    const onSubmit = (data: FormData) => {
        console.log('Form Data:', data);
    };

    return (
        <div>
            <ProfileImageWithEdit url={'hello'} alt={'helo'} />
            <form
                onSubmit={handleSubmit(onSubmit)}
                className='grid grid-cols-1 gap-4 lg:grid-cols-2'
            >
                <Input
                    label='Profile Name*'
                    registration={register('profileName', {
                        required: 'Profile Name is required',
                    })}
                    error={errors.profileName}
                />

                <Input
                    label='Blood Group*'
                    registration={register('bloodGroup', {
                        required: 'Blood Group is required',
                    })}
                    error={errors.bloodGroup}
                />

                <Input
                    label='Address*'
                    registration={register('address', {
                        required: 'Address is required',
                    })}
                    error={errors.address}
                />

                <Input
                    label='Pincode*'
                    registration={register('pincode', {
                        required: 'Pincode is required',
                    })}
                    error={errors.pincode}
                />

                <Input
                    label='Date of Birth*'
                    type='date'
                    registration={register('dob', {
                        required: 'Date of Birth is required',
                    })}
                    error={errors.dob}
                />

                <Input
                    label='State*'
                    registration={register('state', {
                        required: 'State is required',
                    })}
                    error={errors.state}
                />

                <Input
                    label='City*'
                    registration={register('city', {
                        required: 'City is required',
                    })}
                    error={errors.city}
                />

                <label className='flex items-center gap-2 col-span-1 lg:col-span-2 text-sm text'>
                    <input type='checkbox' {...register('showPrivateData')} />
                    Show Private Data
                </label>

                {fields.map((field, index) => (
                    <div
                        key={field.id}
                        className='grid grid-cols-1 gap-4 lg:grid-cols-2 col-span-1 lg:col-span-2 transition-all duration-500 ease-out transform scale-100 opacity-0 animate-fadeIn'
                    >
                        <Input
                            label={`Emergency Contact ${index + 1} Name*`}
                            registration={register(
                                `emergencyContacts.${index}.name`,
                                {
                                    required:
                                        'Emergency Contact Name is required',
                                },
                            )}
                            error={errors.emergencyContacts?.[index]?.name}
                        />
                        <Input
                            label={`Emergency Contact ${index + 1} Phone*`}
                            registration={register(
                                `emergencyContacts.${index}.phone`,
                                {
                                    required:
                                        'Emergency Contact Phone is required',
                                },
                            )}
                            error={errors.emergencyContacts?.[index]?.phone}
                        />
                        {fields.length > 1 && (
                            <Trash2
                                size={20}
                                className='absolute top-2 right-2 text-red-500 cursor-pointer hover:scale-102 transition-transform'
                                onClick={() => remove(index)}
                            />
                        )}
                    </div>
                ))}

                {fields.length != 3 && (
                    <div className='flex justify-start col-span-1 lg:col-span-2'>
                        <button
                            type='button'
                            onClick={() => {
                                if (fields.length < 3)
                                    append({ name: '', phone: '' });
                            }}
                            className='text-xs py-2 px-4 text-[var(--color-primary)] underline cursor-pointer'
                            disabled={fields.length >= 3}
                        >
                            Add Emergency Contact
                        </button>
                    </div>
                )}

                <div className='col-span-1 lg:col-span-2 max-w-[150px] m-auto'>
                    <Button
                        type='submit'
                        label={
                            mode === 'edit' ? 'Update Details' : 'Add Details'
                        }
                    />
                </div>
            </form>
        </div>
    );
};

export default DetailsForm;
