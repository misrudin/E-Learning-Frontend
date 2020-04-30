import axios from "axios";

export const getListMapel = () => {
  return {
    type: "GET_LMAPEL",
    payload: axios.get(process.env.REACT_APP_URL + "listmapel"),
  };
};
export const addListMapel = (data) => {
  return {
    type: "ADD_LMAPEL",
    payload: axios.post(process.env.REACT_APP_URL + "listmapel", data),
  };
};
export const editListMapel = (id, data) => {
  return {
    type: "EDIT_LMAPEL",
    payload: axios.patch(
      process.env.REACT_APP_URL + `listmapel?id=${id}`,
      data
    ),
  };
};
export const deleteListMapel = (id) => {
  return {
    type: "DELETE_LMAPEL",
    payload: axios.delete(process.env.REACT_APP_URL + `listmapel?id=${id}`),
  };
};

export const getPageListMapel = (page, key) => {
  return {
    type: "PAGE_LMAPEL",
    payload: axios.get(
      process.env.REACT_APP_URL + `listmapel?page=${page}&key=${key}`
    ),
  };
};

export const sortListMapel = (guru) => {
  return {
    type: "SORT_LMAPEL",
    payload: axios.get(
      process.env.REACT_APP_URL + `listmapel/detail?guru=${guru}`
    ),
  };
};

export const sortListMapelKelas = (kelas) => {
  return {
    type: "SORT_LMAPEL",
    payload: axios.get(
      process.env.REACT_APP_URL + `listmapel/detail?kelas=${kelas}`
    ),
  };
};

export const getAkses = (mapel) => {
  return {
    type: "GET_AKSES",
    payload: axios.get(process.env.REACT_APP_URL + `akses?mapel=${mapel}`),
  };
};
export const AddAkses = (data) => {
  return {
    type: "ADD_AKSES",
    payload: axios.post(process.env.REACT_APP_URL + "akses", data),
  };
};

export const getListMapelId = (id) => {
  return {
    type: "GET_LMAPEL",
    payload: axios.get(process.env.REACT_APP_URL + `listmapel/detail?id=${id}`),
  };
};
