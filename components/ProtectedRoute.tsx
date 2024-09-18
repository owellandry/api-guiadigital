// components/ProtectedRoute.tsx
import { useEffect } from 'react';
import { useRouter } from 'next/router';

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    // Check for user authentication (This is a placeholder. Implement your actual authentication check)
    const isAuthenticated = Boolean(localStorage.getItem('authToken'));

    if (!isAuthenticated) {
      router.push('/');
    }
  }, [router]);

  return <>{children}</>;
};

export default ProtectedRoute;
