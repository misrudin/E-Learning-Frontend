import { combineReducers } from "redux";
import authReducer from "./auth";
import pageReducer from "./page";
import guruReducer from "./guru";
import siswaReducer from "./siswa";
import kelasReducer from "./kelas";
import mapelReducer from "./mapel";
import listMapelReducer from "./list_mapel";
import adminReducer from "./admin";
import excelReducer from "./excel";
import absenReducer from "./absen";
import tugasReducer from "./tugas";

const reducers = combineReducers({
  auth: authReducer,
  page: pageReducer,
  guru: guruReducer,
  siswa: siswaReducer,
  kelas: kelasReducer,
  mapel: mapelReducer,
  listmapel: listMapelReducer,
  admin: adminReducer,
  excel: excelReducer,
  absen: absenReducer,
  tugas: tugasReducer,
});

export default reducers;
