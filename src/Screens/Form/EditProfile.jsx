import React, { useEffect, useState } from "react";
import "./style.css";
import Header from "../../Components/Header";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  getDetailAdmin,
  loginAdmin,
  loginGuru,
  loginSiswa,
  EditProfileAdmin,
} from "../../redux/actions/auth";
import { getDetailGuru, editProfileGuru } from "../../redux/actions/guru";
import { getDetailSiswa, editProfileSiswa } from "../../redux/actions/siswa";
import Loading from "../Loading";

import bg from "../../Images/bg.svg";

const EditProfile = (props) => {
  const dispatch = useDispatch();
  const [loading1, setLoading1] = useState(true);
  const [msg, setMsg] = useState("");
  const [email, setEmail] = useState("");
  const [nama, setNama] = useState("");
  const [password, setPassword] = useState("");
  const [repeat, setRepeat] = useState("");
  const [id, setId] = useState("");
  const rule = localStorage.getItem("Rule");

  const [chace, setChace] = useState("");

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
    return decoded;
  };

  useEffect(() => {
    setId(parseJwt(localStorage.getItem("Token")).id);
    document.getElementById("title").innerText =
      "Profile : " + parseJwt(localStorage.getItem("Token")).nama;
  }, []);

  const logout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("Rule");
    props.history.push("/");
  };

  useEffect(() => {
    const getData = async () => {
      setLoading1(true);
      if (rule === "admin") {
        await dispatch(
          getDetailAdmin(parseJwt(localStorage.getItem("Token")).id)
        ).then((res) => {
          const result = res.value.data.result;
          setEmail(result[0].email);
          setNama(result[0].nama);
          setChace(result[0].email);
          setLoading1(false);
        });
      } else if (rule === "guru") {
        await dispatch(
          getDetailGuru(parseJwt(localStorage.getItem("Token")).id)
        ).then((res) => {
          const result = res.value.data.result;
          setEmail(result[0].email);
          setNama(result[0].nama);
          setChace(result[0].nip);
          setLoading1(false);
        });
      } else {
        await dispatch(
          getDetailSiswa(parseJwt(localStorage.getItem("Token")).id)
        ).then((res) => {
          const result = res.value.data.result;
          setEmail(result[0].email);
          setNama(result[0].nama);
          setChace(result[0].nis);
          setLoading1(false);
        });
      }
    };

    getData();
  }, [dispatch, rule, id]);

  const Admin = async (data) => {
    const dataLogin = {
      email: chace,
      password: repeat,
    };
    setLoading1(true);
    await dispatch(loginAdmin(dataLogin)).then(async (res) => {
      const result = res.value.data.result;
      if (result.msg) {
        setMsg(result.msg);
        setLoading1(false);
      } else {
        localStorage.setItem("Token", result.token);
        await dispatch(EditProfileAdmin(parseJwt(result.token).id, data)).then(
          () => {
            setLoading1(false);
            props.history.push("/home");
          }
        );
      }
    });
  };
  const Guru = async (data) => {
    const dataLogin = {
      nip: chace,
      password: repeat,
    };
    setLoading1(true);
    await dispatch(loginGuru(dataLogin)).then(async (res) => {
      const result = res.value.data.result;
      if (result.msg) {
        setMsg(result.msg);
        setLoading1(false);
      } else {
        localStorage.setItem("Token", result.token);
        await dispatch(editProfileGuru(parseJwt(result.token).id, data)).then(
          () => {
            setLoading1(false);
            props.history.push("/home");
          }
        );
      }
    });
  };

  const Siswa = async (data) => {
    const dataLogin = {
      nis: chace,
      password: repeat,
    };
    setLoading1(true);
    await dispatch(loginSiswa(dataLogin)).then(async (res) => {
      const result = res.value.data.result;
      if (result.msg) {
        setMsg(result.msg);
        setLoading1(false);
      } else {
        localStorage.setItem("Token", result.token);
        await dispatch(editProfileSiswa(parseJwt(result.token).id, data)).then(
          () => {
            setLoading1(false);
            props.history.push("/home");
          }
        );
      }
    });
  };

  const handlePost = () => {
    if (repeat) {
      const data = {
        nama,
        email,
        password,
      };
      const data2 = {
        nama,
        email,
      };
      if (password) {
        if (rule === "admin") {
          Admin(data);
        } else if (rule === "guru") {
          Guru(data);
        } else {
          Siswa(data);
        }
      } else {
        if (rule === "admin") {
          Admin(data2);
        } else if (rule === "guru") {
          Guru(data2);
        } else {
          Siswa(data2);
        }
      }
    } else {
      setMsg("Konfirmasi Password untuk keamanan!");
    }
  };

  return !localStorage.getItem("Token") ? (
    <Redirect to="/auth" />
  ) : (
    <>
      <Header page="profile" logout={logout} />
      <div className="wrapper">
        {loading1 ? <Loading /> : null}
        <>
          <div className="container-fluid sekolah">
            <div className="img-sekolah">
              <img src={bg} alt="background" />
            </div>
            <div className="sekolah-content">
              <div className="form">
                <h2 className="profile-h2">Edit Profile</h2>
                <p className="profile-p">
                  *Kosongkan Password jika tidak akan di ubah!
                </p>
                <p className="text-danger">{msg}</p>
                <div className={nama ? "input-div one focus" : "input-div one"}>
                  <div className="i">
                    <i className="fas fa-user"></i>
                  </div>
                  <div className="div">
                    <h5>Nama</h5>
                    <input
                      type="text"
                      className="input"
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                    />
                  </div>
                </div>

                <div
                  className={email ? "input-div one focus" : "input-div one"}
                >
                  <div className="i">
                    <i className="fas fa-user"></i>
                  </div>
                  <div className="div">
                    <h5>Email</h5>
                    <input
                      type="email"
                      className="input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div
                  className={password ? "input-div one focus" : "input-div one"}
                >
                  <div className="i">
                    <i className="fas fa-lock"></i>
                  </div>
                  <div className="div">
                    <h5>Password</h5>
                    <input
                      type="password"
                      className="input"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div
                  className={repeat ? "input-div one focus" : "input-div one"}
                >
                  <div className="i">
                    <i className="fas fa-lock"></i>
                  </div>
                  <div className="div">
                    <h5>Konfirmasi</h5>
                    <input
                      type="password"
                      className="input"
                      value={repeat}
                      onChange={(e) => setRepeat(e.target.value)}
                    />
                  </div>
                </div>
                <button type="button" className="btn2" onClick={handlePost}>
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
  );
};

export default EditProfile;
