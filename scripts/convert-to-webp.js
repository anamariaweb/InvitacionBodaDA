/**
 * Script para convertir imágenes PNG/JPEG a WebP
 * Uso: npm run convert-images
 */

import sharp from 'sharp'
import { readdir, stat } from 'fs/promises'
import { join, extname, dirname, basename } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PUBLIC_DIR = join(__dirname, '..', 'public')

// Extensiones a convertir
const EXTENSIONS = ['.png', '.jpg', '.jpeg']

// Calidad WebP (0-100)
const WEBP_QUALITY = 80

async function findImages(dir) {
  const images = []

  try {
    const entries = await readdir(dir, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = join(dir, entry.name)

      if (entry.isDirectory()) {
        // Recursivamente buscar en subdirectorios
        const subImages = await findImages(fullPath)
        images.push(...subImages)
      } else if (entry.isFile()) {
        const ext = extname(entry.name).toLowerCase()
        if (EXTENSIONS.includes(ext)) {
          images.push(fullPath)
        }
      }
    }
  } catch (error) {
    console.error(`Error leyendo directorio ${dir}:`, error.message)
  }

  return images
}

async function convertToWebP(imagePath) {
  const dir = dirname(imagePath)
  const name = basename(imagePath, extname(imagePath))
  const webpPath = join(dir, `${name}.webp`)

  try {
    const originalStats = await stat(imagePath)
    const originalSize = originalStats.size

    await sharp(imagePath)
      .webp({ quality: WEBP_QUALITY })
      .toFile(webpPath)

    const webpStats = await stat(webpPath)
    const webpSize = webpStats.size
    const savings = ((1 - webpSize / originalSize) * 100).toFixed(1)

    console.log(`✓ ${basename(imagePath)} → ${basename(webpPath)}`)
    console.log(`  ${formatBytes(originalSize)} → ${formatBytes(webpSize)} (${savings}% menor)`)

    return { original: originalSize, webp: webpSize }
  } catch (error) {
    console.error(`✗ Error convirtiendo ${imagePath}:`, error.message)
    return null
  }
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
}

async function main() {
  console.log('🖼️  Buscando imágenes en public/...\n')

  const images = await findImages(PUBLIC_DIR)

  if (images.length === 0) {
    console.log('No se encontraron imágenes para convertir.')
    return
  }

  console.log(`Encontradas ${images.length} imágenes para convertir:\n`)

  let totalOriginal = 0
  let totalWebP = 0
  let converted = 0

  for (const imagePath of images) {
    const result = await convertToWebP(imagePath)
    if (result) {
      totalOriginal += result.original
      totalWebP += result.webp
      converted++
    }
    console.log('')
  }

  console.log('─'.repeat(50))
  console.log(`\n✅ Conversión completada: ${converted}/${images.length} imágenes`)
  console.log(`📊 Tamaño total original: ${formatBytes(totalOriginal)}`)
  console.log(`📊 Tamaño total WebP: ${formatBytes(totalWebP)}`)
  console.log(`💾 Ahorro total: ${formatBytes(totalOriginal - totalWebP)} (${((1 - totalWebP / totalOriginal) * 100).toFixed(1)}%)`)
}

main().catch(console.error)
