export function getFromLs(key: string) {
  try {
    if (localStorage) {
      return localStorage?.getItem(key);
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}
