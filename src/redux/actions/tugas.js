import axios from "axios";

export const getTugas = (status) => {
  return {
    type: "GET_TUGAS",
    payload: axios.get(process.env.REACT_APP_URL + `tugas?status=${status}`),
  };
};
export const typeTugas = (id) => {
  return {
    type: "GET_TUGAS",
    payload: axios.get(process.env.REACT_APP_URL + `tugas/type?id=${id}`),
  };
};
export const getEsay = (tugas) => {
  return {
    type: "GET_TUGAS",
    payload: axios.get(process.env.REACT_APP_URL + `tugas/esay?tugas=${tugas}`),
  };
};
export const getPg = (tugas) => {
  return {
    type: "GET_TUGAS",
    payload: axios.get(process.env.REACT_APP_URL + `tugas/pg?tugas=${tugas}`),
  };
};
export const getEsayJawab = (tugas, siswa) => {
  return {
    type: "GET_TUGAS",
    payload: axios.get(
      process.env.REACT_APP_URL +
        `tugas/esay/jawab?tugas=${tugas}&siswa=${siswa}`
    ),
  };
};
export const getPgJawab = (tugas, siswa) => {
  return {
    type: "GET_TUGAS",
    payload: axios.get(
      process.env.REACT_APP_URL + `tugas/pg/jawab?tugas=${tugas}&siswa=${siswa}`
    ),
  };
};

export const addTugas = (data) => {
  return {
    type: "ADD_TUGAS",
    payload: axios.post(process.env.REACT_APP_URL + "tugas", data),
  };
};
export const addEsay = (data) => {
  return {
    type: "ADD_TUGAS",
    payload: axios.post(process.env.REACT_APP_URL + "tugas/esay", data),
  };
};
export const jawabEsay = (data) => {
  return {
    type: "ADD_TUGAS",
    payload: axios.post(process.env.REACT_APP_URL + "tugas/esay/jawab", data),
  };
};
export const addPg = (data) => {
  return {
    type: "ADD_TUGAS",
    payload: axios.post(process.env.REACT_APP_URL + "tugas/pg", data),
  };
};
export const jawabPg = (data) => {
  return {
    type: "ADD_TUGAS",
    payload: axios.post(process.env.REACT_APP_URL + "tugas/pg/jawab", data),
  };
};

export const editTugas = (id, data) => {
  return {
    type: "EDIT_TUGAS",
    payload: axios.patch(process.env.REACT_APP_URL + `tugas?id=${id}`, data),
  };
};
export const editEsay = (id, data) => {
  return {
    type: "EDIT_TUGAS",
    payload: axios.patch(
      process.env.REACT_APP_URL + `tugas/esay?id=${id}`,
      data
    ),
  };
};
export const editPg = (id, data) => {
  return {
    type: "EDIT_TUGAS",
    payload: axios.patch(process.env.REACT_APP_URL + `tugas/pg?id=${id}`, data),
  };
};

export const deleteTugas = (id) => {
  return {
    type: "DELETE_TUGAS",
    payload: axios.delete(process.env.REACT_APP_URL + `tugas?id=${id}`),
  };
};
export const deleteEsay = (id) => {
  return {
    type: "DELETE_TUGAS",
    payload: axios.delete(process.env.REACT_APP_URL + `tugas/esay?id=${id}`),
  };
};
export const deletePg = (id) => {
  return {
    type: "DELETE_TUGAS",
    payload: axios.delete(process.env.REACT_APP_URL + `tugas/pg?id=${id}`),
  };
};
