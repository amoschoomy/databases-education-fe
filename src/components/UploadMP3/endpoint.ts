import axios from 'axios';

export async function uploadAudioFile(file: File, endpointURL: string) {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post(endpointURL, formData);
    return response.data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}
