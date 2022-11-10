import '../styles/globals.css'
import Layout from './comps/Layout'
import { SessionProvider } from 'next-auth/react'
import {SSRProvider} from '@react-aria/ssr'; 

function MyApp({ Component, pageProps, session }) {
  return (
  <div>
  <SSRProvider>
  <SessionProvider session={session}>
  
    <Layout>
      
      <Component {...pageProps} />

    </Layout>

  </SessionProvider>
  </SSRProvider>
  </div>
  )
}

export default MyApp
