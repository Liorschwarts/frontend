import { DataGrid } from "@mui/x-data-grid";
import { IconButton, styled } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CountryFlags from "../display/CountryFlags";
import HeightDisplay from "../display/HeightDisplay";
import PositionBadges from "../display/PositionBadges";
import { theme } from "../../../styles/theme";

const StyledDataGrid = styled(DataGrid)({
  border: "none",
  borderRadius: theme.borderRadius.md,
  background: theme.effects.glassmorphism.background,
  width: "100%",
  minHeight: "400px",
  fontSize: "0.9rem",

  "& .MuiDataGrid-main": {
    borderRadius: theme.borderRadius.md,
  },

  "& .MuiDataGrid-columnHeaders": {
    borderBottom: "1px solid rgba(8, 6, 6, 0.1)",
    minHeight: "56px",
    borderRadius: `${theme.borderRadius.md} ${theme.borderRadius.md} 0 0`,
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",

    "& .MuiDataGrid-columnHeader": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      padding: "0 16px",
      color: `${theme.colors.text.primary} !important`,
    },

    "& .MuiDataGrid-columnHeaderTitleContainer": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      color: `${theme.colors.text.primary} !important`,
    },

    "& .MuiDataGrid-columnHeaderTitle": {
      color: `${theme.colors.text.primary} !important`,
      fontWeight: "600 !important",
      fontSize: "0.9rem !important",
      textTransform: "uppercase",
      letterSpacing: "0.5px",
      textAlign: "center",
      width: "100%",
    },

    "& .MuiDataGrid-columnSeparator": {
      color: "rgba(0, 0, 0, 0.2) !important",
    },

    "& .MuiDataGrid-iconButtonContainer": {
      color: `${theme.colors.text.primary} !important`,
    },

    "& .MuiDataGrid-sortIcon": {
      color: `${theme.colors.text.primary} !important`,
    },

    "& .MuiDataGrid-menuIcon": {
      color: `${theme.colors.text.primary} !important`,
    },

    "& .MuiDataGrid-menuIconButton": {
      color: `${theme.colors.text.primary} !important`,
    },
  },

  "& .MuiDataGrid-row": {
    borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
    minHeight: "64px",

    "&:hover": {
      backgroundColor: "rgba(59, 130, 246, 0.1)",
      transform: "none",
    },

    "&.Mui-selected": {
      backgroundColor: "rgba(59, 130, 246, 0.2)",
      "&:hover": {
        backgroundColor: "rgba(59, 130, 246, 0.3)",
      },
    },
  },

  "& .MuiDataGrid-cell": {
    padding: theme.spacing.md,
    borderBottom: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.9rem",
    color: theme.colors.text.primary,
    fontWeight: 500,
    textAlign: "center",

    "&:focus": {
      outline: "none",
    },

    "& > *": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
  },

  "& .MuiDataGrid-footerContainer": {
    borderTop: "1px solid rgba(0, 0, 0, 0.1)",
    minHeight: "52px",
    borderRadius: `0 0 ${theme.borderRadius.md} ${theme.borderRadius.md}`,

    "& .MuiTablePagination-root": {
      color: theme.colors.text.primary,
    },

    "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
      color: theme.colors.text.primary,
      fontWeight: 500,
    },

    "& .MuiSelect-icon": {
      color: theme.colors.text.primary,
    },

    "& .MuiIconButton-root": {
      color: theme.colors.text.primary,
    },
  },

  "& .MuiDataGrid-virtualScroller": {
    "&::-webkit-scrollbar": {
      width: "8px",
      height: "8px",
    },
    "&::-webkit-scrollbar-track": {
      background: "rgba(0, 0, 0, 0.1)",
      borderRadius: "4px",
    },
    "&::-webkit-scrollbar-thumb": {
      background: theme.colors.primary.main,
      borderRadius: "4px",
      "&:hover": {
        background: theme.colors.primary.dark,
      },
    },
  },
});

