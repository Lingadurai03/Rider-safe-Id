import React from 'react';

interface Props {
    title: string;
    message: string;
}
const defaultTitle = 'Something went wrong. Please try again.';
const defaultMessage = 'Unknown Error';

const Error = ({ title = defaultTitle, message = defaultMessage }: Props) => {
    return (
        <div className="space-y-1">
            <h4 className="font-bold text-red-700">{title}</h4>
            <p className="text-sm text-gray-700">{message}</p>
        </div>
    );
};

export default Error;
