import React, { useRef, useState } from 'react';
import { FiAlertCircle, FiEdit, FiImage } from 'react-icons/fi';
import { getDownloadURL, uploadBytesResumable, deleteObject } from 'firebase/storage';
import { getStorageRef } from '@functions/storage';

type ImageUploadProps = {
  onSuccess?: (data: { [key: string]: string | number | boolean | File }) => void;
  replace?: boolean;
  path?: string;
}

const ImageUpload = ({ onSuccess, replace, path }: ImageUploadProps) => {
  const [imgUrl, setImgUrl] = useState('');
  const [uploadIdle, setUploadIdle] = useState(true);
  const [errorText, setErrorText] = useState('');
  const [progressPercentage, setProgressPercentage] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUploadeDiaglog = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    if (!file) return;
    setImgUrl(URL.createObjectURL(file));
    (inputRef.current as HTMLInputElement).value = '';
    const ref = getStorageRef(file.name, path || 'assets');
    if (replace) await deleteObject(ref);
    const uploadTask = uploadBytesResumable(ref, file);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        if (progress === 0) {
          setUploadIdle(false);
        } else if (progress === 100) {
          setTimeout(() => { setUploadIdle(true); }, 2000);
        }
        setProgressPercentage(progress);
      },
      (error) => {
        setErrorText(JSON.stringify(error));
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log('first');
          if (!onSuccess) return;
          onSuccess({ downloadURL });
        });
      },
    );
  };

  return (
    <div className="flex flex-col items-center">
      {(errorText !== '') && (
        <div className="text-center py-4 lg:px-4 rounded-xl">
          <div className="p-2 bg-red-600 items-center text-red-100 leading-none lg:rounded-full flex lg:inline-flex gap-2" role="alert">
            <FiAlertCircle className="h-5 w-5 transition-all duration-200" />
            <span className="font-poppins mr-2 text-left text-xs flex-auto">There was a problem while uploading #FE001</span>
          </div>
        </div>
      )}
      <div
        className="bg-gray-50 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 m-5 w-64 h-64 relative"
        style={{ ...(imgUrl && { background: `url(${imgUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }) }}
      >
        <button
          type="button"
          className="flex text-xs items-center gap-1 absolute top-1 right-1 p-2 rounded-md bg-white opacity-80 hover:opacity-100"
          onClick={() => inputRef?.current?.click()}
        >
          Change thumbnail <FiEdit className="w-3 h-3" />
        </button>
        {!uploadIdle && progressPercentage > 0 && (
          <div className="absolute spacing-5 my-2 bottom-2 bg-gray-300 w-[80%] rounded-full h-2">
            <div className="rounded-full h-full bg-gray-500" style={{ width: `${progressPercentage}%` }} />
          </div>
        )}
        {!imgUrl && (
          <div className="text-center m-auto">
            <FiImage aria-hidden="true" className="mx-auto h-12 w-12 text-gray-300" />
            <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <label htmlFor="file-upload" className="text-indigo-600 hover:text-indigo-500">
                <span>Upload a file</span>
                <input name="file-upload" className="hidden" onChange={handleUploadeDiaglog} type="file" accept="image/*" ref={inputRef} />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
