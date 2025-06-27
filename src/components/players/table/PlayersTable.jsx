import { Box, Typography, styled } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import PlayerDataGrid from "./PlayerDataGrid";
import FiltersPanel from "./FiltersPanel";
import Button from "../../ui/Button";
import { theme } from "../../../styles/theme";

const TableContainer = styled(Box)({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.sm,
});

const TableHeader = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing.md,
});

const TableTitle = styled(Typography)({
  color: "white",
  fontWeight: 700,
  fontSize: "1.5rem",
  textShadow: "0 2px 4px rgba(0,0,0,0.3)",
  background: "rgba(255, 255, 255, 0.1)",
  padding: theme.spacing.md,
  borderRadius: theme.borderRadius.md,
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
});

const HeaderActions = styled("div")({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing.sm,
});

const BulkUploadButton = styled(Button)({
  background: `linear-gradient(135deg, ${theme.colors.secondary.main}, ${theme.colors.secondary.dark})`,
  color: "white",
  padding: `${theme.spacing.md} ${theme.spacing.lg}`,
  borderRadius: theme.borderRadius.md,
  fontWeight: 600,
  fontSize: "0.9rem",
  textTransform: "none",
  boxShadow: theme.shadows.md,
  border: "2px solid rgba(255, 255, 255, 0.2)",
  backdropFilter: theme.effects.backdropBlur,
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",

  "&:hover": {
    background: `linear-gradient(135deg, ${theme.colors.secondary.light}, ${theme.colors.secondary.main})`,
    transform: "translateY(-2px) scale(1.05)",
    boxShadow: theme.shadows.lg,
    border: "2px solid rgba(255, 255, 255, 0.4)",
  },

  "&:active": {
    transform: "translateY(0) scale(1.02)",
  },
});

const GridContainer = styled("div")({
  background: theme.effects.glassmorphism.background,
  backdropFilter: theme.effects.glassmorphism.backdropFilter,
  border: theme.effects.glassmorphism.border,
  borderRadius: theme.borderRadius.lg,
  boxShadow: theme.shadows.lg,
  overflow: "hidden",
  width: "100%",
});

const PlayersTable = ({
  players = [],
  loading = false,
  pagination = {},
  onView = () => {},
  onEdit = () => {},
  onDelete = () => {},
  onPageChange = () => {},
  onBulkUpload = () => {},
  onSearch = () => {},
  onPageSizeChange = () => {},
  onClearFilters = () => {},
  className = "",
}) => {
  const handlePageChange = (newPage) => {
    onPageChange(newPage);
  };

  const handlePageSizeChange = (newPageSize) => {
    onPageSizeChange(newPageSize);
  };

  const handleSearch = (searchCriteria) => {
    onSearch(searchCriteria);
  };

  const handleClearFilters = () => {
    onClearFilters();
  };

  return (
    <TableContainer className={className}>
      <TableHeader>
        <TableTitle>
          Players ({pagination.totalElements || players.length})
        </TableTitle>

        <HeaderActions>
          <BulkUploadButton
            variant="contained"
            onClick={onBulkUpload}
            startIcon={<CloudUploadIcon />}
          >
            Upload CSV
          </BulkUploadButton>
        </HeaderActions>
      </TableHeader>

      <FiltersPanel
        onSearch={handleSearch}
        onClear={handleClearFilters}
        loading={loading}
      />

      <GridContainer>
        <PlayerDataGrid
          players={players}
          loading={loading}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
          pagination={pagination}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </GridContainer>
    </TableContainer>
  );
};

export default PlayersTable;
