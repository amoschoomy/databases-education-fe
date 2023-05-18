import axios from 'axios';

export async function uploadAudioFile(uid:string,file: File, audioDescription:string, endpointURL: string) {
  const formData = new FormData();
  formData.append('uid', uid);
  formData.append('file', file);
  formData.append('audio_description', audioDescription);

  try {
    const response = await axios.post(endpointURL, formData);
    return response.data;
  } catch (error) {
    console.error('Error uploading file:', error);
    throw error;
  }
}
