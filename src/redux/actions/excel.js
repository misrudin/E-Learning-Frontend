import axios from "axios";

export const ImportSiswa = (data) => {
  return {
    type: "EXCEL",
    payload: axios.post(process.env.REACT_APP_URL + "import", data),
  };
};
export const ImportGuru = (data) => {
  return {
    type: "EXCEL",
    payload: axios.post(process.env.REACT_APP_URL + "import/guru", data),
  };
};
export const tampilData = () => {
  return {
    type: "DATA",
    payload: [],
  };
};

export const excelSiswa = (data) => {
  return {
    type: "EXCEL_SISWA",
    payload: axios.post(process.env.REACT_APP_URL + "siswa", data),
  };
};

export const excelGuru = (data) => {
  return {
    type: "EXCEL_SISWA",
    payload: axios.post(process.env.REACT_APP_URL + "guru", data),
  };
};
