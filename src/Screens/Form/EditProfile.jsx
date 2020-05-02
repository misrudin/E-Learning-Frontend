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
    localStorage.removeItem("Guru");
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
  };

  return !localStorage.getItem("Token") ? (
    <Redirect to="/auth" />
  ) : (
    <>
      <Header page="profile" logout={logout} />
      <div className="wrapper">
        {loading1 ? (
          <Loading />
        ) : (
          <>
            <div className="form">
              <p className="mx-auto text-danger">{msg}</p>
              <form>
                <div className="form-group row">
                  <label className="col-sm-2 col-form-label font-weight-bold">
                    Nama
                  </label>
                  <div className="col-sm-6">
                    <input
                      type="text"
                      className="form-control shadow-sm border-0"
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label font-weight-bold">
                    Email
                  </label>
                  <div className="col-sm-6">
                    <input
                      type="email"
                      className="form-control shadow-sm border-0"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label font-weight-bold">
                    Password
                  </label>
                  <div className="col-sm-6">
                    <input
                      type="password"
                      className="form-control shadow-sm border-0"
                      placeholder="Kosongkan jika tidak mengganti password !"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label className="col-sm-2 col-form-label font-weight-bold">
                    Konfirmasi
                  </label>
                  <div className="col-sm-6">
                    <input
                      type="password"
                      className="form-control shadow-sm border-0"
                      placeholder="Konfirmasi password untuk Edit !"
                      value={repeat}
                      onChange={(e) => setRepeat(e.target.value)}
                    />
                  </div>
                </div>
              </form>
              <div className="col-sm-8 tombol">
                <button
                  type="button"
                  className="btn btn-secondary font-weight-bold px-3 mr-2 buton-sec"
                  onClick={() => props.history.push("/home")}
                >
                  Batal
                </button>
                <button
                  type="button"
                  className="btn btn-primary font-weight-bold px-4 buton"
                  onClick={handlePost}
                >
                  Simpan
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default EditProfile;
