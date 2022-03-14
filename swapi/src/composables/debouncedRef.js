export function useDebouncedRef() {
    function createDebounce() {
        let timeout = null;
        return function (fnc, delayMs) {
          clearTimeout(timeout);
          timeout = setTimeout(() => {
            fnc();
          }, delayMs || 500);
        };
      }

      return {
        debounce: createDebounce(),
      };
}