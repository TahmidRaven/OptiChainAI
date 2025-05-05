import React, { useState } from "react";
import { Button, Box, Typography, LinearProgress } from "@mui/material";
import { uploadSalesData } from "../services/api";

const FileUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    setUploadProgress(0);

    try {
      await uploadSalesData(file);
      setUploadProgress(100);
      onUploadSuccess();
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Box sx={{ p: 2, border: "1px dashed grey", borderRadius: 1 }}>
      <Typography variant="h6" gutterBottom>
        Upload Sales Data
      </Typography>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        disabled={uploading}
        style={{ marginBottom: "16px" }}
      />
      <Button
        variant="contained"
        onClick={handleUpload}
        disabled={!file || uploading}
      >
        Upload
      </Button>
      {uploading && (
        <Box sx={{ mt: 2 }}>
          <LinearProgress variant="determinate" value={uploadProgress} />
          <Typography variant="body2" sx={{ mt: 1 }}>
            Uploading... {uploadProgress}%
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default FileUpload;
