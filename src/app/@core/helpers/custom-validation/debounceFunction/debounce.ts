export function debounce(time: number, cb: Function) {
  let timeoutId: any;
  return function (event: Event) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => cb(event), time);
  };
}
