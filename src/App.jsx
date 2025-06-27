import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import muiTheme from "./theme/muiTheme";
import { AppProvider } from "./contexts/AppContext";

import PlayersListPage from "./pages/PlayersListPage";
import PlayerDetailsPage from "./pages/PlayerDetailsPage";
import PlayerFormPage from "./pages/PlayerFormPage";

function App() {
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <AppProvider>
        <Router>
          <div className="app">
            <Routes>
              <Route path="/" element={<Navigate to="/players" replace />} />

              <Route path="/players" element={<PlayersListPage />} />
              <Route path="/players/add" element={<PlayerFormPage />} />
              <Route path="/players/:id" element={<PlayerDetailsPage />} />
              <Route path="/players/:id/edit" element={<PlayerFormPage />} />

              <Route path="*" element={<Navigate to="/players" replace />} />
            </Routes>
          </div>
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
