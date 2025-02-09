import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import PopulationChart from './PopulationChart';
import './CountryInfo.css';

export type CountryDetailedInfo = {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: Border[] | null;
  populationCounts: PopulationCount[];
  flagUrl: string;
};

export interface PopulationCount {
  countryName: string;
  year: number;
  value: number;
}

export type Border = {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: null;
};

const CountryInfo = () => {
  const [searchParams] = useSearchParams();
  const countryName = searchParams.get('name');
  const countryCode = searchParams.get('code');
  const [countryInfo, setCountryInfo] = useState<CountryDetailedInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!countryName || !countryCode) {
      setLoading(false);
      return;
    }

    const fetchCountryInfo = async () => {
      try {
        const response = await fetch(`http://localhost:7000/countries/info?countryName=${encodeURIComponent(countryName)}&countryCode=${countryCode}`);
        if (!response.ok) throw new Error('Failed to fetch country info');
        const data: CountryDetailedInfo = await response.json();
        setCountryInfo(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchCountryInfo();
  }, [countryName, countryCode]);

  if (loading) return <div className="loading-message">Loading...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="country-info-container">
      <h1>{countryInfo?.commonName}</h1>
      <img src={countryInfo?.flagUrl} alt={`${countryInfo?.commonName} flag`} className="flag-image" />

      <div className="country-details">
        <h3>Official Name: {countryInfo?.officialName}</h3>
        <p>Region: {countryInfo?.region}</p>
      </div>

      <h2>Border Countries</h2>
      <ul className="borders-list">
        {countryInfo?.borders && countryInfo.borders.map((border) => (
          <li key={border.countryCode}>
            <Link to={`/country?name=${encodeURIComponent(border.commonName)}&code=${border.countryCode}`}>
              {border.commonName}
            </Link>
          </li>
        ))}
      </ul>

      <h2>Population Over Time</h2>
      {
        countryInfo!.populationCounts.length > 0 ? (
          <PopulationChart data={countryInfo!.populationCounts} />
        ) : (
          <p>No population data available.</p>
        )
      }
      <Link to="/" className="back-home-button">Back to Home</Link>
    </div>
  );
};

export default CountryInfo;
