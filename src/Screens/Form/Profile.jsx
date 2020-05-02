import React, { useEffect, useState } from "react";
import "./style.css";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import Loading from "../Loading";
import { getDetailAdmin } from "../../redux/actions/auth";
import { getDetailSiswa } from "../../redux/actions/siswa";
import { getDetailGuru } from "../../redux/actions/guru";
import avatar from "../../Images/avatar.svg";
import { Link } from "react-router-dom";

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

  return !localStorage.getItem("Token") ? (
    <Redirect to="/auth" />
  ) : (
    <>
      <div className="card shadow-sm mb-3 border-0">
        <div className="card-body p-3">
          {loading1 ? (
            <Loading />
          ) : (
            <>
              <div className="container-profile">
                <div className="img-profile">
                  <img src={avatar} alt="avatar user" width="200px" />
                </div>
                <div className="right">
                  <div className="detail-profile">
                    <h3 className="mt-3">Nama : {data[0].nama}</h3>
                    <h3 className="mt-3">Email : {data[0].email}</h3>
                  </div>
                  <Link to="/profile" className="link">
                    <button
                      type="button"
                      className="btn btn-danger px-3 buton mt-2"
                    >
                      Edit Profile
                    </button>
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