const PlayerNameCell = styled("div")({
  fontWeight: 600,
  color: theme.colors.text.primary,
  fontSize: "0.95rem",
  textAlign: "center",
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
  color: theme.colors.text.secondary,
  backgroundColor: "rgba(0, 0, 0, 0.05)",
  padding: "4px 8px",
  borderRadius: theme.borderRadius.sm,
  border: "1px solid rgba(0, 0, 0, 0.1)",
  fontWeight: 500,
});

const PlayerActionsContainer = styled("div")({
  display: "flex",
  gap: theme.spacing.sm,
  alignItems: "center",
  justifyContent: "center",
});

const ActionButton = styled(IconButton)(({ actiontype }) => {
  const getActionStyles = () => {
    switch (actiontype) {
      case "view":
        return {
          background: `${theme.colors.status.info}20`,
          color: theme.colors.status.info,
          border: `1px solid ${theme.colors.status.info}30`,
          "&:hover": {
            background: `${theme.colors.status.info}30`,
            transform: "scale(1.1)",
          },
        };
      case "edit":
        return {
          background: `${theme.colors.status.warning}20`,
          color: theme.colors.status.warning,
          border: `1px solid ${theme.colors.status.warning}30`,
          "&:hover": {
            background: `${theme.colors.status.warning}30`,
            transform: "scale(1.1)",
          },
        };
      case "delete":
        return {
          background: `${theme.colors.status.error}20`,
          color: theme.colors.status.error,
          border: `1px solid ${theme.colors.status.error}30`,
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

const EmptyStateContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing["3xl"],
  background: theme.effects.glassmorphism.background,
  borderRadius: theme.borderRadius.lg,
  border: `1px solid ${theme.colors.divider}`,
  color: theme.colors.text.secondary,
  fontSize: "1.1rem",
});

const PlayerDataGrid = ({
  players = [],
  loading = false,
  pagination = {},
  onView = () => {},
  onEdit = () => {},
  onDelete = () => {},
  onPageChange = () => {},
  onPageSizeChange = () => {},
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

  const handlePaginationModelChange = (paginationModel) => {
    const { page, pageSize } = paginationModel;

    if (page !== pagination.currentPage) {
      onPageChange(page);
    }

    if (pageSize !== pagination.pageSize) {
      onPageSizeChange(pageSize);
    }
  };

  if (!players || players.length === 0) {
    return (
      <EmptyStateContainer className={className}>
        <span style={{ fontSize: "3rem", marginBottom: "1rem" }}>⚽</span>
        <p>{loading ? "Loading players..." : "No players found"}</p>
      </EmptyStateContainer>
    );
  }

  return (
    <div className={className} style={{ width: "100%" }}>
      <StyledDataGrid
        rows={players}
        columns={columns}
        loading={loading}
        paginationMode="server"
        paginationModel={{
          page: pagination.currentPage || 0,
          pageSize: pagination.pageSize || 10,
        }}
        onPaginationModelChange={handlePaginationModelChange}
        rowCount={pagination.totalElements || 0}
        pageSizeOptions={[5, 10, 20, 50]}
        disableSelectionOnClick
        getRowId={(row) => row.id}
        disableColumnMenu
        disableColumnSelector
        disableDensitySelector
        sx={{
          "& .MuiDataGrid-row": {
            cursor: "pointer",
          },
          "& .MuiDataGrid-columnHeaders": {
            background: theme.effects.glassmorphism.background,
            backdropFilter: "blur(10px)",
            "& .MuiDataGrid-columnHeaderTitle": {
              color: `${theme.colors.text.primary}`,
              fontWeight: "600 !important",
            },
          },
          "& .MuiDataGrid-columnHeader": {
            background: "transparent !important",
            color: `${theme.colors.text.primary}`,
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "1px solid rgba(0, 0, 0, 0.1)",
            "& .MuiTablePagination-root": {
              color: theme.colors.text.primary,
            },
            "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows":
              {
                color: theme.colors.text.primary,
                fontWeight: 500,
              },
          },
        }}
      />
    </div>
  );
};

export default PlayerDataGrid;
