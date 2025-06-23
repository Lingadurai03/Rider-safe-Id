import React from 'react';
import { GetProfileApiResponse } from '@ridersafeid/types';
import Image from 'next/image';

const PublicDetails = async ({ userId }: { userId: string }) => {
    let qrProfileData: GetProfileApiResponse | null = null;

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL_SSR}public/${userId}`,
        );
        const data: GetProfileApiResponse = await res.json();
        qrProfileData = data;
    } catch (e) {
        console.error(e);
    }

    if (!qrProfileData)
        return <p className='text-center'>No profile data found.</p>;
    return (
        <div className='max-w-4xl mx-auto bg-white-sm backdrop-blur-sm rounded-xl shadow-lg p-6 space-y-8 border border-gray-200'>
            {/* Profile Image */}
            <div className='flex justify-center'>
                <div className='relative h-40 w-40 rounded-full overflow-hidden border-4 border-primary shadow-md'>
                    <Image
                        src={
                            qrProfileData.imageUrl ||
                            'https://placehold.co/160x160/png'
                        }
                        alt='Rider Profile'
                        fill
                        sizes='160px'
                        className='object-cover'
                    />
                </div>
            </div>

            {/* Basic Info */}
            <div className='text-center space-y-3'>
                <h2 className='font-bold text-3xl text-primary'>
                    {qrProfileData.profileName}
                </h2>
                <p className='text-gray-600'>
                    Blood Group:{' '}
                    <span className='font-semibold text-black'>
                        {qrProfileData.bloodGroup}
                    </span>
                </p>
                <p className='text-gray-600'>
                    DOB: {new Date(qrProfileData.dob).toLocaleDateString()}
                </p>
                <p className='text-green-600 font-medium'>Status: Active</p>
            </div>

            {/* Address Info */}
            <div className='text-center space-y-2 bg-gray-50 p-4 rounded-lg shadow-sm'>
                <h3 className='font-semibold text-xl text-primary underline underline-offset-4'>
                    Address
                </h3>
                <p className='text-gray-700'>{qrProfileData.address}</p>
                <p className='text-gray-700'>
                    {qrProfileData.city}, {qrProfileData.state} -{' '}
                    {qrProfileData.pincode}
                </p>
            </div>

            {/* Emergency Contacts */}
            <div className='space-y-3 bg-gray-50 p-4 rounded-lg shadow-sm'>
                <h3 className='font-semibold text-xl text-primary underline underline-offset-4 text-center'>
                    Emergency Contacts
                </h3>
                {qrProfileData.emergencyContacts.length > 0 ? (
                    <ul className='space-y-2 text-center'>
                        {qrProfileData.emergencyContacts.map((contact) => (
                            <li
                                key={contact.id}
                                className='font-medium text-gray-700'
                            >
                                {contact.name}:{' '}
                                <span className='font-semibold text-black'>
                                    {contact.phone}
                                </span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className='text-center text-gray-500'>
                        No emergency contacts found.
                    </p>
                )}
            </div>
        </div>
    );
};

export default PublicDetails;
