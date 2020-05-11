const initialValue = {
  isPending: false,
  isRejected: false,
  isFulfilled: false,
  dataAdmin: [],
  pageAdmin: [],
};

const adminReducer = (state = initialValue, action) => {
  switch (action.type) {
    case "GET_ADMIN_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case "GET_ADMIN_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload,
      };
    case "GET_ADMIN_FULFILLED":
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        dataAdmin: action.payload.data.result,
      };
    case "ADD_ADMIN_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case "ADD_ADMIN_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload,
      };
    case "ADD_ADMIN_FULFILLED":
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        dataAdmin: state.dataAdmin,
      };
    case "EDIT_ADMIN_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case "EDIT_ADMIN_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload,
      };
    case "EDIT_ADMIN_FULFILLED":
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        dataAdmin: state.dataAdmin,
      };
    case "DELETE_ADMIN_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case "DELETE_ADMIN_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload,
      };
    case "DELETE_ADMIN_FULFILLED":
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        dataAdmin: state.dataAdmin,
      };

    case "PAGE_ADMIN_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case "PAGE_ADMIN_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload,
      };
    case "PAGE_ADMIN_FULFILLED":
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        dataAdmin: action.payload.data.result,
      };

    default:
      return {
        state,
      };
  }
};

export default adminReducer;
