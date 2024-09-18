import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

const Login = () => {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [step, setStep] = useState('requestEmail'); // Puede ser 'requestEmail' o 'verifyCode'
    const [error, setError] = useState('');
    const router = useRouter();

    const handleEmailSubmit = async () => {
        try {
            const response = await axios.post('/api/request-code', { email });
            if (response.data.success) {
                setStep('verifyCode');
            } else {
                setError('Failed to send verification code.');
            }
        } catch (error) {
            console.error('Error sending verification code:', error);
            setError('An error occurred. Please try again later.');
        }
    };

    const handleCodeSubmit = async () => {
        try {
            const response = await axios.post('/api/verify-code', { email, code });
            if (response.data.success) {
                localStorage.setItem('auth', 'true');
                router.push('/dashboard');
            } else {
                setError('Invalid code. Please try again.');
            }
        } catch (error) {
            console.error('Error verifying code:', error);
            setError('An error occurred. Please try again later.');
        }
    };

    return (
        <Layout>
            <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
                <h1 className="text-3xl font-bold mb-6 text-center">
                    {step === 'requestEmail' ? 'Enter Your Email' : 'Enter Verification Code'}
                </h1>
                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                {step === 'requestEmail' ? (
                    <div className="flex flex-col">
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="p-2 mb-4 border border-gray-300 rounded"
                        />
                        <button
                            onClick={handleEmailSubmit}
                            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                        >
                            Send Code
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col">
                        <input
                            type="text"
                            placeholder="Verification Code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="p-2 mb-4 border border-gray-300 rounded"
                        />
                        <button
                            onClick={handleCodeSubmit}
                            className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
                        >
                            Verify Code
                        </button>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Login;
