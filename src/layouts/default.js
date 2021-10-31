import React from 'react';
import PropTypes from 'prop-types';

export default function Layout({ children }) {
  return <div className={wrapper}>{children}</div>;
}

Layout.propTypes = {
  children: PropTypes.any,
};

const wrapper = `
  md:mx-6 lg:max-w-5xl xl:max-w-5xl lg:mx-auto  bg-white
`;
