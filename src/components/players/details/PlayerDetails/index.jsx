import React, { useMemo } from "react";
import { Grid, Divider, Chip } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import PublicIcon from "@mui/icons-material/Public";
import HeightDisplay from "../../display/HeightDisplay";
import PositionBadges from "../../display/PositionBadges";
import PlayerDetailsHeader from "./PlayerDetailsHeader";
import PlayerDetailsSection, {
  InfoItemComponent,
} from "./PlayerDetailsSection";
import PlayerDetailsActions from "./PlayerDetailsActions";
import { StyledPaper } from "./styles";
import { theme } from "../../../../styles/theme";

const PlayerDetails = ({
  player,
  onEdit = () => {},
  onDelete = () => {},
  className = "",
}) => {
  const calculatedAge = useMemo(() => {
    if (!player.dateOfBirth) return "";
    return (
      new Date().getFullYear() - new Date(player.dateOfBirth).getFullYear()
    );
  }, [player.dateOfBirth]);

  const formattedDate = useMemo(() => {
    if (!player.dateOfBirth) return "";
    return new Date(player.dateOfBirth).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [player.dateOfBirth]);

  return (
    <StyledPaper className={className}>
      <PlayerDetailsHeader player={player} />

      <Divider
        sx={{
          margin: `${theme.spacing.md} 0`,
          background: theme.colors.divider,
        }}
      />

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <PlayerDetailsSection
            icon={<CalendarTodayIcon />}
            title="Personal Information"
          >
            <InfoItemComponent label="Date of Birth">
              {formattedDate}
            </InfoItemComponent>

            <InfoItemComponent label="Age">
              {calculatedAge} years old
            </InfoItemComponent>

            <InfoItemComponent label="Height">
              <HeightDisplay height={player.heightCm} />
            </InfoItemComponent>
          </PlayerDetailsSection>
        </Grid>

        <Grid item xs={12} md={6}>
          <PlayerDetailsSection
            icon={<SportsSoccerIcon />}
            title="Football Information"
          >
            <InfoItemComponent label="Positions">
              <PositionBadges
                positions={player.positions?.map((p) => p.code) || []}
              />
            </InfoItemComponent>

            <InfoItemComponent label="Nationalities">
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: theme.spacing.sm,
                }}
              >
                {player.countries?.map((country) => (
                  <Chip
                    key={country.id}
                    label={country.name}
                    icon={<PublicIcon />}
                    sx={{
                      background: `${theme.colors.accent.main}30`,
                      color: theme.colors.accent.main,
                    }}
                  />
                ))}
              </div>
            </InfoItemComponent>
          </PlayerDetailsSection>
        </Grid>
      </Grid>

      <PlayerDetailsActions onEdit={onEdit} onDelete={onDelete} />
    </StyledPaper>
  );
};

export default React.memo(PlayerDetails);
