import React from 'react';
import Head from 'next/head';

// eslint-disable-next-line react/prop-types
export default function Seo({ description, title }) {
  const headTitle = `${title} | Pokemon Pokedex`;
  return (
    <Head>
      <title>{headTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={headTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={headTitle} />
      <meta property="twitter:card" content="summary" />
      <meta property="twitter:title" content={headTitle} />
      <meta property="twitter:description" content={description} />
    </Head>
  );
}
