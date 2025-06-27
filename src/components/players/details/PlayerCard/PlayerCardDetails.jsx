import React from "react";
import { Typography, styled } from "@mui/material";
import HeightDisplay from "../../display/HeightDisplay";
import PositionBadges from "../../display/PositionBadges";
import { CreatedDate } from "./styles";
import { theme } from "../../../../styles/theme";

const DetailsContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.sm,
  flex: 1,
});

const DetailItem = styled("div")(({ fullwidth }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing.sm,
  background: "rgba(255, 255, 255, 0.2)",
  borderRadius: theme.borderRadius.sm,

  ...(fullwidth && {
    flexDirection: "column",
    alignItems: "flex-start",
    gap: theme.spacing.xs,
  }),
}));

const DetailLabel = styled(Typography)({
  color: theme.colors.text.secondary,
  fontWeight: 600,
  fontSize: "0.875rem",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
});

const DetailValue = styled(Typography)({
  color: theme.colors.text.primary,
  fontWeight: 600,
  fontSize: "1rem",
});

const CardFooter = styled("div")({
  marginTop: "auto",
  paddingTop: theme.spacing.lg,
  borderTop: `1px solid ${theme.colors.divider}`,
  opacity: 0.8,
});

const PlayerCardDetails = React.memo(({ player }) => {
  const calculateAge = (birthDate) => {
    if (!birthDate) return "";
    const today = new Date();
    const birth = new Date(birthDate);
    return today.getFullYear() - birth.getFullYear();
  };

  return (
    <>
      <DetailsContainer>
        <DetailItem>
          <DetailLabel variant="body2">Age</DetailLabel>
          <DetailValue variant="body2">
            {calculateAge(player.dateOfBirth)} years
          </DetailValue>
        </DetailItem>

        <DetailItem>
          <DetailLabel variant="body2">Height</DetailLabel>
          <DetailValue>
            <HeightDisplay height={player.heightCm} showToggle={false} />
          </DetailValue>
        </DetailItem>

        <DetailItem fullwidth>
          <DetailLabel variant="body2">Positions</DetailLabel>
          <div>
            <PositionBadges
              positions={player.positions?.map((p) => p.code) || []}
              size="small"
            />
          </div>
        </DetailItem>
      </DetailsContainer>

      <CardFooter>
        <CreatedDate variant="caption">
          Created: {new Date(player.creationDate).toLocaleDateString()}
        </CreatedDate>
      </CardFooter>
    </>
  );
});

export default PlayerCardDetails;
