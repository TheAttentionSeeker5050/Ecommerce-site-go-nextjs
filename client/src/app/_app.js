
// fontawesome imports and config
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

// layout elements import (individual pages will be wrapped in this layout)
import Layout from '../components/Layout'

export default function App({ Component, pageProps }) {
  
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>

    </>
  )
}