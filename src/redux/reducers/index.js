import { combineReducers } from "redux";
import authReducer from "./auth";
import pageReducer from "./page";
import guruReducer from "./guru";
import siswaReducer from "./siswa";
import kelasReducer from "./kelas";

const reducers = combineReducers({
  auth: authReducer,
  page: pageReducer,
  guru: guruReducer,
  siswa: siswaReducer,
  kelas: kelasReducer,
});

export default reducers;
