import {
  Card,
  CardContent,
  Typography,
  Avatar,
  IconButton,
  styled,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonIcon from "@mui/icons-material/Person";
import CountryFlags from "../display/CountryFlags";
import HeightDisplay from "../display/HeightDisplay";
import PositionBadges from "../display/PositionBadges";
import { theme } from "../../../styles/theme";

const StyledCard = styled(Card)({
  background: theme.effects.glassmorphism.background,
  backdropFilter: theme.effects.glassmorphism.backdropFilter,
  border: theme.effects.glassmorphism.border,
  borderRadius: theme.borderRadius.lg,
  boxShadow: theme.shadows.md,
  height: "100%",
  position: "relative",
  overflow: "hidden",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",

  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "3px",
    background: `linear-gradient(90deg, ${theme.colors.primary.main}, ${theme.colors.secondary.main})`,
    borderRadius: `${theme.borderRadius.lg} ${theme.borderRadius.lg} 0 0`,
  },

  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows.lg,
    background: "rgba(255, 255, 255, 0.4)",
  },
});

const StyledCardContent = styled(CardContent)({
  padding: theme.spacing.lg,
  height: "100%",
  display: "flex",
  flexDirection: "column",
});

const CardHeader = styled("div")({
  display: "flex",
  alignItems: "flex-start",
  gap: theme.spacing.md,
  marginBottom: theme.spacing.lg,
});

const StyledAvatar = styled(Avatar)({
  background: `linear-gradient(135deg, ${theme.colors.primary.main}, ${theme.colors.accent.purple})`,
  color: "white",
  width: 48,
  height: 48,
  boxShadow: theme.shadows.sm,
  border: "2px solid rgba(255, 255, 255, 0.2)",
  flexShrink: 0,
});

const BasicInfoContainer = styled("div")({
  flex: 1,
  minWidth: 0,
});

const PlayerName = styled(Typography)({
  color: theme.colors.text.primary,
  fontWeight: 600,
  fontSize: "1.1rem",
  marginBottom: theme.spacing.xs,
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

const CreatedDate = styled(Typography)({
  color: theme.colors.text.disabled,
  fontSize: "0.75rem",
  textAlign: "center",
  fontStyle: "italic",
});

const PlayerCard = ({
  player,
  onView = () => {},
  onEdit = () => {},
  onDelete = () => {},
  showActions = true,
  className = "",
}) => {
  const calculateAge = (birthDate) => {
    if (!birthDate) return "";
    const today = new Date();
    const birth = new Date(birthDate);
    return today.getFullYear() - birth.getFullYear();
  };

  return (
    <StyledCard className={className}>
      <StyledCardContent>
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
      </StyledCardContent>
    </StyledCard>
  );
};

export default PlayerCard;
