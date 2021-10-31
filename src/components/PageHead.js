import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import Seo from './Seo';

export default function PageHead({ description, title, image }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Seo description={description} title={title} image={image}></Seo>
    </>
  );
}

PageHead.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.string,
};
