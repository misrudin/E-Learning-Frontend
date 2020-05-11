const initialValue = {
  isPending: false,
  isRejected: false,
  isFulfilled: false,
  dataAbsen: [],
};

const absenReducer = (state = initialValue, action) => {
  switch (action.type) {
    case "PAGE_ABSEN_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case "PAGE_ABSEN_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload,
      };
    case "PAGE_ABSEN_FULFILLED":
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        dataAbsen: action.payload.data.result,
      };

    default:
      return {
        state,
      };
  }
};

export default absenReducer;
