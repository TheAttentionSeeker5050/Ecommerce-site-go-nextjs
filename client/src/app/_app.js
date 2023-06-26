import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false
// import { ThemeProvider } from "next-themes";
import Layout from '../components/Layout'

export default function MyApp({ Component, pageProps }) {
  
  return (
    <>
      {/* <ThemeProvider >
        <Component {...pageProps} />
      </ThemeProvider>  */}
      <Layout>
        <Component {...pageProps} />
      </Layout>

    </>
  )
}