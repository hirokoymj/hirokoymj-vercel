import { useState, useCallback } from 'react';

export const useBase64Image = () => {
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

  const handleUpload = useCallback(async (event) => {
    const uploadedFile = event.target.files?.[0];
    if (!uploadedFile) return;

    if (uploadedFile.size > MAX_FILE_SIZE_BYTES) {
      setFileError('File size exceeds 10MB.');
      setFileData(null);
      return;
    }

    setFileError(null);

    const base64 = await convertFileToBase64(uploadedFile);

    setFileData({
      type: uploadedFile.type,
      base64: base64.split(',')[1], //Gemini needs pure Base64 bytes (data:image/jpeg;base64,/9j/4AAQS... -> /9j/4AAQS...)
      imageUrl: uploadedFile.type.startsWith('image/') ? URL.createObjectURL(uploadedFile) : '/document-icon.png',
    });
  }, []);

  return { fileData, fileError, handleUpload };
};
