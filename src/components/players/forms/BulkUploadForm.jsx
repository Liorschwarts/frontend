import React, { useState } from "react";
import {
  Paper,
  Typography,
  Alert,
  LinearProgress,
  styled,
  Box,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FileUpload from "../../ui/FileUpload";
import Button from "../../ui/Button";
import { theme } from "../../../styles/theme";

// Styled Components
const UploadContainer = styled(Paper)({
  background: theme.effects.glassmorphism.background,
  backdropFilter: theme.effects.glassmorphism.backdropFilter,
  border: theme.effects.glassmorphism.border,
  borderRadius: theme.borderRadius.xl,
  boxShadow: theme.shadows.lg,
  padding: theme.spacing["3xl"],
  maxWidth: "600px",
  margin: "0 auto",
  textAlign: "center",
});

const UploadHeader = styled(Box)({
  marginBottom: theme.spacing.xl,
});

const UploadTitle = styled(Typography)({
  color: theme.colors.text.primary,
  fontWeight: 700,
  fontSize: "1.75rem",
  marginBottom: theme.spacing.sm,
});

const UploadSubtitle = styled(Typography)({
  color: theme.colors.text.secondary,
  fontSize: "1rem",
});

const InfoAlert = styled(Alert)({
  marginBottom: theme.spacing.xl,
  borderRadius: theme.borderRadius.md,
  textAlign: "left",

  "& .MuiAlert-message": {
    fontSize: "0.9rem",
  },
});

const ProgressContainer = styled(Box)({
  marginTop: theme.spacing.lg,
  marginBottom: theme.spacing.lg,
});

const ProgressText = styled(Typography)({
  color: theme.colors.text.secondary,
  fontSize: "0.9rem",
  marginBottom: theme.spacing.sm,
});

const StyledProgress = styled(LinearProgress)({
  height: "8px",
  borderRadius: theme.borderRadius.sm,
  background: "rgba(255, 255, 255, 0.2)",

  "& .MuiLinearProgress-bar": {
    background: `linear-gradient(90deg, ${theme.colors.primary.main}, ${theme.colors.secondary.main})`,
  },
});

const ResultAlert = styled(Alert)({
  marginTop: theme.spacing.lg,
  borderRadius: theme.borderRadius.md,
  textAlign: "left",
});

const ActionsContainer = styled(Box)({
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing.lg,
  marginTop: theme.spacing.xl,
});

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
    setUploadProgress(0);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      setUploadProgress(0);
      const result = await onUpload(selectedFile, (progress) => {
        setUploadProgress(progress);
      });

      setResult({
        success: true,
        message: `Successfully uploaded ${result.count || 0} players! 🎉`,
        count: result.count,
      });

      setSelectedFile(null);
    } catch (error) {
      setResult({
        success: false,
        message: error.message || "Upload failed ❌",
      });
    }
  };

  const isUploading = loading || uploadProgress > 0;

  return (
    <UploadContainer className={className}>
      <UploadHeader>
        <UploadTitle>Bulk Upload Players</UploadTitle>
        <UploadSubtitle>
          Upload multiple players at once using a CSV file
        </UploadSubtitle>
      </UploadHeader>

      <InfoAlert severity="info">
        <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
          CSV Format Required:
        </Typography>
        <Typography variant="body2" component="div">
          firstName,lastName,dateOfBirth,nationalities,positions,height
          <br />
          <strong>Example:</strong> John,Doe,1995-05-15,"br,ar","ST,CF",185
        </Typography>
      </InfoAlert>

      <FileUpload onFileSelect={handleFileSelect} disabled={isUploading} />

      {isUploading && (
        <ProgressContainer>
          <ProgressText>Uploading players... {uploadProgress}%</ProgressText>
          <StyledProgress variant="determinate" value={uploadProgress} />
        </ProgressContainer>
      )}

      {result && (
        <ResultAlert severity={result.success ? "success" : "error"}>
          <Typography variant="body2">{result.message}</Typography>
          {result.success && result.count > 0 && (
            <Typography variant="body2" sx={{ mt: 1, fontWeight: 600 }}>
              {result.count} players added to the database
            </Typography>
          )}
        </ResultAlert>
      )}

      <ActionsContainer>
        <Button
          variant="outlined"
          onClick={onCancel}
          startIcon={<CancelIcon />}
          disabled={isUploading}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleUpload}
          startIcon={isUploading ? <CheckCircleIcon /> : <UploadIcon />}
          disabled={!selectedFile || isUploading}
        >
          {isUploading ? `Uploading... ${uploadProgress}%` : "Upload Players"}
        </Button>
      </ActionsContainer>
    </UploadContainer>
  );
};

export default BulkUploadForm;
