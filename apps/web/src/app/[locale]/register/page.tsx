import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import RegisterForm from './component/RegisterForm';

export default async function Register() {
    const t = await getTranslations('register');
    return (
        <main className="relative min-w-full min-h-screen bg-black">
            {/* Fullscreen Background Image */}
            <Image
                src="/bluebiker.webp"
                alt="/bluebiker.webp"
                fill
                className="object-cover opacity-50 "
                priority
            />

            {/* Overlay form on right side */}
            <section className="absolute top-0 right-0 w-full md:w-1/2 min-h-screen flex items-center justify-center px-3 md:px-8 overflow-y-auto">
                <div className="border px-3 border-white-sm backdrop-blur-xs bg-white-sm rounded-md py-4 md:px-8 shadow-2xl max-w-md w-full max-h-[95vh] overflow-x-hidden overflow-y-auto">
                    <h2 className="text-3xl font-bold mb-6 text-center text-white">
                        {t('heading')}
                    </h2>
                    <RegisterForm />
                    <p className="mt-5 text-white-medium text-sm text-center">
                        {t('alreadyRegister')}{' '}
                        <Link
                            className="text-[color:var(--color-secondary)] font-bold hover:underline"
                            href={'login'}
                        >
                            {t('login')}
                        </Link>
                    </p>
                </div>
            </section>
        </main>
    );
}
