import { createContext, useContext, useState, useEffect } from "react";
import { playersApi } from "../services/playersApi";

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [countries, setCountries] = useState([]);
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAppData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [countriesData, positionsData] = await Promise.all([
          playersApi.getCountries(),
          playersApi.getPositions(),
        ]);

        setCountries(countriesData);
        setPositions(positionsData);
      } catch (err) {
        console.error("Failed to load app data:", err);
        setError("Failed to load application data");
      } finally {
        setLoading(false);
      }
    };

    loadAppData();
  }, []);

  const value = {
    countries,
    positions,
    loading,
    error,
    getCountryById: (id) => countries.find((c) => c.id === id),
    getPositionById: (id) => positions.find((p) => p.id === id),
    getCountriesByIds: (ids) => countries.filter((c) => ids.includes(c.id)),
    getPositionsByIds: (ids) => positions.filter((p) => ids.includes(p.id)),
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
