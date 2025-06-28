import Link from 'next/link';

export default function ForbiddenPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-bg text-center p-8">
            <h1 className="text-6xl font-bold text-red-600 mb-4">403</h1>
            <h2 className="text-2xl font-semibold text mb-2">Access Denied</h2>
            <p className="text-mutted mb-6 max-w-md">
                Oops! You don’t have permission to view this page. If you think this is a mistake,
                please contact the administrator.
            </p>
            <Link
                href="/"
                className="px-6 py-3 bg-primary text-white rounded-xl shadow hover:bg-primary/90 transition"
            >
                Go Back Home
            </Link>
        </div>
    );
}
