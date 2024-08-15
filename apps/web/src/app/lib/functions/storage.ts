import { ref } from 'firebase/storage';
import { storage } from '@config/firebase';

export const getStorageRef = (fileName: string, folderName = '') => {
  const filePath = fileName.startsWith('https://') ? fileName : `files${!folderName ? '' : `/${folderName}`}/${fileName}`;
  return ref(storage, filePath);
};

export const holder = '';
