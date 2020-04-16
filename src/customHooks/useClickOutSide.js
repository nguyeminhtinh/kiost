import { useEffect } from 'react';

/**
 * Function: useOnClickOutside
 * A custom hook that use to trigger an event if have action click outside a ref's element.
 * @param {object} ref: a reference of element that we need to detect
 * @param {function} handler: a function that used to trigger event if have click event outside of element
 */
const useClickOutside = (ref, handler, { ...rest }) => {
  useEffect(() => {
    const listener = event => {
      // Do nothing if clicking ref's element
      if (
        !ref.current ||
        ref.current.contains(event.target) ||
        !rest.iconRef.current ||
        rest.iconRef.current.contains(event.target)
      ) {
        return;
      }

      // Fire event if clicking outside ref's element
      handler(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);
    };
  }, [ref, handler, rest.iconRef]);
};

export default useClickOutside;
