import Link from 'next/link';

export const metadata = {
    title: 'Page Not Found – RiderSafeID',
    description:
        'The page you’re looking for doesn’t exist. Please check the URL or return to the homepage.',
};

export default function NotFound() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center bg-white text-gray-900 px-4">
            <div className="max-w-md text-center">
                <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
                    404
                </h1>
                <p className="mt-4 text-xl font-medium text-gray-700">Page Not Found</p>
                <p className="mt-2 text-base text-gray-500">
                    The page you’re looking for doesn’t exist or might have been moved.
                </p>
                <Link
                    href="/"
                    className="mt-6 inline-block rounded-lg bg-black px-6 py-3 text-white font-semibold hover:bg-gray-800 transition"
                >
                    Go to Homepage
                </Link>
            </div>
        </main>
    );
}
