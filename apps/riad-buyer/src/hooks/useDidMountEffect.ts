import { useEffect, useRef } from 'react';

const useDidMountEffect = <T>(callback: Function, dependency: T[]) => {
  const didMount = useRef(false);
  // react run this if 'key' changes, but not on initial render
  useEffect(() => {
    if (didMount.current) callback();
    else didMount.current = true;
  }, [...dependency]);
};

export default useDidMountEffect;
