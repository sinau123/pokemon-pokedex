/** @jsx jsx */
import Link from 'next/link';
import PropTypes from 'prop-types';
import tw, { css } from 'twin.macro';
import { jsx, keyframes } from '@emotion/react';
import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import pokemonHelper from '@/libs/helpers/pokemon';

const PokemonDetailModal = ({ show, pokemon }) => {
  useEffect(() => {
    if (show) {
      document.querySelector('body').classList.add('overflow-hidden');
    } else {
      document.querySelector('body').classList.remove('overflow-hidden');
    }
  }, [show]);

  let content;
  if (pokemon) {
    const pokemonImage = pokemonHelper(pokemon);
    content = (
      <div css={tw`py-8 px-4`}>
        <h1 css={tw`mb-8 text-4xl text-center font-bold capitalize`}>
          {pokemon.name}
        </h1>
        <div css={tw`max-w-[300px] mx-auto`}>
          <Image
            src={pokemonImage.artwork}
            width={400}
            height={400}
            layout="responsive"
            alt={pokemonImage.artwork}
          />
        </div>
      </div>
    );
  }
  return ReactDOM.createPortal(
    <div css={[modalContainer, dialogShow(show)]}>
      <div css={[modalBody, modalBodyAnimate(show)]}>
        <div css={modalContent}>
          <Link shallow={true} href={`/`}>
            <a css={closeBtn} title="Close">
              <FontAwesomeIcon icon={faTimes} />
            </a>
          </Link>
          {content}
        </div>
      </div>
    </div>,
    document.querySelector('body')
  );
};

PokemonDetailModal.propTypes = {
  show: PropTypes.bool,
  pokemon: PropTypes.object,
};

const closeBtn = tw`absolute right-4 top-2 md:-right-8 md:-top-8 md:text-white text-2xl md:text-4xl text-right cursor-pointer float-right md:float-none`;
const slideUp = keyframes`
  from {
    transform: translateY(300px);
  }
  to {
    transform: translateY(0);
  }
`;

const slideDown = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100vh);
  }
`;

const dialogShow = (show) =>
  !show ? tw`opacity-0 pointer-events-none` : tw`opacity-100`;

const modalContainer = tw`
  fixed w-full h-full left-0 top-0 bg-gray-700 bg-opacity-70 transition-all duration-700 flex items-end md:items-center md:px-4
`;
const modalBody = tw`relative h-[90%] md:h-4/5 w-full max-w-3xl mx-auto`;
const modalBodyAnimate = (show) =>
  css`
    animation: ${show ? slideUp : slideDown} 0.8s;
  `;

const modalContent = tw`
   rounded-t-3xl md:rounded-xl p-3 py-8 bg-gray-900 text-white h-full overflow-y-auto
`;

export default PokemonDetailModal;
