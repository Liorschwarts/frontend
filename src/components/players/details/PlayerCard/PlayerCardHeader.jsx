import React from "react";
import { IconButton, styled } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CountryFlags from "../../display/CountryFlags";
import { StyledAvatar, PlayerName } from "./styles";
import { theme } from "../../../../styles/theme";

const CardHeader = styled("div")({
  display: "flex",
  alignItems: "flex-start",
  gap: theme.spacing.md,
  marginBottom: theme.spacing.lg,
});

const BasicInfoContainer = styled("div")({
  flex: 1,
  minWidth: 0,
});

const NationalityContainer = styled("div")({
  marginTop: theme.spacing.xs,
});

const ActionsContainer = styled("div")({
  display: "flex",
  gap: theme.spacing.xs,
  flexShrink: 0,
});

const ActionButton = styled(IconButton)(({ actiontype }) => {
  const getActionStyles = () => {
    switch (actiontype) {
      case "view":
        return {
          background: `${theme.colors.status.info}20`,
          color: theme.colors.status.info,
          "&:hover": {
            background: `${theme.colors.status.info}30`,
            transform: "scale(1.1)",
          },
        };
      case "edit":
        return {
          background: `${theme.colors.status.warning}20`,
          color: theme.colors.status.warning,
          "&:hover": {
            background: `${theme.colors.status.warning}30`,
            transform: "scale(1.1)",
          },
        };
      case "delete":
        return {
          background: `${theme.colors.status.error}20`,
          color: theme.colors.status.error,
          "&:hover": {
            background: `${theme.colors.status.error}30`,
            transform: "scale(1.1)",
          },
        };
      default:
        return {};
    }
  };

  return {
    padding: theme.spacing.xs,
    borderRadius: theme.borderRadius.sm,
    transition: "all 0.2s ease",
    ...getActionStyles(),
  };
});

const PlayerCardHeader = React.memo(
  ({ player, onView, onEdit, onDelete, showActions = true }) => {
    return (
      <CardHeader>
        <StyledAvatar>
          <PersonIcon />
        </StyledAvatar>

        <BasicInfoContainer>
          <PlayerName variant="h6">
            {player.firstName} {player.lastName}
          </PlayerName>
          <NationalityContainer>
            <CountryFlags
              nationalities={
                player.countries?.map((c) => c.code.toLowerCase()) || []
              }
              size="small"
            />
          </NationalityContainer>
        </BasicInfoContainer>

        {showActions && (
          <ActionsContainer>
            <ActionButton
              size="small"
              onClick={() => onView(player)}
              actiontype="view"
              title="View Details"
            >
              <VisibilityIcon />
            </ActionButton>
            <ActionButton
              size="small"
              onClick={() => onEdit(player)}
              actiontype="edit"
              title="Edit Player"
            >
              <EditIcon />
            </ActionButton>
            <ActionButton
              size="small"
              onClick={() => onDelete(player)}
              actiontype="delete"
              title="Delete Player"
            >
              <DeleteIcon />
            </ActionButton>
          </ActionsContainer>
        )}
      </CardHeader>
    );
  }
);

export default PlayerCardHeader;
