// Lee una carpeta pública de Google Drive (compartida "Cualquiera con el enlace")
// sin API key, usando la vista embebida de Drive, y devuelve sus imágenes.
// Solo las imágenes que están directamente en la carpeta (no en subcarpetas).

export const DEFAULT_FOLDER_ID = '1l9wCjEV94su86t3PfSxYLDgjHuLTKQWD'; // "Fotografias para la web"

const IMAGE_EXT = /\.(jpe?g|png|webp|gif|heic|heif|tiff?|bmp)$/i;

const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');

export async function listDriveFolderImages(folderId = DEFAULT_FOLDER_ID) {
  if (!/^[\w-]{10,}$/.test(folderId)) throw new Error('ID de carpeta no válido');
  const res = await fetch(`https://drive.google.com/embeddedfolderview?id=${folderId}`, {
    headers: { 'Accept-Language': 'es-ES,es;q=0.9' }
  });
  if (!res.ok) throw new Error(`Drive respondió ${res.status}`);
  const html = await res.text();
  if (html.includes('sign-in-button') && !html.includes('flip-entry')) {
    throw new Error('La carpeta no es pública (requiere iniciar sesión)');
  }

  const photos = [];
  const entries = html.split('<div class="flip-entry"').slice(1);
  for (const entry of entries) {
    const idMatch = entry.match(/href="https:\/\/drive\.google\.com\/file\/d\/([\w-]+)\//);
    const titleMatch = entry.match(/class="flip-entry-title">([^<]*)</);
    if (!idMatch || !titleMatch) continue; // carpetas u otros elementos
    const name = decode(titleMatch[1]).trim();
    const isImage = IMAGE_EXT.test(name) || /alt="[^"]*Image"/i.test(entry);
    if (!isImage) continue;
    photos.push({
      id: idMatch[1],
      name,
      image: `https://lh3.googleusercontent.com/d/${idMatch[1]}=w1600`
    });
  }
  photos.sort((a, b) => a.name.localeCompare(b.name, 'es', { numeric: true }));
  return photos;
}
