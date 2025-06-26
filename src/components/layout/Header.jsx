import { AppBar, Toolbar, Typography } from "@mui/material";
import SportsFootballIcon from "@mui/icons-material/SportsFootball";
import AddIcon from "@mui/icons-material/Add";
import Button from "../ui/Button";

const Header = ({ onAddPlayer = () => {}, className = "" }) => {
  return (
    <AppBar position="static" className={`app-header ${className}`}>
      <Toolbar className="app-header__toolbar">
        <div className="app-header__brand">
          <SportsFootballIcon className="app-header__icon" />
          <Typography variant="h6" className="app-header__title">
            Football Players Manager
          </Typography>
        </div>

        <div className="app-header__actions">
          <Button
            variant="contained"
            color="secondary"
            startIcon={<AddIcon />}
            onClick={onAddPlayer}
            className="app-header__add-button"
          >
            Add Player
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
