import React from "react";
import { Typography, styled } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CountryFlags from "../../display/CountryFlags";
import { StyledAvatar, PlayerName } from "./styles";
import { theme } from "../../../../styles/theme";

const HeaderSection = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing.lg,
  marginBottom: theme.spacing.lg,
  paddingTop: theme.spacing.xs,
});

const NationalitySection = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing.md,
});

const PlayerDetailsHeader = React.memo(({ player }) => {
  return (
    <HeaderSection>
      <StyledAvatar>
        <PersonIcon />
      </StyledAvatar>
      <div style={{ flex: 1 }}>
        <PlayerName>
          {player.firstName} {player.lastName}
        </PlayerName>
        <NationalitySection>
          <CountryFlags
            nationalities={
              player.countries?.map((c) => c.code.toLowerCase()) || []
            }
            size="medium"
          />
          <Typography color={theme.colors.text.secondary} fontWeight={500}>
            {player.countries?.map((country) => country.name).join(", ")}
          </Typography>
        </NationalitySection>
      </div>
    </HeaderSection>
  );
});

export default PlayerDetailsHeader;
