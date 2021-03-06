import React, { useEffect, useState } from "react";
import "./style.css";
import Header from "../../Components/Header";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getKelas } from "../../redux/actions/kelas";
import { getMapel } from "../../redux/actions/mapel";
import { addListMapel } from "../../redux/actions/list_mapel";
import Loading from "../Loading";
import swal from "sweetalert";

import bg from "../../Images/bg.svg";

const TambahMapel = (props) => {
  const dispatch = useDispatch();
  const [loading1, setLoading1] = useState(true);
  const [dataKelas, setKelas] = useState([]);
  const [dataMapel, setMapel] = useState([]);
  const [id_kelas, setIdKelas] = useState("");
  const [id_mapel, setIdMapel] = useState("");
  const [id_guru, setIdGuru] = useState("");
  const type = "materi";
  const [file, setFile] = useState(null);
  const [description, setDes] = useState("");
  const [msg, setMsg] = useState("");

  const clear = () => {
    setIdKelas("");
    setIdMapel("");
    setDes("");
    setMsg("");
    setFile(null);
  };

  const parseJwt = (token) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    const decoded = JSON.parse(jsonPayload);
    return decoded.id;
  };

  useEffect(() => {
    setIdGuru(parseJwt(localStorage.getItem("Token")));
    document.getElementById("title").innerText = "Tambah Mata Pelajaran";
  }, []);

  const logout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("Rule");
    props.history.push("/");
  };

  useEffect(() => {
    const getData = async () => {
      setLoading1(true);
      await dispatch(getKelas()).then(async (res) => {
        setKelas(res.value.data.result);
        await dispatch(getMapel()).then((res) => {
          setMapel(res.value.data.result);
          setLoading1(false);
        });
      });
    };
    getData();
  }, [dispatch]);

  const handleUpload = (e) => {
    if (e.target.files[0]) {
      let fileName = e.target.files[0].name;
      if (/.(pdf)/g.test(fileName)) {
        setFile(e.target.files[0]);
      } else {
        setMsg("Type File tidak diizinkan!");
        e.target.value = null;
      }
    }
  };

  const handlePost = async () => {
    if ((!id_kelas, !id_mapel, !description)) {
      setMsg("Semua data harus diisi!");
    } else {
      if (file === null) {
        setMsg("File harus diisi!");
      } else {
        setLoading1(true);
        let fd = new FormData();
        fd.append("file", file, file.name);
        fd.set("id_kelas", id_kelas);
        fd.set("id_mapel", id_mapel);
        fd.set("id_guru", id_guru);
        fd.set("description", description);
        fd.set("type", type);
        await dispatch(addListMapel(fd)).then(() => {
          setLoading1(false);
          swal({
            title: "Berhasil",
            text: "Mapel Ditambahkan",
            icon: "success",
            buttons: ["Tambah Lagi", "Oke"],
          }).then((oke) => {
            if (oke) {
              props.history.push("/mapel");
            }
          });
          clear();
        });
      }
    }
  };

  return !localStorage.getItem("Token") ? (
    <Redirect to="/auth" />
  ) : localStorage.getItem("Rule") === "guru" ? (
    <>
      <Header page="list-mapel" logout={logout} />
      <div className="wrapper">
        {loading1 ? <Loading /> : null}
        <>
          <div className="container-fluid sekolah">
            <div className="img-sekolah">
              <img src={bg} alt="background" />
            </div>
            <div className="sekolah-content">
              <div className="form">
                <h2 className="profile-h2">Tambah Mapel</h2>
                <p className="text-danger">{msg}</p>
                <div
                  className={id_kelas ? "input-div one focus" : "input-div one"}
                >
                  <div className="i">
                    <i className="fas fa-user"></i>
                  </div>
                  <div className="div">
                    <h5>Pilih Kelas</h5>
                    <select
                      className="input-select"
                      name="kelas"
                      id="kelas"
                      required
                      value={id_kelas}
                      onChange={(e) => setIdKelas(e.target.value)}
                    >
                      <option value=""></option>
                      {dataKelas.map((kelas, i) => {
                        return (
                          <option key={i} value={kelas.id}>
                            {kelas.nama_kelas}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                <div
                  className={id_mapel ? "input-div one focus" : "input-div one"}
                >
                  <div className="i">
                    <i className="fas fa-user"></i>
                  </div>
                  <div className="div">
                    <h5>Pilih Mapel</h5>
                    <select
                      className="input-select"
                      name="kelas"
                      id="kelas"
                      required
                      value={id_mapel}
                      onChange={(e) => setIdMapel(e.target.value)}
                    >
                      <option value=""></option>
                      {dataMapel.map((mapel, i) => {
                        return (
                          <option key={i} value={mapel.id}>
                            {mapel.nama_mapel}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                <div
                  className={
                    description ? "input-div one focus" : "input-div one"
                  }
                >
                  <div className="i">
                    <i className="fas fa-lock"></i>
                  </div>
                  <div className="div">
                    <h5>Description</h5>
                    <input
                      type="text"
                      className="input-area"
                      value={description}
                      onChange={(e) => setDes(e.target.value)}
                      maxLength={50}
                    />
                  </div>
                </div>
                <p className="text-danger des">{description.length}/50</p>

                <div className="form-group row">
                  <label className="col-sm-3 col-form-label font-weight-bold">
                    PDF File
                  </label>
                  <div className="col-sm-6">
                    <input
                      id="uploadFile"
                      type="file"
                      onChange={(e) => handleUpload(e)}
                    />
                  </div>
                </div>
                <button type="button" className="btn2" onClick={handlePost}>
                  Simpan
                </button>
                <button
                  className="btn2 btn-danger btn-block buton-dgr"
                  onClick={() => props.history.push("/mapel")}
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

export default TambahMapel;
