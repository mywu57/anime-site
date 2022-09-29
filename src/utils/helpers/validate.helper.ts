export const removeEmpty = (obj: any) => {
  Object.keys(obj).forEach(
    (k) => !obj[k] && obj[k] !== undefined && delete obj[k],
  );
  return obj;
};
