import { combineReducers } from "redux";
import authReducer from "./auth";
import pageReducer from "./page";
import guruReducer from "./guru";
import siswaReducer from "./siswa";
import kelasReducer from "./kelas";
import mapelReducer from "./mapel";
import listMapelReducer from "./list_mapel";

const reducers = combineReducers({
  auth: authReducer,
  page: pageReducer,
  guru: guruReducer,
  siswa: siswaReducer,
  kelas: kelasReducer,
  mapel: mapelReducer,
  listmapel: listMapelReducer,
});

export default reducers;
