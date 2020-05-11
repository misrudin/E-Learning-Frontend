import axios from "axios";

export const getAdmin = () => {
  return {
    type: "GET_ADMIN",
    payload: axios.get(process.env.REACT_APP_URL + "admin"),
  };
};
export const addAdmin = (data) => {
  return {
    type: "ADD_ADMIN",
    payload: axios.post(process.env.REACT_APP_URL + "admin", data),
  };
};
export const editAdmin = (id, data) => {
  return {
    type: "EDIT_ADMIN",
    payload: axios.patch(process.env.REACT_APP_URL + `admin?id=${id}`, data),
  };
};
export const deleteAdmin = (id) => {
  return {
    type: "DELETE_ADMIN",
    payload: axios.delete(process.env.REACT_APP_URL + `admin?id=${id}`),
  };
};

export const getPageAdmin = (page, key) => {
  return {
    type: "PAGE_ADMIN",
    payload: axios.get(
      process.env.REACT_APP_URL + `admin?page=${page}&key=${key}`
    ),
  };
};
