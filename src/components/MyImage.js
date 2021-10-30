/** @jsx jsx */
import { jsx } from '@emotion/react';
import PropTypes from 'prop-types';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { css } from '@emotion/react';

const MyImage = ({ image }) => (
  <div
    css={css`
      max-width: ${image.width}px;
      min-height: ${image.height}px;
    `}
  >
    <LazyLoadImage
      alt={image.alt || image.src}
      src={image.src}
      effect="blur"
      placeholderSrc="/assets/img/default.png"
    />
    <span>{image.caption}</span>
  </div>
);
MyImage.propTypes = {
  image: PropTypes.object,
};

export default MyImage;
