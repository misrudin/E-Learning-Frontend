const initialValue = {
  isPending: false,
  isRejected: false,
  isFulfilled: false,
  listMapel: [],
  listAkses: [],
};

const listMapelReducer = (state = initialValue, action) => {
  switch (action.type) {
    case "GET_LMAPEL_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case "GET_LMAPEL_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload,
      };
    case "GET_LMAPEL_FULFILLED":
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        listMapel: action.payload.data.result,
      };
    case "ADD_LMAPEL_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case "ADD_LMAPEL_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload,
      };
    case "ADD_LMAPEL_FULFILLED":
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        listMapel: state.listMapel,
      };
    case "EDIT_LMAPEL_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case "EDIT_LMAPEL_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload,
      };
    case "EDIT_LMAPEL_FULFILLED":
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        listMapel: state.listMapel,
        errMsg: action.payload.data,
      };
    case "DELETE_LMAPEL_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case "DELETE_LMAPEL_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload,
      };
    case "DELETE_LMAPEL_FULFILLED":
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        listMapel: state.listMapel,
      };

    case "PAGE_LMAPEL_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case "PAGE_LMAPEL_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload,
      };
    case "PAGE_LMAPEL_FULFILLED":
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        listMapel: action.payload.data.result,
      };

    case "SORT_LMAPEL_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case "SORT_LMAPEL_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload,
      };
    case "SORT_LMAPEL_FULFILLED":
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        listMapel: action.payload.data.result,
      };

    case "GET_AKSES_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case "GET_AKSES_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload,
      };
    case "GET_AKSES_FULFILLED":
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        listAkses: action.payload.data.result,
      };
    case "ADD_AKSES_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case "ADD_AKSES_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload,
      };
    case "ADD_AKSES_FULFILLED":
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        listAkses: state.listAkses,
      };

    default:
      return {
        state,
      };
  }
};

export default listMapelReducer;
