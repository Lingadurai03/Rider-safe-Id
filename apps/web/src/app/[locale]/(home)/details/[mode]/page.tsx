import React from 'react';

import DetailsForm from './components/DetailsForm';
interface PageProps {
    params: Promise<{ mode: string }>; // Or whatever your dynamic route parameters are
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const DetailsPage = async ({ params }: PageProps) => {
    const resolvedParams = await params;
    const mode = resolvedParams.mode;
    return (
        <div className="relative z-10 w-full bg-white-xs border-white-sm backdrop-blur-sm px-6 py-8 text rounded-lg flex flex-col gap-5 justify-center shadow-sm inset-shadow-sm">
            <DetailsForm mode={mode} />
        </div>
    );
};

export default DetailsPage;
