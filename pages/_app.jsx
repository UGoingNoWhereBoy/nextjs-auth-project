import '../styles/globals.css'
import Layout from './comps/Layout'
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps, session }) {
  return (
  <div className='w-[100%]'>

  <SessionProvider session={session}>

    <Layout>
      
      <Component {...pageProps} />

    </Layout>

  </SessionProvider>
  
  </div>
  )
}

export default MyApp
