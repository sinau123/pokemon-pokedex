const localStorageHelper = {
  /**
   * get localStorage value
   * @param {String} key
   * @param {*} _default default value
   * @returns
   */
  getItem: (key, _default) => {
    try {
      return JSON.parse(localStorage.getItem(key)) || _default;
    } catch {
      return _default;
    }
  },
  /**
   * set value to localStorage
   * @param {*} key
   * @param {*} value
   */
  setItem: (key, value) => {
    const data = JSON.stringify(value);
    localStorage.setItem(key, data);
  },
};
export const localStorageKeys = {
  MY_POKEMONS: 'my_pokemons',
};
export default localStorageHelper;
