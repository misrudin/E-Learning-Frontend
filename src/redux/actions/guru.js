import axios from "axios";

export const getGuru = () => {
  return {
    type: "GET_GURU",
    payload: axios.get(process.env.REACT_APP_URL + "guru"),
  };
};
export const addGuru = (data) => {
  return {
    type: "ADD_GURU",
    payload: axios.post(process.env.REACT_APP_URL + "guru", data),
  };
};
export const editGuru = (id, data) => {
  return {
    type: "EDIT_GURU",
    payload: axios.patch(process.env.REACT_APP_URL + `guru?id=${id}`, data),
  };
};
export const deleteGuru = (id) => {
  return {
    type: "DELETE_GURU",
    payload: axios.delete(process.env.REACT_APP_URL + `guru?id=${id}`),
  };
};
