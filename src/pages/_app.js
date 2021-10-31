import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Layout from '@/layouts/default';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

import 'react-toastify/dist/ReactToastify.css';
import '@/assets/style/global.css';
import '@/plugins/np-progress';
import 'windi.css';

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
      <Layout>
        <Component {...pageProps} />{' '}
      </Layout>{' '}
      <ToastContainer
        hideProgressBar={true}
        theme={'colored'}
        limit={1}
        position={'bottom-right'}
      />
    </>
  );
}

App.propTypes = {
  Component: PropTypes.elementType,
  pageProps: PropTypes.object,
};
