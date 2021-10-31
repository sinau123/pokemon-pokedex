import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition } from 'react-transition-group';
let dialogs = 0;
const Dialog = ({ show, children, onDialogClose, width, ...props }) => {
  const initialRender = useRef(true);

  useEffect(() => {
    if (show) {
      dialogs += 1;
      document.querySelector('body').classList.add('overflow-hidden');
    } else if (show === false && !initialRender.current) {
      dialogs = dialogs > 0 ? dialogs - 1 : 0;
      if (dialogs === 0) {
        document.querySelector('body').classList.remove('overflow-hidden');
      }
    } else {
      initialRender.current = false;
    }
    // console.log(dialogs, children);
  }, [show]);

  useEffect(() => {
    return () => {
      dialogs = dialogs > 0 ? dialogs - 1 : 0;
      if (dialogs === 0) {
        document.querySelector('body').classList.remove('overflow-hidden');
      }
    };
  }, []);
  console.log(dialogs, show, children);
  return (
    <CSSTransition in={show} unmountOnExit timeout={{ enter: 600, exit: 1000 }}>
      <div
        className={[modalContainer, dialogShow(show), props.styleTw].join(' ')}
      >
        <div
          className={[modalBody, modalBodyAnimate(show), '<md:w-[1024px]'].join(
            ' '
          )}
          style={{ maxWidth: width }}
        >
          <div className={[modalContent]}>
            <button
              className={closeBtn}
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

const closeBtn = `absolute right-4 top-2 md:-right-6 md:-top-1 md:text-white text-2xl md:text-3xl text-right cursor-pointer float-right md:float-none`;

const dialogShow = (show) =>
  !show ? `opacity-0 pointer-events-none` : `opacity-100`;

const modalContainer = `
  fixed w-full h-full left-0 top-0 bg-gray-700 bg-opacity-70 transition-all duration-300 flex items-end md:items-center md:px-8
`;
const modalBody = `relative flex flex-col min-h-[60%] max-h-[95%] w-full md:max-w-3xl mx-auto`;

const modalBodyAnimate = (show) =>
  show ? 'animation-slideup' : 'animation-slidedown';

const modalContent = `
   flex-1 flex flex-col justify-between rounded-t-3xl md:rounded-xl p-3 py-8 bg-white h-full overflow-y-auto
`;

export default Dialog;
