'use server';

import { z } from 'zod';
import {
  deleteFileFromR2,
  getSignedUploadUrl,
  listFilesFromR2,
  uploadFileToR2,
} from '../lib/r2';

const UploadSchema = z.object({
  files: z.array(
    z
      .instanceof(File)
      .refine(
        (file) => ['image/jpeg', 'image/png', 'image/webp'].includes(file.type),
        { message: 'Only JPEG, PNG, and WebP files are supported' }
      )
  ),
});

const SingleUploadSchema = z.object({
  file: z
    .instanceof(File)
    .refine(
      (file) =>
        [
          'image/jpeg',
          'image/png',
          'image/webp',
          'application/pdf',
          'application/msword',
          'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'application/vnd.ms-excel',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'application/vnd.ms-powerpoint',
          'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        ].includes(file.type),
      {
        message:
          'Only JPEG, PNG, WebP, PDF, DOC, DOCX, XLS, XLSX, PPT, and PPTX files are supported',
      }
    ),
});

export async function uploadFiles(formData: FormData) {
  try {
    const files = formData.getAll('files') as File[];
    const validated = UploadSchema.parse({ files });

    const uploadPromises = validated.files.map(async (file) => {
      const key = `images/${Date.now()}-${file.name}`;
      const url = await uploadFileToR2(file, key);
      return { key, url };
    });

    const results = await Promise.all(uploadPromises);
    return { success: true, files: results };
  } catch (error) {
    console.error('Upload error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed',
    };
  }
}

export async function uploadFile(
  formData: FormData,
  fileType: 'image' | 'document' = 'image'
) {
  try {
    const file = formData.get('file') as File;
    const validated = SingleUploadSchema.parse({ file });

    const key = `${fileType}/${Date.now()}-${validated.file.name}`;
    const url = await uploadFileToR2(validated.file, key);
    return { success: true, file: { key, url } };
  } catch (error) {
    console.error('Upload error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed',
    };
  }
}

export async function getSignedUploadUrlAction(
  fileName: string,
  contentType: string
) {
  try {
    const key = `images/${Date.now()}-${fileName}`;
    const url = await getSignedUploadUrl(key, contentType);
    return { success: true, url, key };
  } catch (error) {
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Failed to generate upload URL',
    };
  }
}

export async function listFiles() {
  try {
    const files = await listFilesFromR2();
    return { success: true, files };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to list files',
    };
  }
}

export async function deleteFile(key: string) {
  try {
    await deleteFileFromR2(key);
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete file',
    };
  }
}
