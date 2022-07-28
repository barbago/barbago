import React from 'react';
import { Code, IContentLoaderProps } from 'react-content-loader/native';
import { useThemeColor } from '../../hooks';

export const CustomLoader = (props?: IContentLoaderProps) => {
  const backgroundColor = useThemeColor({}, 'tabIconDefault');
  const foregroundColor = useThemeColor({}, 'text');

  const defaultProps: IContentLoaderProps = {
    backgroundColor,
    foregroundColor,
  };

  return <Code {...defaultProps} {...props} />;
};
