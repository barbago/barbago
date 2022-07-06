import { createContext, useContext } from 'react';
import { VendorResponse } from '../../../types';

export interface VendorState {
  vendor?: VendorResponse;
  vendorUid: string;
}

export const VendorContext = createContext<VendorState>(undefined!);

export const useVendor = () => useContext(VendorContext);
