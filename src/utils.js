export default function keysort(key) {
  return function(a, b) {
    if (a[key] < b[key]) {
      return 1;
    } else if (a[key] > b[key]) {
      return -1;
    } else {
      return 0;
    }
  };
}
