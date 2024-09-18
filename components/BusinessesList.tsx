import { useEffect, useState } from 'react';
import axios from 'axios';

interface Business {
  id: number;
  name: string;
  description: string;
}

const BusinessesList = () => {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await axios.get('/api/businesses');
        setBusinesses(response.data);
      } catch (err) {
        setError('Error fetching businesses');
      }
    };
    fetchBusinesses();
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Businesses</h1>
      <ul>
        {businesses.map((business) => (
          <li key={business.id}>
            <h2>{business.name}</h2>
            <p>{business.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BusinessesList;
