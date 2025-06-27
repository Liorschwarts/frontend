import { Box, styled } from "@mui/material";
import { theme } from "../../../styles/theme";

const FlagsContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing.xs,
  flexWrap: "wrap",
});

const FlagImage = styled("img")(({ size }) => {
  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return { width: "20px", height: "15px" };
      case "large":
        return { width: "32px", height: "24px" };
      default:
        return { width: "24px", height: "18px" };
    }
  };

  return {
    ...getSizeStyles(),
    borderRadius: theme.borderRadius.xs || "2px",
    boxShadow: theme.shadows.sm,
    transition: "all 0.2s ease",
    border: "1px solid rgba(255, 255, 255, 0.3)",

    "&:hover": {
      transform: "scale(1.1)",
      boxShadow: theme.shadows.md,
    },
  };
});

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
    <FlagsContainer className={className}>
      {nationalities.map((nationality, index) => (
        <FlagImage
          key={index}
          src={getFlagUrl(nationality)}
          alt={nationality}
          size={size}
          title={nationality.toUpperCase()}
          loading="lazy"
        />
      ))}
    </FlagsContainer>
  );
};

export default CountryFlags;
