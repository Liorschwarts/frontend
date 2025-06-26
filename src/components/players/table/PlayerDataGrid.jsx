import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton, styled } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CountryFlags from "../display/CountryFlags";
import HeightDisplay from "../display/HeightDisplay";
import PositionBadges from "../display/PositionBadges";
import { theme } from "../../../styles/theme";

// Styled Components
const StyledDataGrid = styled(DataGrid)({
  border: "none",
  borderRadius: 0,
  background: "transparent",
  width: "100%",
  minHeight: "400px",

  "& .MuiDataGrid-main": {
    borderRadius: 0,
  },

  "& .MuiDataGrid-topContainer": {
    background: `linear-gradient(135deg, ${theme.colors.primary.main}, ${theme.colors.primary.dark})`,
  },

  "& .MuiDataGrid-container--top": {
    background: `linear-gradient(135deg, ${theme.colors.primary.main}, ${theme.colors.primary.dark})`,
  },

  "& .MuiDataGrid-columnHeaders": {
    background: `linear-gradient(135deg, ${theme.colors.primary.main}, ${theme.colors.primary.dark})`,
    borderBottom: "none",
    minHeight: "56px",

    "& .MuiDataGrid-columnHeader": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
    },

    "& .MuiDataGrid-columnHeaderTitleContainer": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },

    "& .MuiDataGrid-columnHeaderTitle": {
      color: "white",
      fontWeight: 700,
      fontSize: "0.95rem",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      textAlign: "center",
      width: "100%",
    },
  },

  "& .MuiDataGrid-row": {
    backgroundColor: "#2a3142",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    minHeight: "64px",

    "&:nth-of-type(even)": {
      backgroundColor: "#343a4d",
    },

    "&:hover": {
      backgroundColor: "#4f5365",
      transform: "none",
    },
  },

  "& .MuiDataGrid-cell": {
    padding: theme.spacing.md,
    borderBottom: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.9rem",
    color: "#ffffff",
    fontWeight: 500,
    textAlign: "center",

    "& > *": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
  },

  "& .MuiDataGrid-footerContainer": {
    background: "#2a3142",
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
    minHeight: "52px",

    "& .MuiTablePagination-root": {
      color: "#ffffff",
    },

    "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
      color: "#ffffff",
    },

    "& .MuiSelect-icon": {
      color: "#ffffff",
    },
  },
});

const PlayerNameCell = styled("div")({
  fontWeight: 600,
  color: "white",
  fontSize: "0.95rem",
});

const PlayerAgeCell = styled("span")({
  fontWeight: 600,
  color: "white",
  backgroundColor: theme.colors.primary.main,
  padding: "6px 12px",
  borderRadius: theme.borderRadius.full,
  fontSize: "0.85rem",
  boxShadow: theme.shadows.sm,
});

const PlayerDateCell = styled("span")({
  fontSize: "0.85rem",
  color: "white",
  backgroundColor: "rgba(255, 255, 255, 0.2)",
  padding: "4px 8px",
  borderRadius: theme.borderRadius.sm,
  border: "1px solid rgba(255, 255, 255, 0.3)",
});

const PlayerActionsContainer = styled("div")({
  display: "flex",
  gap: theme.spacing.xs,
  alignItems: "center",
});

