import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { AppProvider } from "./contexts/AppContext";

import PlayersListPage from "./pages/PlayersListPage";
import PlayerDetailsPage from "./pages/PlayerDetailsPage";
import PlayerFormPage from "./pages/PlayerFormPage";

function App() {
  return (
    <>
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
    </>
  );
}

export default App;
