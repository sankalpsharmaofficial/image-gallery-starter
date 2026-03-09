function forceDownload(blobUrl: string, filename: string) {
  const a = document.createElement('a')
  a.download = filename
  a.href = blobUrl
  document.body.appendChild(a)
  a.click()
  a.remove()
}

export default async function downloadPhoto(
  url: string,
  filename: string
) {
  if (!filename) {
    filename = url.split('\\').pop()?.split('/').pop() || 'photo.jpg'
  }

  try {
    const response = await fetch(url, {
      headers: new Headers({
        Origin: location.origin,
      }),
      mode: 'cors',
    })
    const blob = await response.blob()
    const blobUrl = window.URL.createObjectURL(blob)
    forceDownload(blobUrl, filename)
    // Revoke the object URL after a short delay to free memory
    setTimeout(() => window.URL.revokeObjectURL(blobUrl), 1000)
  } catch (error) {
    console.error('Failed to download photo:', error)
  }
}
