import React from "react";
import { styled } from "@mui/material";
import {
  SectionContainer,
  SectionIcon,
  SectionTitle,
  InfoLabel,
  InfoValue,
} from "./styles";
import { theme } from "../../../../styles/theme";

const SectionHeader = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing.md,
  marginBottom: theme.spacing.md,
});

const InfoItem = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.xs,
  padding: theme.spacing.sm,
  background: "rgba(255, 255, 255, 0.2)",
  borderRadius: theme.borderRadius.sm,
  marginBottom: theme.spacing.sm,
});

const PlayerDetailsSection = React.memo(({ icon, title, children }) => {
  return (
    <SectionContainer>
      <SectionHeader>
        <SectionIcon>{icon}</SectionIcon>
        <SectionTitle>{title}</SectionTitle>
      </SectionHeader>
      {children}
    </SectionContainer>
  );
});

export const InfoItemComponent = React.memo(({ label, children }) => (
  <InfoItem>
    <InfoLabel>{label}</InfoLabel>
    <InfoValue>{children}</InfoValue>
  </InfoItem>
));

export default PlayerDetailsSection;
