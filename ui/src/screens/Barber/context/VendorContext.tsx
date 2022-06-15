import { createContext } from 'react';
import { VendorResponse } from '../../../types';

export const VendorContext = createContext<
  VendorResponse | undefined
>(undefined);
