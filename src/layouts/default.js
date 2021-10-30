/** @jsx jsx */
import PropTypes from 'prop-types';
import tw from 'twin.macro';
import { jsx } from '@emotion/react';

export default function Layout({ children }) {
  return <div css={wrapper}>{children}</div>;
}

Layout.propTypes = {
  children: PropTypes.element,
};

const wrapper = tw`
  md:mx-6 lg:max-w-5xl xl:max-w-5xl lg:mx-auto  bg-white
`;
