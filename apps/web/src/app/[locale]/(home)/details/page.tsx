import React from 'react';
import { GetProfileApiResponse } from '@ridersafeid/types';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';

import { createServerAxios } from '@/lib/axiosServer.lib';

const Details = async () => {
    const axios = await createServerAxios();
    let qrProfileData: GetProfileApiResponse | null = null;
    const t = await getTranslations('details');

    try {
        const res = await axios.get<GetProfileApiResponse>('profile');
        qrProfileData = res.data;
    } catch (e) {
        console.error(e);
    }

    if (!qrProfileData) {
        return <div className="text-center text-red-500">{t('failedToLoadProfileData')}</div>;
    }

    return (
        <section className="w-full max-w-4xl mx-auto p-4 space-y-8 bg-white-sm backdrop-blur-sm border-white-sm rounded-lg shadow-sm inset-shadow-sm">
            {/* Image Section */}
            <div className="flex justify-center">
                <div className="relative h-40 w-40 rounded-full overflow-hidden border-4 border-primary shadow-lg">
                    <Image
                        src={qrProfileData.imageUrl || 'https://placehold.co/160x160/png'}
                        alt="Rider Profile"
                        fill
                        sizes="160px"
                        className="object-cover"
                    />
                </div>
            </div>

            {/* Basic Info */}
            <div className="text-center space-y-2">
                <h2 className="font-bold text-2xl">{qrProfileData.profileName}</h2>
                <p>
                    {t('bloodGroup')}:{' '}
                    <span className="font-semibold">{qrProfileData.bloodGroup}</span>
                </p>
                <p>
                    {t('dob')}: {new Date(qrProfileData.dob).toLocaleDateString()}
                </p>
            </div>

            {/* Address Info */}
            <div className="text-center space-y-1">
                <h3 className="font-semibold text-xl underline">{t('address')}</h3>
                <p>{qrProfileData.address}</p>
                <p>
                    {qrProfileData.city}, {qrProfileData.state} - {qrProfileData.pincode}
                </p>
            </div>

            {/* Emergency Contacts */}
            <div className="space-y-2">
                <h3 className="font-semibold text-xl underline text-center">
                    {t('emergencyContact')}
                </h3>
                {qrProfileData.emergencyContacts.length > 0 ? (
                    <ul className="space-y-1 text-center">
                        {qrProfileData.emergencyContacts.map((contact) => (
                            <li key={contact.id} className="font-medium">
                                {contact.name}:{' '}
                                <span className="font-semibold">{contact.phone}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-center text-gray-500">{t('noEmergencyContactFount')}</p>
                )}
            </div>
        </section>
    );
};

export default Details;
