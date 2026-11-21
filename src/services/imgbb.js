/**
 * ImgBB Image Upload Service
 * Allows free image hosting without requiring a credit card.
 * API: https://api.imgbb.com/1/upload
 */

export const uploadToImgBB = async (imageFileOrBase64, apiKey) => {
  // If user provided an apiKey, upload to ImgBB
  if (apiKey && apiKey.trim() !== '') {
    try {
      const formData = new FormData();
      
      if (typeof imageFileOrBase64 === 'string' && imageFileOrBase64.startsWith('data:')) {
        // Remove base64 prefix
        const base64Data = imageFileOrBase64.split(',')[1];
        formData.append('image', base64Data);
      } else {
        formData.append('image', imageFileOrBase64);
      }

      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey.trim()}`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        return {
          success: true,
          url: data.data.url,
          displayUrl: data.data.display_url,
          deleteUrl: data.data.delete_url,
          thumb: data.data.thumb?.url || data.data.url,
        };
      } else {
        throw new Error(data.error?.message || 'ImgBB upload failed');
      }
    } catch (err) {
      console.warn('ImgBB upload error:', err);
      throw err;
    }
  }

  // Fallback: If no API key provided yet, convert file to data URL so the app continues working smoothly
  return new Promise((resolve, reject) => {
    if (typeof imageFileOrBase64 === 'string') {
      resolve({
        success: true,
        url: imageFileOrBase64,
        isFallback: true,
      });
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      resolve({
        success: true,
        url: reader.result,
        isFallback: true,
        notice: 'Uploaded locally (Add free ImgBB API Key in Admin Settings to host remotely)',
      });
    };
    reader.onerror = () => reject(new Error('Failed to read image file'));
    reader.readAsDataURL(imageFileOrBase64);
  });
};
