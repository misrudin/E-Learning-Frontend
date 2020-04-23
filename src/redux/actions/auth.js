import axios from "axios";

export const saveToken = (token) => {
  return {
    type: "TOKEN",
    payload: token,
  };
};

export const loginAdmin = (data) => {
  return {
    type: "ADMIN",
    payload: axios.post(process.env.REACT_APP_URL + "auth/admin", data),
  };
};
export const loginGuru = (data) => {
  return {
    type: "GURU",
    payload: axios.post(process.env.REACT_APP_URL + "auth/guru", data),
  };
};
export const loginSiswa = (data) => {
  return {
    type: "SISWA",
    payload: axios.post(process.env.REACT_APP_URL + "auth/siswa", data),
  };
};
