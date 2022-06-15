import { createContext } from 'react';
import { VendorResponse } from '../../../types';

export interface VendorState {
  vendor?: VendorResponse;
}

export const VendorContext = createContext<VendorState>({});
