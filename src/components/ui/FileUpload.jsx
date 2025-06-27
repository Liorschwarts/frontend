import { useRef, useState } from "react";
import { Box, Typography, Alert, styled } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Button from "./Button";
import { theme } from "../../styles/theme";

const UploadContainer = styled(Box)({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing.md,
});

const UploadButton = styled(Button)({
  background: `linear-gradient(135deg, ${theme.colors.primary.main}, ${theme.colors.primary.dark})`,
  color: "white",
  padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
  borderRadius: theme.borderRadius.md,
  border: `2px dashed ${theme.colors.primary.light}`,
  fontSize: "1rem",
  fontWeight: 600,
  transition: "all 0.3s ease",

  "&:hover": {
    background: `linear-gradient(135deg, ${theme.colors.primary.light}, ${theme.colors.primary.main})`,
    transform: "translateY(-2px)",
    borderColor: theme.colors.primary.main,
  },

  "&:disabled": {
    opacity: 0.6,
    transform: "none",
  },
});

const FileInfo = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing.sm,
  padding: theme.spacing.md,
  background: "rgba(46, 125, 50, 0.1)",
  border: `1px solid ${theme.colors.status.success}40`,
  borderRadius: theme.borderRadius.sm,
  backdropFilter: "blur(5px)",
});

const FileName = styled(Typography)({
  color: theme.colors.status.success,
  fontWeight: 600,
  fontSize: "0.9rem",
});

const ErrorAlert = styled(Alert)({
  borderRadius: theme.borderRadius.sm,
  "& .MuiAlert-message": {
    fontSize: "0.9rem",
  },
});

const HiddenInput = styled("input")({
  display: "none",
});

const FileUpload = ({
  onFileSelect = () => {},
  disabled = false,
  className = "",
}) => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");

  const handleFileSelect = (file) => {
    if (!file.name.toLowerCase().endsWith(".csv")) {
      setError("Please select a CSV file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB");
      return;
    }

    setError("");
    setSelectedFile(file);
    onFileSelect(file);
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <UploadContainer className={className}>
      <HiddenInput
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleInputChange}
        disabled={disabled}
      />

      <UploadButton
        variant="contained"
        onClick={handleButtonClick}
        disabled={disabled}
        startIcon={<CloudUploadIcon />}
        fullWidth
      >
        {selectedFile ? "Change CSV File" : "Select CSV File"}
      </UploadButton>

      {selectedFile && (
        <FileInfo>
          <CheckCircleIcon sx={{ color: theme.colors.status.success }} />
          <FileName>Selected: {selectedFile.name}</FileName>
        </FileInfo>
      )}

      {error && <ErrorAlert severity="error">{error}</ErrorAlert>}
    </UploadContainer>
  );
};

export default FileUpload;
