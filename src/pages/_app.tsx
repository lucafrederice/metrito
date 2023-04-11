import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/layout/wrapper'
import AnimationWrapper from '@/components/animation/animateWrapper'
import { BgOverlayProvider } from '@/contexts/bgOverlay.context'
import BgOverlay from '@/components/layout/bg/overlay'
import Bg from '@/components/layout/bg'
import { BgProvider } from '@/contexts/bg.context'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <BgProvider>
      <Bg>
        <BgOverlayProvider>
          <BgOverlay />
          <Layout>
            <AnimationWrapper>
              <Component {...pageProps} />
            </AnimationWrapper>
          </Layout>
        </BgOverlayProvider>
      </Bg>
    </BgProvider>

  )
}
