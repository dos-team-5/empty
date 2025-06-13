'use server';

import { z, ZodError } from 'zod';
import {
  deleteFileFromR2,
  getSignedUploadUrl,
  listFilesFromR2,
  uploadFileToR2,
} from '../lib/r2';

// --- (Best Practice) Define constants for reusability ---
const MAX_FILE_SIZE_MB = 3;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024; // 3MB in bytes
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const ACCEPTED_DOCUMENT_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
];

const UploadSchema = z.object({
  files: z.array(
    z
      .instanceof(File)
      .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
        message: 'Only JPEG, PNG, and WebP files are supported',
      })
      .refine((file) => file.size <= MAX_FILE_SIZE_BYTES, {
        // Use the constant here for a consistent message
        message: `Max file size is ${MAX_FILE_SIZE_MB}MB.`,
      })
  ),
});

const SingleUploadSchema = z.object({
  file: z
    .instanceof(File)
    .refine(
      (file) =>
        [...ACCEPTED_IMAGE_TYPES, ...ACCEPTED_DOCUMENT_TYPES].includes(
          file.type
        ),
      {
        message: 'Only supported file types are allowed.',
      }
    )
    .refine((file) => file.size <= MAX_FILE_SIZE_BYTES, {
      // Use the constant here as well
      message: `Max file size is ${MAX_FILE_SIZE_MB}MB.`,
    }),
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
    // This line will throw a ZodError if validation fails
    const validated = SingleUploadSchema.parse({ file });

    const key = `${fileType}/${Date.now()}-${validated.file.name}`;
    const url = await uploadFileToR2(validated.file, key);
    return { success: true, file: { key, url } };
  } catch (error) {
    console.error('Upload error:', error);

    // Check if the error is from Zod validation
    if (error instanceof ZodError) {
      // Return the specific validation message (e.g., "Max file size is 1MB.")
      return { success: false, error: error.errors[0].message };
    }

    // Fallback for other types of errors
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }

    return {
      success: false,
      error: 'An unknown error occurred during upload.',
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
