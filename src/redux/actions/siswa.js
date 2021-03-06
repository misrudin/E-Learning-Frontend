import axios from "axios";

export const getSiswa = () => {
  return {
    type: "GET_SISWA",
    payload: axios.get(process.env.REACT_APP_URL + "siswa"),
  };
};
export const addSiswa = (data) => {
  return {
    type: "ADD_SISWA",
    payload: axios.post(process.env.REACT_APP_URL + "siswa", data),
  };
};
export const editSiswa = (id, data) => {
  return {
    type: "EDIT_SISWA",
    payload: axios.patch(process.env.REACT_APP_URL + `siswa?id=${id}`, data),
  };
};
export const deleteSiswa = (id) => {
  return {
    type: "DELETE_SISWA",
    payload: axios.delete(process.env.REACT_APP_URL + `siswa?id=${id}`),
  };
};

export const getPageSiswa = (page, key, kelas) => {
  return {
    type: "PAGE_SISWA",
    payload: axios.get(
      process.env.REACT_APP_URL + `siswa?page=${page}&key=${key}&kelas=${kelas}`
    ),
  };
};

export const getDetailSiswa = (id) => {
  return {
    type: "GET_SISWA",
    payload: axios.get(process.env.REACT_APP_URL + `siswa/detail?id=${id}`),
  };
};

export const editProfileSiswa = (id, data) => {
  return {
    type: "EDIT_SISWA",
    payload: axios.patch(
      process.env.REACT_APP_URL + `siswa/edit?id=${id}`,
      data
    ),
  };
};
