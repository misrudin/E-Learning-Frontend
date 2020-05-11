import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../src/redux/store";

import Splash from "./Screens/Splash";
import Auth from "./Screens/Auth/Auth";
import LoginAdmin from "./Screens/Auth/LoginAdmin";
import LoginGuru from "./Screens/Auth/LoginGuru";
import LoginSiswa from "./Screens/Auth/loginSiswa";
import Guru from "./Screens/Data/Guru";
import Siswa from "./Screens/Data/Siswa";
import Mapel from "./Screens/Data/Mapel";
import ListMapel from "./Screens/Data/ListMapel";
import Kelas from "./Screens/Data/Kelas";
import Home from "./Screens/Home/Home";
import DetailMapel from "./Screens/Data/DetailMapel";
import Akses from "./Screens/Data/AksesGuru";
import TambahMapel from "./Screens/Form/TambahMapel";
import TambahSoal from "./Screens/Form/TambahSoal";
import Profile from "./Screens/Form/EditProfile";
import Sekolah from "./Screens/Form/Sekolah";
import ImportSiswa from "./Screens/Excel/ImportSiswa";
import ImportGuru from "./Screens/Excel/ImportGuru";
import Eweh from "./Screens/NotFound";
import Absensi from "./Screens/Data/Absensi";
import HasilTes from "./Screens/Data/HasilTes";
import Tugas from "./Screens/Data/Tugas";
import StatusTes from "./Screens/Data/StatusTes";
import TambahTugas from "./Screens/Form/TambahTugas";
import Tes from "./Screens/Form/Tes";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
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

          <Route path="/mapel" exact component={ListMapel} />
          <Route path="/mapel/detail/:id" component={DetailMapel} />
          <Route path="/mapel/tambah-mapel" component={TambahMapel} />
          <Route path="/mapel/tambah-soal" component={TambahSoal} />
          <Route path="/akses/:id" component={Akses} />
          <Route path="/profile" component={Profile} />
          <Route path="/config" component={Sekolah} />
          <Route path="/is" component={ImportSiswa} />
          <Route path="/ig" component={ImportGuru} />
          <Route path="/absen" component={Absensi} />
          <Route path="/tugas" component={Tugas} />
          <Route path="/addtugas/:tugas" component={TambahTugas} />
          <Route path="/tes/:tugas" component={Tes} />
          <Route path="/hasil-tes/:tugas" component={HasilTes} />
          <Route path="/status/:tugas" component={StatusTes} />
          <Route component={Eweh} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
