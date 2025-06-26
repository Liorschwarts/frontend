import { Paper, Typography, Grid, Divider, Avatar, Chip } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import PublicIcon from "@mui/icons-material/Public";
import CountryFlags from "../display/CountryFlags";
import HeightDisplay from "../display/HeightDisplay";
import PositionBadges from "../display/PositionBadges";

const PlayerDetails = ({ player, className = "" }) => {
  const calculateAge = (birthDate) => {
    if (!birthDate) return "";
    const today = new Date();
    const birth = new Date(birthDate);
    return today.getFullYear() - birth.getFullYear();
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
    <Paper className={`player-details ${className}`}>
      <div className="player-details__header">
        <div className="player-details__avatar">
          <Avatar className="player-details__avatar-large">
            <PersonIcon />
          </Avatar>
        </div>

        <div className="player-details__title">
          <Typography variant="h4" className="player-details__name">
            {player.firstName} {player.lastName}
          </Typography>
          <div className="player-details__nationality">
            <CountryFlags
              nationalities={
                player.countries?.map((c) => c.code.toLowerCase()) || []
              }
              size="large"
            />
            <Typography
              variant="body1"
              className="player-details__nationality-text"
            >
              {player.countries?.map((country) => country.name).join(", ")}
            </Typography>
          </div>
        </div>
      </div>

      <Divider className="player-details__divider" />

      <div className="player-details__content">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <div className="player-details__section">
              <div className="player-details__section-header">
                <CalendarTodayIcon className="player-details__icon" />
                <Typography
                  variant="h6"
                  className="player-details__section-title"
                >
                  Personal Information
                </Typography>
              </div>

              <div className="player-details__info-grid">
                <div className="player-details__info-item">
                  <Typography variant="body2" className="player-details__label">
                    Date of Birth
                  </Typography>
                  <Typography variant="body1" className="player-details__value">
                    {formatDate(player.dateOfBirth)}
                  </Typography>
                </div>

                <div className="player-details__info-item">
                  <Typography variant="body2" className="player-details__label">
                    Age
                  </Typography>
                  <Typography variant="body1" className="player-details__value">
                    {calculateAge(player.dateOfBirth)} years old
                  </Typography>
                </div>

                <div className="player-details__info-item">
                  <Typography variant="body2" className="player-details__label">
                    Height
                  </Typography>
                  <div className="player-details__value">
                    <HeightDisplay height={player.heightCm} />
                  </div>
                </div>
              </div>
            </div>
          </Grid>

          <Grid item xs={12} md={6}>
            <div className="player-details__section">
              <div className="player-details__section-header">
                <SportsSoccerIcon className="player-details__icon" />
                <Typography
                  variant="h6"
                  className="player-details__section-title"
                >
                  Football Information
                </Typography>
              </div>

              <div className="player-details__info-grid">
                <div className="player-details__info-item player-details__info-item--full">
                  <Typography variant="body2" className="player-details__label">
                    Positions
                  </Typography>
                  <div className="player-details__value">
                    <PositionBadges
                      positions={player.positions?.map((p) => p.code) || []}
                    />
                  </div>
                </div>

                <div className="player-details__info-item player-details__info-item--full">
                  <Typography variant="body2" className="player-details__label">
                    Nationalities
                  </Typography>
                  <div className="player-details__nationalities">
                    {player.countries?.map((country) => (
                      <Chip
                        key={country.id}
                        label={country.name}
                        icon={<PublicIcon />}
                        variant="outlined"
                        className="player-details__nationality-chip"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>

      <Divider className="player-details__divider" />

      <div className="player-details__footer">
        <div className="player-details__timestamps">
          <Typography variant="caption" className="player-details__timestamp">
            Created: {formatDate(player.creationDate)}
          </Typography>
          {player.lastModifiedDate && (
            <Typography variant="caption" className="player-details__timestamp">
              Last Modified: {formatDate(player.lastModifiedDate)}
            </Typography>
          )}
        </div>
      </div>
    </Paper>
  );
};

export default PlayerDetails;
