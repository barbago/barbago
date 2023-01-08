import { User } from 'firebase/auth';

export interface AuthButtonProps {
  nextFunc?: (user?: User) => any;
}
