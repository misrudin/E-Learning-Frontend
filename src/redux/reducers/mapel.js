const initialValue = {
  isPending: false,
  isRejected: false,
  isFulfilled: false,
  dataMapel: [],
};

const mapelReducer = (state = initialValue, action) => {
  switch (action.type) {
    case "GET_MAPEL_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case "GET_MAPEL_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload,
      };
    case "GET_MAPEL_FULFILLED":
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        dataMapel: action.payload.data.result,
      };
    case "ADD_MAPEL_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case "ADD_MAPEL_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload,
      };
    case "ADD_MAPEL_FULFILLED":
      // if (action.payload.data.result) {
      //   state.dataMapel.push(action.payload.data.result);
      // }
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        dataMapel: state.dataMapel,
      };
    case "EDIT_MAPEL_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case "EDIT_MAPEL_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload,
      };
    case "EDIT_MAPEL_FULFILLED":
      // if (action.payload.data.result) {
      //   const dataAfterEdit = state.dataMapel.map((data) => {
      //     if (data.id.toString() === action.payload.data.result.id) {
      //       return action.payload.data.result;
      //     }
      //     return data;
      //   });
      //   return {
      //     ...state,
      //     isPending: false,
      //     isFulfilled: true,
      //     dataMapel: dataAfterEdit,
      //   };
      // } else {
      // }
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        dataMapel: state.dataMapel,
      };
    case "DELETE_MAPEL_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case "DELETE_MAPEL_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload,
      };
    case "DELETE_MAPEL_FULFILLED":
      // const dataAfterDelete = state.dataMapel.filter(
      //   (data) => data.id.toString() !== action.payload.data.result
      // );
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        dataMapel: state.dataMapel,
      };

    case "PAGE_MAPEL_PENDING":
      return {
        ...state,
        isPending: true,
        isRejected: false,
        isFulfilled: false,
      };
    case "PAGE_MAPEL_REJECTED":
      return {
        ...state,
        isPending: false,
        isRejected: true,
        errMsg: action.payload,
      };
    case "PAGE_MAPEL_FULFILLED":
      return {
        ...state,
        isPending: false,
        isFulfilled: true,
        dataMapel: action.payload.data.result,
      };

    default:
      return {
        state,
      };
  }
};

export default mapelReducer;
