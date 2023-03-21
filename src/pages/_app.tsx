import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/layout'
import AnimationWrapper from '@/components/animation/animateWrapper'
import DashboardPropsProvider from '@/contexts/DashboardProps'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <AnimationWrapper>
        <DashboardPropsProvider>
          <Component {...pageProps} />
        </DashboardPropsProvider>
      </AnimationWrapper>
    </Layout>
  )
}
