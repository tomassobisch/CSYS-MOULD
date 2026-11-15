import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { listDriveFolderImages, DEFAULT_FOLDER_ID } from './api/_drivePhotos.js'

// En local (npm run dev) sirve /api/drive-photos igual que la función de Vercel
const drivePhotosDevApi = () => ({
  name: 'drive-photos-dev-api',
  configureServer(server) {
    server.middlewares.use('/api/drive-photos', async (_req, res) => {
      res.setHeader('Content-Type', 'application/json')
      try {
        const photos = await listDriveFolderImages(process.env.GDRIVE_FOLDER_ID || DEFAULT_FOLDER_ID)
        res.end(JSON.stringify({ photos }))
      } catch (err) {
        res.statusCode = 502
        res.end(JSON.stringify({ photos: [], error: String(err?.message || err) }))
      }
    })
  },
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), drivePhotosDevApi()],
})
