'use client';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/shared/redux/store';
import { SessionProvider } from 'next-auth/react';

export const AppProviders = (props: React.PropsWithChildren) => {
  return (
    <SessionProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {props.children}
        </PersistGate>
      </Provider>
    </SessionProvider>
  );
};
