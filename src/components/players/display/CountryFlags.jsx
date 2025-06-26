import React from "react";
import { Box } from "@mui/material";

const CountryFlags = ({
  nationalities = [],
  size = "medium",
  className = "",
}) => {
  if (!nationalities || nationalities.length === 0) {
    return null;
  }

  const getFlagUrl = (countryCode) => {
    return `https://flagcdn.com/24x18/${countryCode.toLowerCase()}.png`;
  };

  return (
    <Box className={`country-flags country-flags--${size} ${className}`}>
      {nationalities.map((nationality, index) => (
        <img
          key={index}
          src={getFlagUrl(nationality)}
          alt={nationality}
          className="country-flags__flag"
          title={nationality.toUpperCase()}
        />
      ))}
    </Box>
  );
};

export default CountryFlags;
