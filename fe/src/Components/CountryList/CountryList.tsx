import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './CountryList.css';

interface Country {
  name: string;
  countryCode: string;
}

const CountryList = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('http://localhost:7000/countries/available');
        if (!response.ok) throw new Error('Failed to fetch country list');
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  if (loading) return <div className="loading-message">Loading...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="container">
      <h1>Countries List</h1>
      <ul>
        {countries.map((country) => (
          <li key={country.countryCode}>
            <Link to={`/country?name=${encodeURIComponent(country.name)}&code=${country.countryCode}`}>
              {country.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryList;
