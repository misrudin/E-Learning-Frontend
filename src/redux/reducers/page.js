const initialValue = {
  title: "E-Learning",
};

const pageReducer = (state = initialValue, action) => {
  switch (action.type) {
    case "TITLE":
      return {
        ...state,
        title: action.payload,
      };

    default:
      return {
        state,
      };
  }
};

export default pageReducer;
