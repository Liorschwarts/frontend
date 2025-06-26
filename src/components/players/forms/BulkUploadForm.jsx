import React, { useState } from "react";
import { Paper, Typography, Alert, LinearProgress } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import CancelIcon from "@mui/icons-material/Cancel";
import FileUpload from "../../ui/FileUpload";
import Button from "../../ui/Button";

const BulkUploadForm = ({
  onUpload = () => {},
  onCancel = () => {},
  loading = false,
  className = "",
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [result, setResult] = useState(null);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setResult(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      setUploadProgress(0);
      const result = await onUpload(selectedFile, (progress) => {
        setUploadProgress(progress);
      });
      setResult(result);
      setSelectedFile(null);
    } catch (error) {
      setResult({
        success: false,
        message: error.message || "Upload failed",
      });
    }
  };

  return (
    <Paper className={`bulk-upload-form ${className}`}>
      <div className="bulk-upload-form__header">
        <Typography variant="h5" className="bulk-upload-form__title">
          Bulk Upload Players
        </Typography>
        <Typography variant="body2" className="bulk-upload-form__subtitle">
          Upload a CSV file with multiple players
        </Typography>
      </div>

      <div className="bulk-upload-form__content">
        <Alert severity="info" className="bulk-upload-form__info">
          <Typography variant="body2">
            <strong>CSV Format Required:</strong>
            <br />
            firstName,lastName,dateOfBirth,nationalities,positions,height
            <br />
            Example: John,Doe,1995-05-15,"br,ar","ST,CF",185
          </Typography>
        </Alert>

        <FileUpload
          onFileSelect={handleFileSelect}
          disabled={loading}
          className="bulk-upload-form__upload"
        />

        {loading && (
          <div className="bulk-upload-form__progress">
            <Typography
              variant="body2"
              className="bulk-upload-form__progress-text"
            >
              Uploading... {uploadProgress}%
            </Typography>
            <LinearProgress
              variant="determinate"
              value={uploadProgress}
              className="bulk-upload-form__progress-bar"
            />
          </div>
        )}

        {result && (
          <Alert
            severity={result.success ? "success" : "error"}
            className="bulk-upload-form__result"
          >
            {result.message}
            {result.success && result.count && (
              <Typography variant="body2">
                Successfully uploaded {result.count} players
              </Typography>
            )}
          </Alert>
        )}
      </div>

      <div className="bulk-upload-form__actions">
        <Button
          variant="outlined"
          onClick={onCancel}
          startIcon={<CancelIcon />}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleUpload}
          startIcon={<UploadIcon />}
          disabled={!selectedFile || loading}
        >
          {loading ? "Uploading..." : "Upload Players"}
        </Button>
      </div>
    </Paper>
  );
};

export default BulkUploadForm;
