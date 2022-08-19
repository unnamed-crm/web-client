import type { AppProps as NextAppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { emotionCache as clientEmotionCache } from '@/utils/emotionCache';
import Layout from '@/components/Layout';
import { theme } from '@/utils/theme';
import { wrapper } from '@/app/store';
import { RootContext } from '@/contexts/Root.context';
import '@/global.scss';

interface AppProps extends NextAppProps {
  emotionCache?: EmotionCache;
}

function App({ Component, pageProps, emotionCache = clientEmotionCache }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>UCRM</title>
      </Head>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <RootContext>
            <CssBaseline enableColorScheme />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </RootContext>
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}

export default wrapper.withRedux(App);
