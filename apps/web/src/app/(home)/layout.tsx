import { UserCircle, Verified } from 'lucide-react';

import { Navbar } from '@/components';

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar />
            <main className='bg-bg min-h-screen pt-[65px]'>
                <section className='relative flex flex-col md:flex-row w-full min-h-[calc(100vh-65px)]'>
                    <div className='md:w-1/4 p-4'>
                        <div className='relative z-10 w-full bg-white-xs border-white-sm backdrop-blur-sm p-4 text-white rounded-lg flex flex-col gap-5 justify-center shadow-sm inset-shadow-sm'>
                            <div className='flex justify-center'>
                                <UserCircle className='h-16 w-16 text-primary' />
                            </div>
                            <div className='flex gap-1 text-lg items-center justify-center'>
                                <h2 className='text font-bold truncate max-w-[150px]'>
                                    Lingasdfsdfsdfsdfsdfsfdsdfdurai
                                </h2>
                                <Verified className='h-6 w-6 text-green-600' />
                            </div>

                            <div className='flex justify-center flex-col gap-2 text-sm text-muted'>
                                <div className='flex justify-center gap-2 '>
                                    <p className='font-normal'>
                                        QR Code Status
                                    </p>
                                    <p className='font-bold'>Active</p>
                                </div>
                                <p className='text-center font-normal'>
                                    Free Edit Left :{' '}
                                    <span className='ml-2 font-black text-lg'>
                                        3
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='md:w-3/4 p-4'>{children}</div>
                </section>
            </main>
        </>
    );
}