const ActionButton = styled(IconButton)(({ actiontype }) => {
  const getActionStyles = () => {
    switch (actiontype) {
      case "view":
        return {
          background: `${theme.colors.status.info}30`,
          color: theme.colors.status.info,
          border: `1px solid ${theme.colors.status.info}50`,
          "&:hover": {
            background: `${theme.colors.status.info}50`,
            transform: "scale(1.1)",
          },
        };
      case "edit":
        return {
          background: `${theme.colors.status.warning}30`,
          color: theme.colors.status.warning,
          border: `1px solid ${theme.colors.status.warning}50`,
          "&:hover": {
            background: `${theme.colors.status.warning}50`,
            transform: "scale(1.1)",
          },
        };
      case "delete":
        return {
          background: `${theme.colors.status.error}30`,
          color: theme.colors.status.error,
          border: `1px solid ${theme.colors.status.error}50`,
          "&:hover": {
            background: `${theme.colors.status.error}50`,
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
    backdropFilter: "blur(5px)",
    ...getActionStyles(),
  };
});

const EmptyStateContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing["3xl"],
  background: theme.effects.glassmorphism.background,
  backdropFilter: theme.effects.glassmorphism.backdropFilter,
  borderRadius: theme.borderRadius.lg,
  border: theme.effects.glassmorphism.border,
  color: theme.colors.text.secondary,
  fontSize: "1.1rem",
});

const PlayerDataGrid = ({
  players = [],
  loading = false,
  onView = () => {},
  onEdit = () => {},
  onDelete = () => {},
  className = "",
}) => {
  const calculateAge = (birthDate) => {
    if (!birthDate) return "";
    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    return age;
  };

  const columns = [
    {
      field: "fullName",
      headerName: "Name",
      flex: 2,
      minWidth: 200,
      renderCell: (params) => (
        <PlayerNameCell>
          {params.row.firstName} {params.row.lastName}
        </PlayerNameCell>
      ),
    },
    {
      field: "nationalities",
      headerName: "Nationality",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => {
        const countries = params.row.countries || [];
        const nationalityCodes = countries.map((country) =>
          country.code.toLowerCase()
        );
        return <CountryFlags nationalities={nationalityCodes} size="small" />;
      },
    },
    {
      field: "dateOfBirth",
      headerName: "Age",
      flex: 0.5,
      minWidth: 80,
      renderCell: (params) => (
        <PlayerAgeCell>{calculateAge(params.value)}</PlayerAgeCell>
      ),
    },
    {
      field: "positions",
      headerName: "Positions",
      flex: 2,
      minWidth: 200,
      renderCell: (params) => {
        const positions = params.row.positions || [];
        const positionCodes = positions.map((position) => position.code);
        return <PositionBadges positions={positionCodes} size="small" />;
      },
    },
    {
      field: "height",
      headerName: "Height",
      flex: 1,
      minWidth: 100,
      renderCell: (params) => {
        return (
          <HeightDisplay height={params.row.heightCm} showToggle={false} />
        );
      },
    },
    {
      field: "creationDate",
      headerName: "Created",
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <PlayerDateCell>
          {new Date(params.value).toLocaleDateString()}
        </PlayerDateCell>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      minWidth: 140,
      sortable: false,
      renderCell: (params) => (
        <PlayerActionsContainer>
          <ActionButton
            size="small"
            onClick={() => onView(params.row)}
            actiontype="view"
            title="View Details"
          >
            <VisibilityIcon fontSize="small" />
          </ActionButton>
          <ActionButton
            size="small"
            onClick={() => onEdit(params.row)}
            actiontype="edit"
            title="Edit Player"
          >
            <EditIcon fontSize="small" />
          </ActionButton>
          <ActionButton
            size="small"
            onClick={() => onDelete(params.row)}
            actiontype="delete"
            title="Delete Player"
          >
            <DeleteIcon fontSize="small" />
          </ActionButton>
        </PlayerActionsContainer>
      ),
    },
  ];

  if (!players || players.length === 0) {
    return (
      <EmptyStateContainer className={className}>
        <span>⚽</span>
        <p>No players found</p>
      </EmptyStateContainer>
    );
  }

  return (
    <div className={className} style={{ width: "100%" }}>
      <StyledDataGrid
        rows={players}
        columns={columns}
        loading={loading}
        disableSelectionOnClick
        autoHeight
        pageSize={25}
        rowsPerPageOptions={[10, 25, 50, 100]}
        getRowId={(row) => row.id}
        disableColumnMenu
        disableColumnSelector
        disableDensitySelector
      />
    </div>
  );
};

export default PlayerDataGrid;
