import React, { useEffect, useState } from "react";
import "./style.css";
import Header from "../../Components/Header";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getSekolah, editSekolah } from "../../redux/actions/auth";
import Loading from "../Loading";
import swal from "sweetalert";

import bg from "../../Images/avatar.svg";

const Sekolah = (props) => {
  const dispatch = useDispatch();
  const [npsn, setNpsn] = useState("");
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [file, setFile] = useState(null);
  const [logo, setLogo] = useState(null);
  const [msg, setMsg] = useState("-");
  const [loading, setLoading] = useState(false);

  const validName = (data) => {
    // eslint-disable-next-line
    let Regex = /^[a-zA-Z0-9][a-zA-Z 0-9]*$/;
    return Regex.test(data);
  };

  const validNpsm = (data) => {
    // eslint-disable-next-line
    let Regex = /^[0-9\d]{4,}$/;
    return Regex.test(data);
  };

  const logout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("Rule");
    props.history.push("/");
  };

  const getData = async () => {
    setMsg("-");
    setLoading(true);
    await dispatch(getSekolah()).then((res) => {
      const result = res.value.data.result[0];
      setNpsn(result.npsn);
      setNama(result.nama_sekolah);
      setAlamat(result.alamat);
      setLogo(result.logo);
      setLoading(false);
    });
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  const edit = async () => {
    if ((!npsn, !nama, !alamat)) {
      setMsg("Semua data harus diisi!");
    } else if (!validNpsm(npsn)) {
      setMsg("NPSM terdiri dari angka dan minimal 4 karakter !");
    } else if (!validName(nama)) {
      setMsg("Nama tidak boleh mengandung karakter unik !");
    } else {
      swal({
        title: "Edit Data ?",
        buttons: true,
      }).then(async (willEdit) => {
        let fd = new FormData();
        if (file) {
          fd.append("logo", file, file.name);
        }
        fd.set("npsn", npsn);
        fd.set("nama_sekolah", nama);
        fd.set("alamat", alamat);
        setLoading(true);
        await dispatch(editSekolah(1, fd)).then(() => {
          getData();
          setLoading(false);
          props.history.push("/home");
        });
      });
    }
  };

  const handleUpload = (e) => {
    if (e.target.files[0]) {
      let fileName = e.target.files[0].name;
      if (/.(jpg|jpeg|png|svg)/g.test(fileName)) {
        setFile(e.target.files[0]);
        console.log(e.target.files[0]);
      } else {
        setMsg("Type File tidak diizinkan!");
        e.target.value = null;
      }
    }
  };

  return !localStorage.getItem("Token") ? (
    <Redirect to="/auth" />
  ) : localStorage.getItem("Rule") === "admin" ? (
    <>
      <Header page="sekolah" logout={logout} />
      <div className="wrapper">
        {loading ? <Loading /> : null}
        <>
          <div className="container-fluid sekolah">
            <div className="img-sekolah">
              <img src={logo ? logo : bg} alt="background" />
            </div>
            <div className="sekolah-content">
              <div className="form">
                <h2>Organisasi</h2>
                <p className="text-danger">{msg}</p>
                <div className={npsn ? "input-div one focus" : "input-div one"}>
                  <div className="i">
                    <i className="fas fa-user"></i>
                  </div>
                  <div className="div">
                    <h5>NPSN</h5>
                    <input
                      type="text"
                      className="input"
                      value={npsn}
                      onChange={(e) => setNpsn(e.target.value)}
                    />
                  </div>
                </div>

                <div className={nama ? "input-div one focus" : "input-div one"}>
                  <div className="i">
                    <i className="fas fa-lock"></i>
                  </div>
                  <div className="div">
                    <h5>NAMA</h5>
                    <input
                      type="text"
                      className="input"
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                    />
                  </div>
                </div>

                <div
                  className={alamat ? "input-div one focus" : "input-div one"}
                >
                  <div className="i">
                    <i className="fas fa-user"></i>
                  </div>
                  <div className="div">
                    <h5>ALAMAT</h5>
                    <input
                      type="text"
                      className="input"
                      value={alamat}
                      onChange={(e) => setAlamat(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-sm-6">
                    <input
                      id="uploadFile"
                      type="file"
                      fileName={file}
                      onChange={(e) => handleUpload(e)}
                    />
                  </div>
                </div>
                <button type="button" className="btn2" onClick={edit}>
                  Simpan
                </button>
                <button
                  className="btn2 btn-danger btn-block buton-dgr"
                  onClick={() => props.history.push("/home")}
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </>
      </div>
    </>
  ) : (
    <Redirect to="/home" />
  );
};

export default Sekolah;
