import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import 'tailwindcss/tailwind.css';
import Layout from '@/layouts/default';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { GlobalStyles } from 'twin.macro';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import '@/assets/style/global.css';
import '@/plugins/np-progress';

config.autoAddCss = false;

export default function App({ Component, pageProps }) {
  useEffect(() => {
    AOS.init({
      useClassNames: true,
      once: true,
    });
  }, []);
  return (
    <>
      <GlobalStyles />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

App.propTypes = {
  Component: PropTypes.elementType,
  pageProps: PropTypes.object,
};
