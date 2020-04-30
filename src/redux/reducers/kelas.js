const initialValue = {
  isPending: false,
  isRejected: false,
  isFulfilled: false,
  dataKelas: [],
};

const kelasReducer = (state = initialValue, action) => {
  switch (action.type) {
    case "GET_KELAS_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case "GET_KELAS_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload,
      };
    case "GET_KELAS_FULFILLED":
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        dataKelas: action.payload.data.result,
      };
    case "ADD_KELAS_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case "ADD_KELAS_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload,
      };
    case "ADD_KELAS_FULFILLED":
      // if (action.payload.data.result) {
      //   state.dataKelas.push(action.payload.data.result);
      // }
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        dataKelas: state.dataKelas,
      };
    case "EDIT_KELAS_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case "EDIT_KELAS_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload,
      };
    case "EDIT_KELAS_FULFILLED":
      // if (action.payload.data.result) {
      //   const dataAfterEdit = state.dataKelas.map((data) => {
      //     if (data.id.toString() === action.payload.data.result.id) {
      //       return action.payload.data.result;
      //     }
      //     return data;
      //   });
      //   return {
      //     ...state,
      //     isPending: false,
      //     isFulfilled: true,
      //     dataKelas: dataAfterEdit,
      //   };
      // } else {
      // }
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        dataKelas: state.dataKelas,
      };
    case "DELETE_KELAS_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case "DELETE_KELAS_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload,
      };
    case "DELETE_KELAS_FULFILLED":
      // const dataAfterDelete = state.dataKelas.filter(
      //   (data) => data.id.toString() !== action.payload.data.result
      // );
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        dataKelas: state.dataKelas,
      };

    case "PAGE_KELAS_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case "PAGE_KELAS_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload,
      };
    case "PAGE_KELAS_FULFILLED":
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        dataKelas: action.payload.data.result,
      };

    default:
      return {
        state,
      };
  }
};

export default kelasReducer;
