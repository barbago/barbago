import { onIdTokenChanged } from 'firebase/auth';
import React, { FC, PropsWithChildren, useEffect, useState } from 'react';
import { Provider } from 'react-redux';

import { auth } from '../config';
import { useCachedResources } from '../hooks';
import { signedIn, signedOut, store } from '../store';

export const StoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const resourcesLoaded = useCachedResources();

  useEffect(() => {
    return onIdTokenChanged(auth, (user) => {
      if (user) store.dispatch(signedIn(user));
      else store.dispatch(signedOut());
      setLoading(false);
    });
  }, []);

  if (loading || !resourcesLoaded) return null;

  return <Provider store={store}>{children}</Provider>;
};
