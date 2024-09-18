import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

const Dashboard = () => {
    const [businesses, setBusinesses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            if (!localStorage.getItem('auth')) {
                router.push('/');
                return;
            }

            try {
                const response = await axios.get('/api/businesses');
                setBusinesses(response.data);
            } catch (error) {
                console.error('Error fetching businesses:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('auth');
        router.push('/');
    };

    if (loading) {
        return (
            <Layout title="Dashboard">
                <div className="flex items-center justify-center min-h-screen">
                    <div className="text-lg font-semibold">Loading...</div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout title="Dashboard">
            <div className="p-6 max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-center">Dashboard</h1>
                <button
                    onClick={handleLogout}
                    className="block w-full max-w-xs mx-auto mb-6 p-3 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                    Logout
                </button>
                <ul className="list-disc pl-5 space-y-2">
                    {businesses.map((business) => (
                        <li key={business.id} className="text-lg">
                            {business.name}
                        </li>
                    ))}
                </ul>
            </div>
        </Layout>
    );
};

export default Dashboard;
