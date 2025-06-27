import React from "react";
import { styled } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "../../../ui/Button";
import { theme } from "../../../../styles/theme";

const ActionsContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing.lg,
  marginTop: theme.spacing.lg,
  paddingTop: theme.spacing.md,
  borderTop: `1px solid ${theme.colors.divider}`,
});

const EditButton = styled(Button)({
  borderColor: theme.colors.status.warning,
  color: theme.colors.status.warning,

  "&:hover": {
    background: `${theme.colors.status.warning}15`,
    borderColor: theme.colors.status.warning,
  },
});

const DeleteButton = styled(Button)({
  borderColor: theme.colors.status.error,
  color: theme.colors.status.error,

  "&:hover": {
    background: `${theme.colors.status.error}15`,
    borderColor: theme.colors.status.error,
  },
});

const PlayerDetailsActions = React.memo(({ onEdit, onDelete }) => {
  return (
    <ActionsContainer>
      <EditButton
        variant="outlined"
        onClick={onEdit}
        startIcon={<EditIcon />}
        size="large"
      >
        Edit Player
      </EditButton>
      <DeleteButton
        variant="outlined"
        onClick={onDelete}
        startIcon={<DeleteIcon />}
        size="large"
      >
        Delete Player
      </DeleteButton>
    </ActionsContainer>
  );
});

export default PlayerDetailsActions;
