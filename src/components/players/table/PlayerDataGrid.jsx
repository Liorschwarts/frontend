import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CountryFlags from "../display/CountryFlags";
import HeightDisplay from "../display/HeightDisplay";
import PositionBadges from "../display/PositionBadges";

// Import CSS
import "./table.css";
import "../display/display.css";

const PlayerDataGrid = ({
  players = [],
  loading = false,
  onView = () => {},
  onEdit = () => {},
  onDelete = () => {},
  className = "",
}) => {
  console.log("PlayerDataGrid received players:", players);
  console.log("Players length:", players.length);

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
      width: 200,
      renderCell: (params) => (
        <div className="player-name">
          {params.row.firstName} {params.row.lastName}
        </div>
      ),
    },
    {
      field: "nationalities",
      headerName: "Nationality",
      width: 120,
      renderCell: (params) => {
        console.log("Countries data:", params.row.countries);
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
      width: 80,
      renderCell: (params) => (
        <span className="player-age">{calculateAge(params.value)}</span>
      ),
    },
    {
      field: "positions",
      headerName: "Positions",
      width: 200,
      renderCell: (params) => {
        console.log("Positions data:", params.row.positions);
        const positions = params.row.positions || [];
        const positionCodes = positions.map((position) => position.code);
        return <PositionBadges positions={positionCodes} size="small" />;
      },
    },
    {
      field: "height",
      headerName: "Height",
      width: 100,
      renderCell: (params) => {
        console.log("Height data:", params.row.heightCm);
        return (
          <HeightDisplay height={params.row.heightCm} showToggle={false} />
        );
      },
    },
    {
      field: "creationDate",
      headerName: "Created",
      width: 120,
      renderCell: (params) => (
        <span className="player-date">
          {new Date(params.value).toLocaleDateString()}
        </span>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      sortable: false,
      renderCell: (params) => (
        <div className="player-actions">
          <IconButton
            size="small"
            onClick={() => onView(params.row)}
            title="View Details"
            className="action-button action-button--view"
          >
            <VisibilityIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => onEdit(params.row)}
            title="Edit Player"
            className="action-button action-button--edit"
          >
            <EditIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => onDelete(params.row)}
            title="Delete Player"
            className="action-button action-button--delete"
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  if (!players || players.length === 0) {
    return (
      <div className="player-data-grid-empty">
        <p>No players found</p>
      </div>
    );
  }

  return (
    <div className={`player-data-grid ${className}`}>
      <DataGrid
        rows={players}
        columns={columns}
        loading={loading}
        disableSelectionOnClick
        autoHeight
        pageSize={25}
        rowsPerPageOptions={[10, 25, 50, 100]}
        className="player-data-grid__table"
        getRowId={(row) => row.id}
      />
    </div>
  );
};

export default PlayerDataGrid;
