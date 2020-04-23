export const pageTitle = (title) => {
  return {
    type: "TITLE",
    payload: title,
  };
};
export const pageLocation = (location) => {
  return {
    type: "LOCATION",
    payload: location,
  };
};
