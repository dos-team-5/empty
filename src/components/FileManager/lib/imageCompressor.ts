import sharp from 'sharp';

export async function compressImageToTargetSize(
  file: File,
  targetSizeKB: number = 500
): Promise<Buffer> {
  const maxSizeBytes = targetSizeKB * 1024; // Convert KB to bytes
  const buffer = Buffer.from(await file.arrayBuffer());
  let quality = 80; // Start with high quality
  const qualityStep = 5; // Decrease quality incrementally

  // Supported formats: JPEG, PNG, WebP
  let format: 'jpeg' | 'png' | 'webp';
  if (file.type.includes('png')) {
    format = 'png';
  } else if (file.type.includes('webp')) {
    format = 'webp';
  } else {
    format = 'jpeg';
  }

  // Initial compression attempt
  let compressed = await sharp(buffer)
    .toFormat(format, { quality: format === 'png' ? undefined : quality }) // PNG uses lossless compression
    .toBuffer();

  // Iteratively reduce quality until file size is under target
  while (compressed.length > maxSizeBytes && quality > 10) {
    quality -= qualityStep;
    compressed = await sharp(buffer)
      .toFormat(format, { quality: format === 'png' ? undefined : quality })
      .toBuffer();
  }

  // If still too large, slightly reduce resolution as a last resort
  if (compressed.length > maxSizeBytes) {
    const metadata = await sharp(buffer).metadata();
    const scale = Math.sqrt(maxSizeBytes / compressed.length); // Scale to approximate target size
    const newWidth = Math.round((metadata.width ?? 1000) * scale);
    const newHeight = Math.round((metadata.height ?? 1000) * scale);

    compressed = await sharp(buffer)
      .resize({
        width: newWidth,
        height: newHeight,
        fit: 'inside',
        withoutEnlargement: true,
      })
      .toFormat(format, { quality })
      .toBuffer();
  }

  return compressed;
}
