/** @jsx jsx */
import PropTypes from 'prop-types';
import tw, { css } from 'twin.macro';
import { jsx, keyframes } from '@emotion/react';
// import ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition } from 'react-transition-group';
import { useEffect } from 'react';
let dialogs = 0;
const Dialog = ({ show, children, onDialogClose, width, ...props }) => {
  useEffect(() => {
    dialogs += 1;
    document.querySelector('body').classList.add('overflow-hidden');
    return () => {
      dialogs -= 1;
      if (dialogs === 0) {
        document.querySelector('body').classList.remove('overflow-hidden');
      }
    };
  }, []);
  return (
    <CSSTransition
      in={show}
      timeout={{ enter: 600, exit: 1000 }}
      classNames="my-node"
    >
      <div css={[modalContainer, dialogShow(show), props.styleTw]}>
        <div
          css={[modalBody, modalBodyAnimate(show), modalBodyCss]}
          style={{ maxWidth: width }}
        >
          <div css={[modalContent]}>
            <button
              css={closeBtn}
              title="Close"
              onClick={() => onDialogClose()}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            {children}
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

Dialog.propTypes = {
  children: PropTypes.any,
  show: PropTypes.bool,
  onDialogClose: PropTypes.func,
  styleTw: PropTypes.any,
  width: PropTypes.string,
};

const closeBtn = tw`absolute right-4 top-2 md:-right-6 md:-top-1 md:text-white text-2xl md:text-3xl text-right cursor-pointer float-right md:float-none`;
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
  fixed w-full h-full left-0 top-0 bg-gray-700 bg-opacity-70 transition-all duration-300 flex items-end md:items-center md:px-8
`;
const modalBody = tw`relative flex flex-col min-h-[60%] max-h-[95%] w-full md:max-w-3xl mx-auto`;
const modalBodyCss = css`
  @media (max-width: 767px) {
    max-width: 1024px !important;
  }
`;
const modalBodyAnimate = (show) =>
  css`
    animation: ${show ? slideUp : slideDown} 0.3s;
  `;

const modalContent = tw`
   flex-1 flex flex-col justify-between rounded-t-3xl md:rounded-xl p-3 py-8 bg-white h-full overflow-y-auto
`;

export default Dialog;
