import axios from "axios";

export const getKelas = () => {
  return {
    type: "GET_KELAS",
    payload: axios.get(process.env.REACT_APP_URL + "kelas"),
  };
};
export const addKelas = (data) => {
  return {
    type: "ADD_KELAS",
    payload: axios.post(process.env.REACT_APP_URL + "kelas", data),
  };
};
export const editKelas = (id, data) => {
  return {
    type: "EDIT_KELAS",
    payload: axios.patch(process.env.REACT_APP_URL + `kelas?id=${id}`, data),
  };
};
export const deleteKelas = (id) => {
  return {
    type: "DELETE_KELAS",
    payload: axios.delete(process.env.REACT_APP_URL + `kelas?id=${id}`),
  };
};

export const getPageKelas = (page, key) => {
  return {
    type: "PAGE_KELAS",
    payload: axios.get(
      process.env.REACT_APP_URL + `kelas?page=${page}&key=${key}`
    ),
  };
};
