import React from 'react';
import PropTypes from 'prop-types';
import Image from 'next/image';
const MyImage = (props) => (
  <Image
    layout={'responsive'}
    blurDataURL={'/assets/img/default.png'}
    alt={props.alt}
    width={1}
    height={1}
    {...props}
  />
);
MyImage.propTypes = {
  alt: PropTypes.string,
};

export default MyImage;
