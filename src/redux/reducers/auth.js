const initialValue = {
  isPending: false,
  isRejected: false,
  isFulfilled: false,
  token: null,
  loading: true,
  dataAdmin: [],
  sekolah: [],
};

const authReducer = (state = initialValue, action) => {
  switch (action.type) {
    case "TOKEN":
      localStorage.setItem("Token", action.payload);
      return {
        ...state,
        token: action.payload,
        isLoading: false,
      };

    case "ADMIN_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case "ADMIN_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload,
      };
    case "ADMIN_FULFILLED":
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        token: action.payload.data.result.token,
      };
    case "GURU_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case "GURU_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload,
      };
    case "GURU_FULFILLED":
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        token: action.payload.data.result.token,
      };
    case "SISWA_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case "SISWA_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload,
      };
    case "SISWA_FULFILLED":
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        token: action.payload.data.result.token,
      };

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

    case "SEKOLAH_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case "SEKOLAH_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload,
      };
    case "SEKOLAH_FULFILLED":
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        sekolah: action.payload.data.result,
      };

    case "EDIT_SEKOLAH_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case "EDIT_SEKOLAH_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload,
      };
    case "EDIT_SEKOLAH_FULFILLED":
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        sekolah: action.payload.data.result,
      };

    default:
      return {
        state,
      };
  }
};

export default authReducer;
