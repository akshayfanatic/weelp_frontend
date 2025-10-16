import { useState, useCallback } from 'react';

/**
 * 
 * @param {boolean} initialState 
 * @returns 
 */
export const useTogglePassword = (initialState = false) => {
  const [visible, setVisible] = useState(initialState);

  const toggle = useCallback(() => {
    setVisible((prev) => !prev);
  }, []);

  return { visible, toggle };
};
