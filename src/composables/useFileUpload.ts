import { ref } from 'vue'

export interface SelectedFile {
  file: File
  preview: string
}

export function useFileUpload(maxFiles = 10, maxSizeMb = 10) {
  const selectedFiles = ref<SelectedFile[]>([])
  const isDragging = ref(false)

  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/heic', 'image/heif']

  function validateFile(file: File): string | null {
    if (!validTypes.includes(file.type.toLowerCase())) {
      return `${file.name} no es un formato válido. Solo JPG, PNG, HEIC.`
    }
    if (file.size > maxSizeMb * 1024 * 1024) {
      return `${file.name} es demasiado grande. Máximo ${maxSizeMb}MB por foto.`
    }
    return null
  }

  async function addFiles(files: FileList | File[]) {
    const fileArray = Array.from(files)
    const errors: string[] = []

    if (selectedFiles.value.length + fileArray.length > maxFiles) {
      errors.push(`Solo puedes subir ${maxFiles} fotos a la vez`)
      return errors
    }

    for (const file of fileArray) {
      const error = validateFile(file)
      if (error) {
        errors.push(error)
        continue
      }

      const preview = await readFileAsDataUrl(file)
      selectedFiles.value.push({ file, preview })
    }

    return errors
  }

  function readFileAsDataUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => resolve(e.target?.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  function removeFile(index: number) {
    selectedFiles.value.splice(index, 1)
  }

  function clearFiles() {
    selectedFiles.value = []
  }

  function handleDragOver(e: DragEvent) {
    e.preventDefault()
    isDragging.value = true
  }

  function handleDragLeave() {
    isDragging.value = false
  }

  async function handleDrop(e: DragEvent) {
    e.preventDefault()
    isDragging.value = false
    if (e.dataTransfer?.files) {
      return await addFiles(e.dataTransfer.files)
    }
    return []
  }

  return {
    selectedFiles,
    isDragging,
    addFiles,
    removeFile,
    clearFiles,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    readFileAsDataUrl,
  }
}
