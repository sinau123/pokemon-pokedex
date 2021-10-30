import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';

export default function PageHead({ pageName }) {
  return (
    <Head>
      <title>{pageName + ' | Pokemon Pokedex'}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}

PageHead.propTypes = {
  pageName: PropTypes.string,
};
