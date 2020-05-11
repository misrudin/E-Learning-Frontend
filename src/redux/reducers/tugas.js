const initialValue = {
  isPending: false,
  isRejected: false,
  isFulfilled: false,
  dataTugas: [],
};

const tugasReducer = (state = initialValue, action) => {
  switch (action.type) {
    case "GET_TUGAS_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case "GET_TUGAS_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload,
      };
    case "GET_TUGAS_FULFILLED":
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        dataTugas: action.payload.data.result,
      };
    case "ADD_TUGAS_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case "ADD_TUGAS_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload,
      };
    case "ADD_TUGAS_FULFILLED":
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        dataTugas: state.dataTugas,
      };
    case "EDIT_TUGAS_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case "EDIT_TUGAS_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload,
      };
    case "EDIT_TUGAS_FULFILLED":
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        dataTugas: state.dataTugas,
      };
    case "DELETE_TUGAS_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case "DELETE_TUGAS_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload,
      };
    case "DELETE_TUGAS_FULFILLED":
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        dataTugas: state.dataTugas,
      };

    default:
      return {
        state,
      };
  }
};

export default tugasReducer;
