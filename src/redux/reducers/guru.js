const initialValue = {
  isPending: false,
  isRejected: false,
  isFulfilled: false,
  dataGuru: [],
  pageGuru: [],
};

const guruReducer = (state = initialValue, action) => {
  switch (action.type) {
    case "GET_GURU_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case "GET_GURU_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload,
      };
    case "GET_GURU_FULFILLED":
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        dataGuru: action.payload.data.result,
      };
    case "ADD_GURU_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case "ADD_GURU_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload,
      };
    case "ADD_GURU_FULFILLED":
      // if (action.payload.data.result) {
      //   state.pageGuru[2].push(action.payload.data.result);
      // }
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        dataGuru: state.dataGuru,
      };
    case "EDIT_GURU_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case "EDIT_GURU_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload,
      };
    case "EDIT_GURU_FULFILLED":
      // if (action.payload.data.result) {
      //   const dataAfterEdit = state.dataGuru[2].map((data) => {
      //     if (data.id.toString() === action.payload.data.result.id) {
      //       return action.payload.data.result;
      //     }
      //     return data;
      //   });
      //   return {
      //     ...state,
      //     isPending: false,
      //     isFulfilled: true,
      //     dataGuru: dataAfterEdit,
      //   };
      // } else {
      // }
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        dataGuru: state.dataGuru,
      };
    case "DELETE_GURU_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case "DELETE_GURU_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload,
      };
    case "DELETE_GURU_FULFILLED":
      // const dataAfterDelete = state.dataGuru.filter(
      //   (data) => data.id.toString() !== action.payload.data.result
      // );
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        dataGuru: state.dataGuru,
      };

    case "PAGE_GURU_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case "PAGE_GURU_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload,
      };
    case "PAGE_GURU_FULFILLED":
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        dataGuru: action.payload.data.result,
      };

    default:
      return {
        state,
      };
  }
};

export default guruReducer;
