import React from 'react';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';
import Dialog from './Dialog';
import AddPokemon from './AddPokemon';
import { useState } from 'react';

const CatchButton = ({ pokemon }) => {
  const [isCatched, setCatched] = useState(null);
  const [missedMessage, setMissedMessage] = useState(false);
  const messages = ["Oops you're missed!", 'Try again!!', "Don't give up!!"];

  const getProbability = () => {
    return Math.random() > 0.5 ? true : false;
  };

  const doCatch = throttle(
    () => {
      const catched = getProbability();
      setCatched(catched);
      if (!catched) {
        setMissedMessage((prevPosition) =>
          prevPosition === 2 || prevPosition === false ? 0 : prevPosition + 1
        );
      } else {
        setMissedMessage(false);
      }
    },
    500,
    { trailling: false }
  );

  return (
    <div>
      <div className={`relative inline-block`}>
        <button
          type="button"
          className={`w-[250px] rounded-2xl text-xl bg-red-500 hover:bg-red-600 text-gray-100 font-bold px-4 py-2 ${
            missedMessage === false ? `bg-blue-500 hover:bg-blue-600` : ''
          }`}
          onClick={doCatch}
        >
          {missedMessage !== false
            ? messages[missedMessage]
            : 'Click to Catch!'}
        </button>
      </div>
      <Dialog
        show={!!isCatched}
        onDialogClose={() => setCatched(null)}
        styleTw={'z-1'}
        width={'400px'}
      >
        <AddPokemon
          pokemon={pokemon}
          onAddSuccess={() => setCatched(null)}
        ></AddPokemon>
      </Dialog>
    </div>
  );
};

CatchButton.propTypes = {
  pokemon: PropTypes.object,
};

export default CatchButton;
