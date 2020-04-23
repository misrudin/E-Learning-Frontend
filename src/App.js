import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../src/redux/store";

import Splash from "./Screens/Splash";
import Auth from "./Screens/Auth/Auth";
import LoginAdmin from "./Screens/Auth/LoginAdmin";
import LoginGuru from "./Screens/Auth/LoginGuru";
import LoginSiswa from "./Screens/Auth/loginSiswa";
import Guru from "./Screens/Data/Guru";
import Siswa from "./Screens/Data/Siswa";
import Soal from "./Screens/Data/Soal";
import Mapel from "./Screens/Data/Mapel";
import ListMapel from "./Screens/Data/ListMapel";
import Kelas from "./Screens/Data/Kelas";
import Home from "./Screens/Home/Home";
import DetailMapel from "./Screens/Data/DetailMapel";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Route path="/" exact component={Splash} />
        <Route path="/auth" exact component={Auth} />
        <Route path="/admin" component={LoginAdmin} />
        <Route path="/guru" component={LoginGuru} />
        <Route path="/siswa" component={LoginSiswa} />

        <Route path="/home" exact component={Home} />

        <Route path="/data-guru" component={Guru} />
        <Route path="/data-siswa" component={Siswa} />
        <Route path="/data-kelas" component={Kelas} />
        <Route path="/data-mapel" component={Mapel} />
        <Route path="/data-soal" component={Soal} />

        <Route path="/mapel" exact component={ListMapel} />
        <Route path="/mapel/detail" component={DetailMapel} />
      </Router>
    </Provider>
  );
};

export default App;
