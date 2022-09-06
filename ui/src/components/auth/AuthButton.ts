import { User } from 'firebase/auth';

export interface AuthButtonProps {
  onAuthSuccess?: (user?: User) => any;
}
