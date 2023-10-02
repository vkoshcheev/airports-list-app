import debounce from 'lodash/debounce';
import { useCallback } from 'react';

const useDebounce = (callback: (...args: any) => any | void, delay: number = 500) => {
  const debounced = useCallback(debounce(callback, delay, { leading: false, trailing: true }), []);
  return [debounced, debounced.flush];
};

export default useDebounce;
