import React, { useMemo, useCallback } from "react";
import CountryFlags from "../../display/CountryFlags";
import HeightDisplay from "../../display/HeightDisplay";
import PositionBadges from "../../display/PositionBadges";
import PlayerActionButtons from "./PlayerActionButtons";
import {
  PlayerNameCell,
  PlayerAgeCell,
  PlayerDateCell,
  EmptyStateContainer,
} from "./PlayerDataGridCells";
import { StyledDataGrid, GridWrapper } from "./PlayerDataGridStyles";

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
  const calculateAge = useMemo(() => {
    return (birthDate) => {
      if (!birthDate) return "";
      const today = new Date();
      const birth = new Date(birthDate);
      return today.getFullYear() - birth.getFullYear();
    };
  }, []);

  const columns = useMemo(
    () => [
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
        renderCell: (params) => (
          <HeightDisplay height={params.row.heightCm} showToggle={false} />
        ),
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
          <PlayerActionButtons
            player={params.row}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ),
      },
    ],
    [calculateAge, onView, onEdit, onDelete]
  );

  const handlePaginationModelChange = useCallback(
    (paginationModel) => {
      const { page, pageSize } = paginationModel;

      if (page !== pagination.currentPage) {
        onPageChange(page);
      }

      if (pageSize !== pagination.pageSize) {
        onPageSizeChange(pageSize);
      }
    },
    [
      pagination.currentPage,
      pagination.pageSize,
      onPageChange,
      onPageSizeChange,
    ]
  );

  if (!players || players.length === 0) {
    return (
      <EmptyStateContainer className={className}>
        <span>⚽</span>
        <p>{loading ? "Loading players..." : "No players found"}</p>
      </EmptyStateContainer>
    );
  }

  return (
    <GridWrapper className={className}>
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
      />
    </GridWrapper>
  );
};

export default React.memo(PlayerDataGrid);
