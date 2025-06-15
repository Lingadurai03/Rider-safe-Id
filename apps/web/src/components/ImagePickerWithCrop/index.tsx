'use client';
import React, { useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';

interface Props {
    image: string;
    setCroppedAreaPixels: React.Dispatch<any>;
}

const ImagePickerWithCrop = ({
    image,

    setCroppedAreaPixels,
}: Props) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);

    const onCropComplete = useCallback(
        (_: any, croppedAreaPixels: any) => {
            setCroppedAreaPixels(croppedAreaPixels);
        },
        [setCroppedAreaPixels],
    );

    return (
        <div className='space-y-4'>
            <div className='relative w-[300px] h-[300px] bg-black'>
                <Cropper
                    image={image}
                    crop={crop}
                    zoom={zoom}
                    aspect={1}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                />
            </div>
        </div>
    );
};

export default ImagePickerWithCrop;
