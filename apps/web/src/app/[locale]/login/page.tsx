import Image from 'next/image';
import Link from 'next/link';

import LoginForm from './component/LoginForm';
import { useTranslations } from 'next-intl';

export default function Login() {
    const t = useTranslations();
    return (
        <main className='relative w-full h-screen bg-black'>
            {/* Fullscreen Background Image */}
            <Image
                src={'/bluebiker.webp'}
                alt='/bluebiker.webp'
                fill
                className='object-cover opacity-50 '
                priority
            />

            {/* Overlay form on right side */}
            <section className='absolute top-0 right-0 w-full md:w-1/2 h-full flex items-center justify-center px-3 md:px-8'>
                <div className='bg-card/60 border px-3 border-white-sm backdrop-blur-xs bg-white-sm rounded-md py-12 md:px-8 shadow-2xl max-w-md w-full'>
                    <h2 className='text-3xl font-bold mb-6 text-center text-white'>
                        {t('login.heading')}
                    </h2>
                    <LoginForm />
                    <p className='mt-5 text-white-medium text-sm text-center'>
                        New here?{' '}
                        <Link
                            className='text-[color:var(--color-secondary)] font-bold hover:underline'
                            href={'register'}
                        >
                            Create an account!
                        </Link>
                    </p>
                </div>
            </section>
        </main>
    );
}
