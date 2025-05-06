'use client';

import { useRouter } from 'next/navigation';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { ReactNode } from 'react';



export default function Auth0ProviderWithNavigate({ children }: { children: ReactNode }) {
  const router = useRouter();

  const onRedirectCallback = (appState?: any) => {
    router.push(appState?.returnTo || '/landing');
  };
  const client_id = "yT5WlTlD4jv8geaJjaWEuoFiEmEBciA0";
  const domain = "dev-4m08esq3iy51y7tm.us.auth0.com";

  return (
    <Auth0Provider
      domain= {domain ?? ""}
      clientId= {client_id ?? ""}
      authorizationParams={{
        redirect_uri: typeof window !== 'undefined' ? window.location.origin : '',
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
}
