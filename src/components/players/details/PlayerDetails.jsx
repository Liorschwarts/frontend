import React from "react";
import {
  Paper,
  Typography,
  Grid,
  Divider,
  Avatar,
  Chip,
  styled,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import PublicIcon from "@mui/icons-material/Public";
import CountryFlags from "../display/CountryFlags";
import HeightDisplay from "../display/HeightDisplay";
import PositionBadges from "../display/PositionBadges";
import { theme } from "../../../styles/theme";

// Styled Components
const StyledPaper = styled(Paper)({
  background: theme.effects.glassmorphism.background,
  backdropFilter: theme.effects.glassmorphism.backdropFilter,
  border: theme.effects.glassmorphism.border,
  borderRadius: theme.borderRadius.lg,
  boxShadow: theme.shadows.lg,
  padding: theme.spacing.xl,
  maxWidth: "800px",
  margin: "0 auto",
  position: "relative",

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: `linear-gradient(90deg, ${theme.colors.primary.main}, ${theme.colors.secondary.main}, ${theme.colors.accent.purple})`,
    borderRadius: `${theme.borderRadius.lg} ${theme.borderRadius.lg} 0 0`,
  },
});

const HeaderSection = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing.xl,
  marginBottom: theme.spacing.xl,
  paddingTop: theme.spacing.sm,
});

const StyledAvatar = styled(Avatar)({
  background: `linear-gradient(135deg, ${theme.colors.primary.main}, ${theme.colors.accent.purple})`,
  color: "white",
  width: 64,
  height: 64,
  boxShadow: theme.shadows.md,
  border: "3px solid rgba(255, 255, 255, 0.3)",
});

const PlayerName = styled(Typography)({
  color: theme.colors.text.primary,
  fontWeight: 700,
  fontSize: "1.8rem",
  marginBottom: theme.spacing.sm,
});

const NationalitySection = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing.md,
});

const SectionContainer = styled("div")({
  background: "rgba(255, 255, 255, 0.1)",
  borderRadius: theme.borderRadius.md,
  padding: theme.spacing.lg,
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  height: "100%",
});

const SectionHeader = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing.md,
  marginBottom: theme.spacing.lg,
});

const SectionIcon = styled("div")({
  color: theme.colors.primary.main,
  fontSize: "1.5rem",
  padding: theme.spacing.sm,
  borderRadius: theme.borderRadius.sm,
  background: `linear-gradient(135deg, ${theme.colors.primary.main}20, ${theme.colors.primary.main}40)`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const SectionTitle = styled(Typography)({
  color: theme.colors.text.primary,
  fontWeight: 600,
  fontSize: "1.1rem",
});

const InfoItem = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.xs,
  padding: theme.spacing.md,
  background: "rgba(255, 255, 255, 0.2)",
  borderRadius: theme.borderRadius.sm,
  marginBottom: theme.spacing.md,
});

const InfoLabel = styled(Typography)({
  color: theme.colors.text.secondary,
  fontWeight: 500,
  fontSize: "0.8rem",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
});

const InfoValue = styled(Typography)({
  color: theme.colors.text.primary,
  fontWeight: 600,
  fontSize: "1rem",
});

const PlayerDetails = ({ player, className = "" }) => {
  const calculateAge = (birthDate) => {
    if (!birthDate) return "";
    return new Date().getFullYear() - new Date(birthDate).getFullYear();
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <StyledPaper className={className}>
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

      <Divider
        sx={{
          margin: `${theme.spacing.lg} 0`,
          background: theme.colors.divider,
        }}
      />

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <SectionContainer>
            <SectionHeader>
              <SectionIcon>
                <CalendarTodayIcon />
              </SectionIcon>
              <SectionTitle>Personal Information</SectionTitle>
            </SectionHeader>

            <InfoItem>
              <InfoLabel>Date of Birth</InfoLabel>
              <InfoValue>{formatDate(player.dateOfBirth)}</InfoValue>
            </InfoItem>

            <InfoItem>
              <InfoLabel>Age</InfoLabel>
              <InfoValue>
                {calculateAge(player.dateOfBirth)} years old
              </InfoValue>
            </InfoItem>

            <InfoItem>
              <InfoLabel>Height</InfoLabel>
              <div>
                <HeightDisplay height={player.heightCm} />
              </div>
            </InfoItem>
          </SectionContainer>
        </Grid>

        <Grid item xs={12} md={6}>
          <SectionContainer>
            <SectionHeader>
              <SectionIcon>
                <SportsSoccerIcon />
              </SectionIcon>
              <SectionTitle>Football Information</SectionTitle>
            </SectionHeader>

            <InfoItem>
              <InfoLabel>Positions</InfoLabel>
              <div>
                <PositionBadges
                  positions={player.positions?.map((p) => p.code) || []}
                />
              </div>
            </InfoItem>

            <InfoItem>
              <InfoLabel>Nationalities</InfoLabel>
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
            </InfoItem>
          </SectionContainer>
        </Grid>
      </Grid>
    </StyledPaper>
  );
};

export default PlayerDetails;
