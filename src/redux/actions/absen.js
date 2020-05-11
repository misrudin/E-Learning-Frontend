import axios from "axios";

export const getPageAbsen = (page, key, kelas) => {
  return {
    type: "PAGE_ABSEN",
    payload: axios.get(
      process.env.REACT_APP_URL +
        `absen/siswa?page=${page}&key=${key}&kelas=${kelas}`
    ),
  };
};
