import { useState, useCallback } from 'react';

export const useBase64 = () => {
  const [fileData, setFileData] = useState(null);
  const [fileError, setFileError] = useState(null);

  const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const loadImageFromUrl = useCallback(async (imageUrl) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const base64Full = await convertFileToBase64(blob);

      setFileData({
        type: blob.type || 'image/png',
        base64: base64Full.split(',')[1], // pure base64 bytes
        imageUrl,
      });
      setFileError(null);
    } catch (err) {
      console.error('Failed to load image from URL:', err);
      setFileError('Failed to load example image.');
    }
  }, []);

  const handleUpload = useCallback(async (event) => {
    const uploadedFile = event.target.files?.[0];
    if (!uploadedFile) {
      setFileError('Please upload a file.');
      return;
    }

    if (uploadedFile.size > MAX_FILE_SIZE_BYTES) {
      setFileError('File size exceeds 10MB.');
      setFileData(null);
      return;
    }

    setFileError(null);

    const base64 = await convertFileToBase64(uploadedFile);

    setFileData({
      type: uploadedFile.type,
      base64: base64.split(',')[1], //Must pure Base64 bytes (data:image/jpeg;base64,/9j/4AAQS... -> /9j/4AAQS...)
      imageUrl: uploadedFile.type.startsWith('image/') ? URL.createObjectURL(uploadedFile) : '/document-icon.png',
    });
  }, []);

  const resetFile = () => {
    setFileData(null);
    setFileError(null);
  };

  return { fileData, fileError, handleUpload, loadImageFromUrl, resetFile };
};
