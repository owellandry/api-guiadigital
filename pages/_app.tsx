import { useRouter } from 'next/router';
import { useEffect } from 'react';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: any) => {
    const router = useRouter();

    useEffect(() => {
        const handleRouteChange = (url: string) => {
            const auth = localStorage.getItem('auth');
            const publicPaths = ['/'];

            if (!auth && !publicPaths.includes(url)) {
                router.push('/');
            }
        };

        router.events.on('routeChangeStart', handleRouteChange);

        return () => {
            router.events.off('routeChangeStart', handleRouteChange);
        };
    }, [router]);

    return <Component {...pageProps} />;
};

export default MyApp;
