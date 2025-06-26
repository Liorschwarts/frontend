import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import muiTheme from "./theme/muiTheme";

// Import CSS files
import "./styles/globals.css";
import "./styles/variables.css";
import "./styles/mui-overrides.css";
import "./components/ui/ui.css";
import "./components/layout/layout.css";
import "./components/players/display/display.css";
import "./components/players/table/table.css";
import "./components/players/forms/forms.css";
import "./components/players/details/details.css";
import "./pages/pages.css";
import "./App.css";

// Import pages
import PlayersListPage from "./pages/PlayersListPage";
import PlayerDetailsPage from "./pages/PlayerDetailsPage";
import AddPlayerPage from "./pages/AddPlayerPage";
import EditPlayerPage from "./pages/EditPlayerPage";

function App() {
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Router>
        <div className="app">
          <Routes>
            {/* Redirect root to players list */}
            <Route path="/" element={<Navigate to="/players" replace />} />

            {/* Players routes */}
            <Route path="/players" element={<PlayersListPage />} />
            <Route path="/players/add" element={<AddPlayerPage />} />
            <Route path="/players/:id" element={<PlayerDetailsPage />} />
            <Route path="/players/:id/edit" element={<EditPlayerPage />} />

            {/* Catch all - redirect to players */}
            <Route path="*" element={<Navigate to="/players" replace />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
