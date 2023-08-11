
// fontawesome imports and config
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
config.autoAddCss = false;

// layout elements import (individual pages will be wrapped in this layout)
import Layout from '../components/Layout'
import Provider from '../components/Provider'

import {reduxStore, persistor} from "@/data/redux/reduxStore"

export default function App({ Component, pageProps }) {
  
  return (
    <>
      <Provider store={reduxStore}>
        <PersistGate loading={null} persistor={persistor}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </PersistGate>
      </Provider>
    </>
  )
}