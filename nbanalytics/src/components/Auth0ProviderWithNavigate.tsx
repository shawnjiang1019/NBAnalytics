'use client';

import { useRouter } from 'next/navigation';
import { Auth0Provider } from '@auth0/auth0-react';
import { ReactNode } from 'react';

export default function Auth0ProviderWithNavigate({ children }: { children: ReactNode }) {
  const router = useRouter();

  const onRedirectCallback = (appState?: any) => {
    router.push(appState?.returnTo || '/dashboard');
  };

  return (
    <Auth0Provider
      domain="dev-4m08esq3iy51y7tm.us.auth0.com"
      clientId="yT5WlTlD4jv8geaJjaWEuoFiEmEBciA0"
      authorizationParams={{
        redirect_uri: typeof window !== 'undefined' ? window.location.origin : '',
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
}
