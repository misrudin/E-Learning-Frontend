import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loginGuru } from "../../redux/actions/auth";
import "./style.css";
import { Redirect } from "react-router-dom";
import Loading from "../Loading";

const LoginGuru = (props) => {
  const dispatch = useDispatch();
  const [nip, setNip] = useState("123456");
  const [password, setPassword] = useState("123");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const validPassword = (data) => {
    // eslint-disable-next-line
    let Regex = /^[A-Za-z\d]{3,}$/;
    return Regex.test(data);
  };
  const validNip = (data) => {
    // eslint-disable-next-line
    let Regex = /^[0-9\d]{4,}$/;
    return Regex.test(data);
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
    return decoded.rule;
  };

  const login = async () => {
    setLoading(true);
    const data = { nip, password };
    if (!validNip(nip)) {
      setMsg("Format NIP Harus Angka Dan Minimal 4 Karakter!");
    } else if (!validPassword(password)) {
      setMsg("Input Password Minimal 3 Karakter!");
    } else {
      await dispatch(loginGuru(data)).then((res) => {
        const result = res.value.data.result;
        if (result.msg) {
          setMsg(result.msg);
          setLoading(false);
        } else {
          const rule = parseJwt(result.token);
          localStorage.setItem("Token", result.token);
          localStorage.setItem("Rule", rule);
          setLoading(false);
        }
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    document.getElementById("title").innerText = "Guru";
  }, []);

  return !localStorage.getItem("Token") ? (
    <div className="container-fluid login">
      <div className="content">
        {loading ? <Loading /> : null}
        <p className="text-danger">{msg}</p>
        <form>
          <div className="form-group row">
            <label className="col-sm-3 col-form-label font-weight-bold">
              NIP
            </label>
            <div className="col-sm-9">
              <input
                type="text"
                className="form-control shadow-sm border-0"
                name="username"
                required
                placeholder="Ex: 123456789"
                value={nip}
                onChange={(e) => setNip(e.target.value)}
              />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-sm-3 col-form-label font-weight-bold">
              Password
            </label>
            <div className="col-sm-9">
              <input
                type="password"
                className="form-control shadow-sm border-0"
                name="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="button"
            className="btn btn-primary btn-block buton"
            onClick={(e) => login(e)}
          >
            Masuk
          </button>
          <button
            className="btn btn-danger btn-block buton-sec"
            onClick={() => props.history.push("/auth")}
          >
            Batal
          </button>
        </form>
      </div>
    </div>
  ) : (
    <Redirect to="/home" />
  );
};

export default LoginGuru;
