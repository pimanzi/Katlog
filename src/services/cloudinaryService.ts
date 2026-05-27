const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET

interface CloudinaryUploadResult {
  url: string
  publicId: string
  fileType: string
  format: string
  size: number
  width?: number
  height?: number
}

export async function uploadFile(file: File, folder: string): Promise<CloudinaryUploadResult> {
  try {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', UPLOAD_PRESET)
    formData.append('folder', `brandhub/${folder}`)

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
      { method: 'POST', body: formData }
    )

    if (!response.ok) throw new Error('Upload failed. Please try again.')

    const data = await response.json()

    return {
      url: data.secure_url,
      publicId: data.public_id,
      fileType: data.resource_type,
      format: data.format,
      size: data.bytes,
      width: data.width,
      height: data.height,
    }
  } catch (error) {
    if (error instanceof Error) throw error
    throw new Error('Network error. Check your connection.')
  }
}
