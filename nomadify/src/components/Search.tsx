import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import mapData from '../../public/map.json';

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [placeholder, setPlaceholder] = useState("E.g., Czech Republic, Prague");
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Function to update placeholder every 15 seconds
    const intervalId = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * mapData.objects.world.geometries.length);
      const randomCountry = mapData.objects.world.geometries[randomIndex].properties.name;
      const randomCapital = mapData.objects.world.geometries[randomIndex].properties.capital;
      
      setShowPlaceholder(false);
      setTimeout(() => {
        setPlaceholder(`E.g., ${randomCountry}, ${randomCapital}`);
        setShowPlaceholder(true);
      }, 300); // Delay placeholder change to sync with CSS animation
    }, 15000); // Change placeholder every 15 seconds

    return () => {
      clearInterval(intervalId); // Cleanup function to clear interval when component unmounts
    };
  }, []);

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = () => {
    const [country, capital] = searchValue.split(',').map(item => item.trim());
    if (country && capital) {
      router.push(`/map/${country}/${capital}`);
    }
  };

  // TODO: Add search icon to the input

  return (
    <div className="ml-10 mb-10">
      <input
        type="text"
        className="input w-1/5"
        value={searchValue}
        placeholder={placeholder}
        onChange={handleInputChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSubmit();
          }
        }}
      />
      <style jsx>{`
        input::placeholder {
          opacity: ${showPlaceholder ? 1 : 0};
          transition: opacity 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Search;
