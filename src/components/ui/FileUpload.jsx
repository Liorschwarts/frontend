import { useRef, useState } from "react";
import { Box, Typography, Alert } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "./Button";

const FileUpload = ({
  onFileSelect = () => {},
  disabled = false,
  className = "",
}) => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");

  const handleFileSelect = (file) => {
    // Validate CSV file
    if (!file.name.toLowerCase().endsWith(".csv")) {
      setError("Please select a CSV file");
      return;
    }

    // Max 5MB
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

  return (
    <Box className={`file-upload ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv"
        onChange={handleInputChange}
        disabled={disabled}
        style={{ display: "none" }}
      />

      <Button
        variant="outlined"
        onClick={() => fileInputRef.current?.click()}
        disabled={disabled}
        startIcon={<CloudUploadIcon />}
        fullWidth
      >
        Select CSV File
      </Button>

      {selectedFile && (
        <Typography variant="body2" className="file-upload-selected">
          Selected: {selectedFile.name}
        </Typography>
      )}

      {error && (
        <Alert severity="error" className="file-upload-error">
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default FileUpload;
