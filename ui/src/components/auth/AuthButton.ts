import { User, UserCredential } from 'firebase/auth';

export interface AuthButtonProps {
  onAuthSuccess?: (user: User | UserCredential) => any;
}
