import { useContext } from 'react';
import { AuthContext } from '../providers/Auth.provider';

export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext)
    throw Error('Cannot useAuthService outside a provider');
  return authContext;
};
