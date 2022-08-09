import { onIdTokenChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';

import { auth } from '../config';
import { useCachedResources } from '../hooks';
import { authFailed, signedIn, signedOut, store } from '../store';

export const StoreProvider: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const resourcesLoaded = useCachedResources();

  useEffect(() => {
    setLoading(true);
    return onIdTokenChanged(
      auth,
      (user) => {
        if (user) {
          store.dispatch(signedIn(user));
        } else {
          store.dispatch(signedOut());
        }
        setLoading(false);
      },
      (error) => store.dispatch(authFailed(error)),
    );
  }, []);

  // todo: replace apploading and use splash screen
  if (loading || !resourcesLoaded) return null;

  return <Provider store={store}>{children}</Provider>;
};
