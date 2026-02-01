import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { ADMIN_PASSWORD } from '../config/constants'

export interface GalleryPhoto {
  id: string
  data: string
  uploaderName: string
  uploadDate: string
  fileName: string
}

const STORAGE_KEY = 'weddingGallery'

export const useGalleryStore = defineStore('gallery', () => {
  const photos = ref<GalleryPhoto[]>([])
  const isAdminMode = ref(false)

  const isEmpty = computed(() => photos.value.length === 0)

  function loadFromStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        photos.value = JSON.parse(stored)
      }
    } catch (e) {
      console.error('Error loading gallery from storage:', e)
    }
  }

  function saveToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(photos.value))
    } catch (e) {
      console.error('Error saving gallery to storage:', e)
    }
  }

  function addPhoto(photo: Omit<GalleryPhoto, 'id'>) {
    const newPhoto: GalleryPhoto = {
      ...photo,
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    }
    photos.value.push(newPhoto)
    saveToStorage()
  }

  function addPhotos(newPhotos: Omit<GalleryPhoto, 'id'>[]) {
    for (const photo of newPhotos) {
      addPhoto(photo)
    }
  }

  function deletePhoto(id: string) {
    if (!isAdminMode.value) return false
    const index = photos.value.findIndex((p) => p.id === id)
    if (index !== -1) {
      photos.value.splice(index, 1)
      saveToStorage()
      return true
    }
    return false
  }

  function loginAdmin(password: string): boolean {
    if (password === ADMIN_PASSWORD) {
      isAdminMode.value = true
      return true
    }
    return false
  }

  function logoutAdmin() {
    isAdminMode.value = false
  }

  // Initialize from storage
  loadFromStorage()

  return {
    photos,
    isAdminMode,
    isEmpty,
    loadFromStorage,
    addPhoto,
    addPhotos,
    deletePhoto,
    loginAdmin,
    logoutAdmin,
  }
})
