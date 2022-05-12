import { Header } from '../components/Header';
import '../styles/global.scss';
import { AppProps} from 'next/app';

import { SessionProvider } from 'next-auth/react';
import { PrismicProvider } from '@prismicio/react';
import {client} from '../services/prismic';

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <PrismicProvider client={client}>
    <SessionProvider session={pageProps.session}>
      <Header/>
      <Component {...pageProps} />
    </SessionProvider>
    </PrismicProvider>
  )
}

export default MyApp
