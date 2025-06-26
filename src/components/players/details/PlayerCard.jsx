import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonIcon from "@mui/icons-material/Person";
import CountryFlags from "../display/CountryFlags";
import HeightDisplay from "../display/HeightDisplay";
import PositionBadges from "../display/PositionBadges";

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
    <Card className={`player-card ${className}`}>
      <CardContent className="player-card__content">
        <div className="player-card__header">
          <div className="player-card__avatar">
            <Avatar className="player-card__avatar-icon">
              <PersonIcon />
            </Avatar>
          </div>

          <div className="player-card__basic-info">
            <Typography variant="h6" className="player-card__name">
              {player.firstName} {player.lastName}
            </Typography>
            <div className="player-card__nationality">
              <CountryFlags
                nationalities={
                  player.countries?.map((c) => c.code.toLowerCase()) || []
                }
                size="small"
              />
            </div>
          </div>

          {showActions && (
            <div className="player-card__actions">
              <IconButton
                size="small"
                onClick={() => onView(player)}
                className="player-card__action player-card__action--view"
                title="View Details"
              >
                <VisibilityIcon />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => onEdit(player)}
                className="player-card__action player-card__action--edit"
                title="Edit Player"
              >
                <EditIcon />
              </IconButton>
              <IconButton
                size="small"
                onClick={() => onDelete(player)}
                className="player-card__action player-card__action--delete"
                title="Delete Player"
              >
                <DeleteIcon />
              </IconButton>
            </div>
          )}
        </div>

        <div className="player-card__details">
          <div className="player-card__detail-item">
            <Typography variant="body2" className="player-card__detail-label">
              Age
            </Typography>
            <Typography variant="body2" className="player-card__detail-value">
              {calculateAge(player.dateOfBirth)} years
            </Typography>
          </div>

          <div className="player-card__detail-item">
            <Typography variant="body2" className="player-card__detail-label">
              Height
            </Typography>
            <div className="player-card__detail-value">
              <HeightDisplay height={player.heightCm} showToggle={false} />
            </div>
          </div>

          <div className="player-card__detail-item player-card__detail-item--full">
            <Typography variant="body2" className="player-card__detail-label">
              Positions
            </Typography>
            <div className="player-card__detail-value">
              <PositionBadges
                positions={player.positions?.map((p) => p.code) || []}
                size="small"
              />
            </div>
          </div>
        </div>

        <div className="player-card__footer">
          <Typography variant="caption" className="player-card__created-date">
            Created: {new Date(player.creationDate).toLocaleDateString()}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayerCard;
