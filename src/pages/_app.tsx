import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/layout'
import AnimationWrapper from '@/components/animation/animateWrapper'
import { BgOverlayProvider } from '@/contexts/bgOverlayContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <BgOverlayProvider>
      <Layout>
        <AnimationWrapper>
          <Component {...pageProps} />
        </AnimationWrapper>
      </Layout>
    </BgOverlayProvider>
  )
}
