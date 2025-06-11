/* eslint-disable react-hooks/exhaustive-deps */
'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */

import { notifications } from '@mantine/notifications';
import imageCompression from 'browser-image-compression';
import { useCallback, useEffect, useRef, useState } from 'react';

// Types for settings and image data
export interface CompressionSettings {
  width: number; // Target width (px)
  format: 'webp' | 'jpeg'; // Output format
  quality: number; // Quality (0–100)
  maxSizeMB: number; // Target max file size (MB)
  preserveMetadata: boolean; // Preserve EXIF metadata
  fileNamePrefix: string; // Prefix for downloaded file
}

export interface ImageData {
  file: File;
  url: string;
}

// Default settings
const defaultSettings: CompressionSettings = {
  width: 1920,
  format: 'webp',
  quality: 80,
  maxSizeMB: 1,
  preserveMetadata: false,
  fileNamePrefix: 'compressed',
};

// Debounce utility
const debounce = <T extends (...args: any[]) => any>(func: T, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>): Promise<ReturnType<T>> => {
    clearTimeout(timeout);
    return new Promise((resolve) => {
      timeout = setTimeout(() => resolve(func(...args)), wait);
    });
  };
};

export const useImageCompressor = () => {
  const [originalImage, setOriginalImage] = useState<ImageData | null>(null);
  const [compressedImage, setCompressedImage] = useState<ImageData | null>(
    null
  );
  const [settings, setSettings] =
    useState<CompressionSettings>(defaultSettings);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const prevUrls = useRef<string[]>([]); // Track previous Blob URLs

  // Compress image with given settings
  const compressImage = useCallback(
    async (file: File, compressionSettings: CompressionSettings) => {
      setLoading(true);
      setProgress(0);

      try {
        const options = {
          maxWidthOrHeight: compressionSettings.width,
          maxSizeMB: compressionSettings.maxSizeMB,
          useWebWorker: true,
          fileType: `image/${compressionSettings.format}`,
          initialQuality: compressionSettings.quality / 100,
          exifOrientation: compressionSettings.preserveMetadata ? undefined : 1,
          onProgress: (p: number) => {
            setProgress(p);
            console.log(`Compression progress: ${p}%`);
          },
        };

        const compressedFile = await imageCompression(file, options);

        // Create a new File with the original name and correct extension
        const originalName = file.name.replace(/\.[^/.]+$/, ''); // Remove extension
        const newFileName = `${originalName}.${compressionSettings.format}`;
        const renamedCompressedFile = new File([compressedFile], newFileName, {
          type: `image/${compressionSettings.format}`,
          lastModified: file.lastModified, // Preserve original timestamp
        });

        const compressedData: ImageData = {
          file: renamedCompressedFile,
          url: URL.createObjectURL(renamedCompressedFile),
        };

        // Store new URL and revoke old compressed image URL
        setCompressedImage((prev) => {
          if (prev?.url) {
            prevUrls.current.push(prev.url); // Track old URL
          }
          return compressedData;
        });

        notifications.show({
          title: 'Success',
          message: `Image compressed successfully! Original: ${(file.size / 1024).toFixed(2)} KB, Compressed: ${(renamedCompressedFile.size / 1024).toFixed(2)} KB`,
          color: 'green',
          autoClose: 1500,
        });

        return compressedData;
      } catch (error) {
        notifications.show({
          title: 'Error',
          message: `Compression failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
          color: 'red',
        });
        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  // Debounced compression for real-time updates
  const debouncedCompress = useCallback(
    debounce(
      (file: File, settings: CompressionSettings) =>
        compressImage(file, settings),
      500
    ),
    [compressImage]
  );

  // Handle file drop
  const handleDrop = useCallback(
    async (files: File[]) => {
      if (files.length !== 1) {
        notifications.show({
          title: 'Error',
          message: 'Please upload one image at a time.',
          color: 'red',
        });
        return;
      }

      const file = files[0];
      const imageData: ImageData = {
        file,
        url: URL.createObjectURL(file),
      };
      setOriginalImage((prev) => {
        if (prev?.url) {
          prevUrls.current.push(prev.url); // Track old URL
        }
        return imageData;
      });
      setCompressedImage(null);

      await compressImage(file, settings);
    },
    [compressImage, settings]
  );

  // Update settings and re-compress if original image exists
  const updateSettings = useCallback(
    (newSettings: Partial<CompressionSettings>) => {
      setSettings((prev) => {
        const updated = { ...prev, ...newSettings };
        if (originalImage) {
          debouncedCompress(originalImage.file, updated);
        }
        return updated;
      });
    },
    [originalImage, debouncedCompress]
  );

  // Download compressed image
  const handleDownload = useCallback(() => {
    if (!compressedImage || !originalImage) return;
    const link = document.createElement('a');
    link.href = compressedImage.url;
    link.download = `${settings.fileNamePrefix}-${originalImage.file.name}`;
    link.click();
  }, [compressedImage, originalImage, settings.fileNamePrefix]);

  // Clear image state
  const clearState = useCallback(() => {
    setOriginalImage((prev) => {
      if (prev?.url) {
        prevUrls.current.push(prev.url);
      }
      return null;
    });
    setCompressedImage((prev) => {
      if (prev?.url) {
        prevUrls.current.push(prev.url);
      }
      return null;
    });
  }, []);

  // Clean up URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      prevUrls.current.forEach((url) => URL.revokeObjectURL(url));
      prevUrls.current = [];
      if (originalImage?.url) URL.revokeObjectURL(originalImage.url);
      if (compressedImage?.url) URL.revokeObjectURL(compressedImage.url);
    };
  }, []); // Run only on unmount

  // Revoke old URLs when images change
  useEffect(() => {
    return () => {
      prevUrls.current.forEach((url) => URL.revokeObjectURL(url));
      prevUrls.current = [];
    };
  }, [originalImage, compressedImage]);

  return {
    originalImage,
    compressedImage,
    settings,
    loading,
    progress,
    handleDrop,
    updateSettings,
    handleDownload,
    clearState,
  };
};
