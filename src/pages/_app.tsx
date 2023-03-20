import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/layout'
import AnimationWrapper from '@/components/animation/animateWrapper'

export default function App({ Component, pageProps }: AppProps) {
  return <Layout>
    <AnimationWrapper>
      <Component {...pageProps} />
    </AnimationWrapper>
  </Layout>
}
