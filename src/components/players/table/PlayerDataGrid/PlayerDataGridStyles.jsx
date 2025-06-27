import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material";
import { theme } from "../../../../styles/theme";

export const StyledDataGrid = styled(DataGrid)({
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

export const GridWrapper = styled("div")({
  width: "100%",
});
