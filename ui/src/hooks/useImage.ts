import {
  ImagePickerAsset,
  ImagePickerOptions,
  launchImageLibraryAsync,
} from 'expo-image-picker';
import { useState } from 'react';

export type UseImageOptions = {
  onChange: (assets: ImagePickerAsset[]) => void;
} & ImagePickerOptions;

export function useImage({
  onChange,
  ...pickerOptions
}: UseImageOptions) {
  const [assets, setAssets] = useState<ImagePickerAsset[]>([]);

  const selectImage = async () => {
    try {
      const result = await launchImageLibraryAsync(pickerOptions);
      if (result.canceled) return;
      setAssets(result.assets);
      onChange(result.assets);
    } catch (err) {
      alert('File upload failed, please try again!');
    }
  };

  const removeImage = (index: number = 0) => {
    const newAssets = assets.filter((_, i) => i !== index);
    setAssets(newAssets);
    onChange(newAssets);
  };

  return { assets, selectImage, removeImage };
}
