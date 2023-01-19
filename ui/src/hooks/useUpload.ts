import { uuidv4 } from '@firebase/util';
import {
  ref,
  StorageError,
  uploadBytesResumable,
  UploadTask,
} from 'firebase/storage';
import { useState } from 'react';
import { storage } from '../config';

export interface UseUploadOptions {
  /** Callback run when file upload begins */
  onStart?: () => void;
  /** Callback run when file upload completes */
  onComplete?: () => void;
  /** Callback run when file upload fails */
  onFail?: (error: StorageError) => void;
  /** Callback run on each progress update */
  onProgress?: (progress: number) => void;
}

export interface UseUploadReturn {
  /** Uploads a file to Firebase Storage */
  uploadUri: (uri: string, refUrl?: string) => Promise<UploadTask>;
  /** uploadTask, can be used to cancel, pause, resume upload */
  uploadTask?: UploadTask | null;
  /** Whether file is being uploaded */
  isUploading: boolean;
  /** Firebase StorageError or null */
  error: StorageError | null;
  /** Percent of bytes transferred, from 0 to 1 */
  progress: number;
  /** Whether upload has been completed */
  isComplete: boolean;
}

// todo: refactor to allow separate handling of multiple uploads
// https://dev.to/emmbyiringiro/upload-image-with-expo-and-firebase-cloud-storage-3481
// https://github.com/expo/examples/blob/b08a6f05622fa9afb6cd51e7f06eda83b5ac1f20/with-firebase-storage-upload/App.js#L193
export function useUpload({
  onStart,
  onProgress,
  onComplete,
  onFail,
}: UseUploadOptions = {}): UseUploadReturn {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [error, setError] = useState<StorageError | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [uploadTask, setUploadTask] = useState<UploadTask | null>(null);

  // https://github.com/firebase/firebase-js-sdk/issues/5848#issuecomment-1277499602
  const uploadUri = async (
    uri: string,
    refUrl = uuidv4(),
  ): Promise<UploadTask> => {
    const blob = await (await fetch(uri)).blob();
    const fileRef = ref(storage, refUrl);
    setIsUploading(true);
    setIsComplete(false);
    setError(null);
    setProgress(0);
    onStart?.();
    const uploadTask = uploadBytesResumable(fileRef, blob);
    setUploadTask(uploadTask);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          snapshot.bytesTransferred / snapshot.totalBytes;
        setProgress(progress);
        onProgress?.(progress);
      },
      (error) => {
        setIsUploading(false);
        setError(error);
        onFail?.(error);
      },
      () => {
        setIsComplete(true);
        setIsUploading(false);
        onComplete?.();
      },
    );
    return uploadTask;
  };

  return {
    uploadUri,
    uploadTask,
    isUploading,
    progress,
    error,
    isComplete,
  };
}
