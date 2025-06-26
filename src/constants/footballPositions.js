// Football Positions Constants

export const POSITIONS = {
  // Defenders
  CB: {
    code: "CB",
    name: "Centre-Back",
    category: "Defenders",
    color: "#1976d2",
  },
  RB: {
    code: "RB",
    name: "Right-Back",
    category: "Defenders",
    color: "#1976d2",
  },
  LB: {
    code: "LB",
    name: "Left-Back",
    category: "Defenders",
    color: "#1976d2",
  },
  LWB: {
    code: "LWB",
    name: "Left Wing-Back",
    category: "Defenders",
    color: "#1976d2",
  },
  RWB: {
    code: "RWB",
    name: "Right Wing-Back",
    category: "Defenders",
    color: "#1976d2",
  },

  // Midfielders
  CDM: {
    code: "CDM",
    name: "Defensive Midfielder",
    category: "Midfielders",
    color: "#2e7d32",
  },
  CM: {
    code: "CM",
    name: "Centre Midfielder",
    category: "Midfielders",
    color: "#2e7d32",
  },
  CAM: {
    code: "CAM",
    name: "Central Attacking Midfielder",
    category: "Midfielders",
    color: "#2e7d32",
  },
  RM: {
    code: "RM",
    name: "Right Midfielder",
    category: "Midfielders",
    color: "#2e7d32",
  },
  LM: {
    code: "LM",
    name: "Left Midfielder",
    category: "Midfielders",
    color: "#2e7d32",
  },

  // Forwards
  RF: {
    code: "RF",
    name: "Right Forward",
    category: "Forwards",
    color: "#d32f2f",
  },
  LF: {
    code: "LF",
    name: "Left Forward",
    category: "Forwards",
    color: "#d32f2f",
  },
  CF: {
    code: "CF",
    name: "Centre Forward",
    category: "Forwards",
    color: "#d32f2f",
  },
  ST: { code: "ST", name: "Striker", category: "Forwards", color: "#d32f2f" },
  LW: { code: "LW", name: "Left Wing", category: "Forwards", color: "#d32f2f" },
  RW: {
    code: "RW",
    name: "Right Wing",
    category: "Forwards",
    color: "#d32f2f",
  },
};

export const POSITION_CATEGORIES = {
  Defenders: {
    name: "Defenders",
    positions: ["CB", "RB", "LB", "LWB", "RWB"],
    color: "#1976d2",
  },
  Midfielders: {
    name: "Midfielders",
    positions: ["CDM", "CM", "CAM", "RM", "LM"],
    color: "#2e7d32",
  },
  Forwards: {
    name: "Forwards",
    positions: ["RF", "LF", "CF", "ST", "LW", "RW"],
    color: "#d32f2f",
  },
};

// Helper functions
export const getPositionsByCategory = (category) => {
  return POSITION_CATEGORIES[category]?.positions || [];
};

export const getPositionInfo = (positionCode) => {
  return POSITIONS[positionCode] || null;
};

export const getAllPositions = () => {
  return Object.values(POSITIONS);
};

export const getPositionCategories = () => {
  return Object.keys(POSITION_CATEGORIES);
};
