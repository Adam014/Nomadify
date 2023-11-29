"use client";

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import fetchCostOfLiving from '@utils/fetchCostOfLiving';

const Page = () => {
  const { country, capital } = useParams();

  const decodeParam = (param: any) => (Array.isArray(param) ? param.join(' ') : decodeURIComponent(param));

  const decodedCountry = decodeParam(country);
  const decodedCapital = decodeParam(capital);

  const [costOfLivingData, setCostOfLivingData] = useState(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCostOfLiving(decodedCountry, decodedCapital);
        setCostOfLivingData(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unexpected error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [decodedCountry, decodedCapital]);

  console.log(costOfLivingData);

  return (
    <div className='relative'>
      <div className="heading_container">
        <h1 className='head_text sm:pl-10 lg:pl-24 pt-24'>📍 {decodedCountry}, {decodedCapital}</h1>
        <h2 className='sm:pl-10 lg:pl-36 pt-12'>Last updated at: {costOfLivingData.exchange_rates_updated.date}</h2>
        {loading && <p className='p-24'>Loading...</p>}
        {error && <p className='p-24'>{error}</p>}
        {costOfLivingData && (
          <div>

          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
