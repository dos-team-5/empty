import {
  DeleteObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID ?? '',
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? '',
  },
});

export async function uploadFileToR2(file: File, key: string) {
  // Compress image to target size (500 KB)
  // const compressedBuffer = await compressImageToTargetSize(file, 500);
  // Convert File to Buffer to avoid stream-related checksum errors
  const buffer = Buffer.from(await file.arrayBuffer());

  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: key,
    ContentType: file.type,
    Body: buffer,
  });

  await r2.send(command);
  return `${process.env.R2_PUBLIC_DOMAIN}/${key}`;
}

export async function getSignedUploadUrl(key: string, contentType: string) {
  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: key,
    ContentType: contentType,
  });

  return getSignedUrl(r2, command, { expiresIn: 3600 });
}

export async function listFilesFromR2() {
  const command = new ListObjectsV2Command({
    Bucket: process.env.R2_BUCKET_NAME,
  });

  const response = await r2.send(command);
  return (
    response.Contents?.map((item) => ({
      key: item.Key ?? '',
      url: `${process.env.R2_PUBLIC_DOMAIN}/${item.Key}`,
      lastModified: item.LastModified,
    })) ?? []
  );
}

export async function deleteFileFromR2(key: string) {
  const command = new DeleteObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: key,
  });

  await r2.send(command);
}
