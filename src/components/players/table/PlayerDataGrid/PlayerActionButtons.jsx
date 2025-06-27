import React from "react";
import { IconButton, styled } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { theme } from "../../../../styles/theme";

const PlayerActionsContainer = styled("div")({
  display: "flex",
  gap: theme.spacing.sm,
  alignItems: "center",
  justifyContent: "center",
});

const ActionButton = styled(IconButton)(({ actiontype }) => {
  const getActionStyles = () => {
    switch (actiontype) {
      case "view":
        return {
          background: `${theme.colors.status.info}20`,
          color: theme.colors.status.info,
          border: `1px solid ${theme.colors.status.info}30`,
          "&:hover": {
            background: `${theme.colors.status.info}30`,
            transform: "scale(1.1)",
          },
        };
      case "edit":
        return {
          background: `${theme.colors.status.warning}20`,
          color: theme.colors.status.warning,
          border: `1px solid ${theme.colors.status.warning}30`,
          "&:hover": {
            background: `${theme.colors.status.warning}30`,
            transform: "scale(1.1)",
          },
        };
      case "delete":
        return {
          background: `${theme.colors.status.error}20`,
          color: theme.colors.status.error,
          border: `1px solid ${theme.colors.status.error}30`,
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

const PlayerActionButtons = React.memo(
  ({ player, onView, onEdit, onDelete }) => {
    return (
      <PlayerActionsContainer>
        <ActionButton
          size="small"
          onClick={() => onView(player)}
          actiontype="view"
          title="View Details"
        >
          <VisibilityIcon fontSize="small" />
        </ActionButton>
        <ActionButton
          size="small"
          onClick={() => onEdit(player)}
          actiontype="edit"
          title="Edit Player"
        >
          <EditIcon fontSize="small" />
        </ActionButton>
        <ActionButton
          size="small"
          onClick={() => onDelete(player)}
          actiontype="delete"
          title="Delete Player"
        >
          <DeleteIcon fontSize="small" />
        </ActionButton>
      </PlayerActionsContainer>
    );
  }
);

export default PlayerActionButtons;
