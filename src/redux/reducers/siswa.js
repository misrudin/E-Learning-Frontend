const initialValue = {
  isPending: false,
  isRejected: false,
  isFulfilled: false,
  dataSiswa: [],
};

const siswaReducer = (state = initialValue, action) => {
  switch (action.type) {
    case "GET_SISWA_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case "GET_SISWA_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload,
      };
    case "GET_SISWA_FULFILLED":
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        dataSiswa: action.payload.data.result,
      };
    case "ADD_SISWA_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case "ADD_SISWA_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload,
      };
    case "ADD_SISWA_FULFILLED":
      if (action.payload.data.result) {
        state.dataSiswa.push(action.payload.data.result);
      }
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        dataSiswa: state.dataSiswa,
      };
    case "EDIT_SISWA_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case "EDIT_SISWA_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload,
      };
    case "EDIT_SISWA_FULFILLED":
      if (action.payload.data.result) {
        const dataAfterEdit = state.dataSiswa.map((data) => {
          if (data.id.toString() === action.payload.data.result.id) {
            return action.payload.data.result;
          }
          return data;
        });
        return {
          ...state,
          isPending: false,
          isFulfilled: true,
          dataSiswa: dataAfterEdit,
        };
      } else {
        return {
          ...state,
          isPending: false,
          isFulfilled: true,
          dataSiswa: state.dataSiswa,
          errMsg: action.payload.data,
        };
      }
    case "DELETE_SISWA_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case "DELETE_SISWA_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload,
      };
    case "DELETE_SISWA_FULFILLED":
      const dataAfterDelete = state.dataSiswa.filter(
        (data) => data.id.toString() !== action.payload.data.result
      );
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        dataSiswa: dataAfterDelete,
      };

    default:
      return {
        state,
      };
  }
};

export default siswaReducer;
