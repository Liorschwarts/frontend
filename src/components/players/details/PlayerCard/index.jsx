import React from "react";
import { StyledCard, StyledCardContent } from "./styles";
import PlayerCardHeader from "./PlayerCardHeader";
import PlayerCardDetails from "./PlayerCardDetails";

const PlayerCard = ({
  player,
  onView = () => {},
  onEdit = () => {},
  onDelete = () => {},
  showActions = true,
  className = "",
}) => {
  return (
    <StyledCard className={className}>
      <StyledCardContent>
        <PlayerCardHeader
          player={player}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
          showActions={showActions}
        />

        <PlayerCardDetails player={player} />
      </StyledCardContent>
    </StyledCard>
  );
};

export default React.memo(PlayerCard);
