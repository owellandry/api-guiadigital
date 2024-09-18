import { ReactNode } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';

type LayoutProps = {
    children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    const { pathname } = useRouter();
    const getTitle = () => {
        switch (pathname) {
            case '/': return 'Login - MyApp';
            case '/dashboard': return 'Dashboard - MyApp';
            default: return 'MyApp';
        }
    };

    return (
        <>
            <Head>
                <title>{getTitle()}</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="description" content="A brief description of your app" />
            </Head>
            <main>
                {children}
            </main>
        </>
    );
};

export default Layout;
