const initialValue = {
  isPending: false,
  isRejected: false,
  isFulfilled: false,
  dataExcel: [],
};

const excelReducer = (state = initialValue, action) => {
  switch (action.type) {
    case "EXCEL_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case "EXCEL_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload,
      };
    case "EXCEL_FULFILLED":
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        dataExcel: action.payload.data.result,
      };
    case "EXCEL_SISWA_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case "EXCEL_SISWA_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload,
      };
    case "EXCEL_SISWA_FULFILLED":
      state.dataExcel.push(action.payload.data.result);
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        dataExcel: state.dataExcel,
      };

    case "DATA":
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        dataExcel: action.payload,
      };

    default:
      return {
        state,
      };
  }
};

export default excelReducer;
