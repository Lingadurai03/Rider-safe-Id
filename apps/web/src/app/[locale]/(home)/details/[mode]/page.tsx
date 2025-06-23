import React from 'react';

import DetailsForm from './components/DetailsForm';

const DetailsPage = async ({ params }: { params: { mode: string } }) => {
    const param = await params;
    const mode = param.mode;

    return (
        <div className='relative z-10 w-full bg-white-xs border-white-sm backdrop-blur-sm px-6 py-8 text rounded-lg flex flex-col gap-5 justify-center shadow-sm inset-shadow-sm'>
            <DetailsForm mode={mode} />
        </div>
    );
};

export default DetailsPage;
