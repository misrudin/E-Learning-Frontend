import React, { useEffect, useState } from "react";
import "./style.css";
import Header from "../../Components/Header";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import Loading from "../Loading";
import swal from "sweetalert";
import { getDetailAdmin } from "../../redux/actions/auth";
import { getDetailSiswa } from "../../redux/actions/siswa";
import { getDetailGuru } from "../../redux/actions/guru";

const Profile = (props) => {
  const dispatch = useDispatch();
  const [loading1, setLoading1] = useState(true);
  const rule = localStorage.getItem("Rule");
  const [data, setData] = useState([]);

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
    const getData = async () => {
      if (rule === "admin") {
        setLoading1(true);
        await dispatch(
          getDetailAdmin(parseJwt(localStorage.getItem("Token")).id)
        ).then((res) => {
          setData(res.value.data.result);
          setLoading1(false);
        });
      } else if (rule === "guru") {
        setLoading1(true);
        await dispatch(
          getDetailGuru(parseJwt(localStorage.getItem("Token")).id)
        ).then((res) => {
          setData(res.value.data.result);
          setLoading1(false);
        });
      } else {
        setLoading1(true);
        await dispatch(
          getDetailSiswa(parseJwt(localStorage.getItem("Token")).id)
        ).then((res) => {
          setData(res.value.data.result);
          setLoading1(false);
        });
      }
    };

    getData();
  }, [dispatch, rule]);

  const logout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("Guru");
    props.history.push("/");
  };

  useEffect(() => {
    document.getElementById("title").innerText =
      "Profile : " + parseJwt(localStorage.getItem("Token")).nama;
  }, []);

  return !localStorage.getItem("Token") ? (
    <Redirect to="/auth" />
  ) : (
    <>
      <Header page="profile" logout={logout} />
      <div className="wrapper">
        {loading1 ? <Loading /> : <>{<h1>{data.join("=")}</h1>}</>}
      </div>
    </>
  );
};

export default Profile;
