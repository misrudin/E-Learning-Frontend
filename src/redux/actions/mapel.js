import axios from "axios";

export const getMapel = () => {
  return {
    type: "GET_MAPEL",
    payload: axios.get(process.env.REACT_APP_URL + "mapel"),
  };
};
export const addMapel = (data) => {
  return {
    type: "ADD_MAPEL",
    payload: axios.post(process.env.REACT_APP_URL + "mapel", data),
  };
};
export const editMapel = (id, data) => {
  return {
    type: "EDIT_MAPEL",
    payload: axios.patch(process.env.REACT_APP_URL + `mapel?id=${id}`, data),
  };
};
export const deleteMapel = (id) => {
  return {
    type: "DELETE_MAPEL",
    payload: axios.delete(process.env.REACT_APP_URL + `mapel?id=${id}`),
  };
};

export const getPageMapel = (page, key) => {
  return {
    type: "PAGE_MAPEL",
    payload: axios.get(
      process.env.REACT_APP_URL + `mapel?page=${page}&key=${key}`
    ),
  };
};
