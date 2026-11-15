// Vercel Function: GET /api/drive-photos -> { photos: [{ id, name, image }] }
import { listDriveFolderImages, DEFAULT_FOLDER_ID } from './_drivePhotos.js';

export default async function handler(req, res) {
  const folderId = process.env.GDRIVE_FOLDER_ID || DEFAULT_FOLDER_ID;
  try {
    const photos = await listDriveFolderImages(folderId);
    // Cache en el CDN 5 min: las fotos nuevas aparecen como mucho a los 5 minutos
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=3600');
    res.status(200).json({ photos });
  } catch (err) {
    res.setHeader('Cache-Control', 'no-store');
    res.status(502).json({ photos: [], error: String(err?.message || err) });
  }
}
