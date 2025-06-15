import { Navbar } from '@/components';

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar />
            <main className='bg-bg min-h-screen pt-[65px]'>{children}</main>
        </>
    );
}
