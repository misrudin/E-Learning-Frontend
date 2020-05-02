import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import { Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AddAkses, getListMapelId } from "../../redux/actions/list_mapel";
import Loading from "../Loading";

const DetailMapel = (props) => {
  const id_mapel = props.match.params.id;
  const dispatch = useDispatch();
  const { listMapel } = useSelector((state) => state.listmapel);
  const [loading, setLoading] = useState(true);
  const rule = localStorage.getItem("Rule");

  const logout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("Guru");
    props.history.push("/");
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
    const prosesData = async (id_siswa) => {
      setLoading(true);
      await dispatch(getListMapelId(id_mapel)).then(async () => {
        const data = {
          id_siswa: parseInt(id_siswa),
          id_mapel: parseInt(id_mapel),
        };
        if (rule === "siswa") {
          await dispatch(AddAkses(data)).then(() => {
            setLoading(false);
          });
        }
        setLoading(false);
      });
    };
    prosesData(parseJwt(localStorage.getItem("Token")));
  }, [dispatch, id_mapel, rule]);

  useEffect(() => {
    document.getElementById("title").innerText = "Detail Mapel";
  }, []);

  return localStorage.getItem("Token") ? (
    <>
      <Header page="list-mapel" logout={logout} />
      <div className="wrapper">
        {loading ? (
          <Loading />
        ) : (
          <>
            <h2>{listMapel[0].nama_mapel}</h2>
            <h2>{listMapel[0].nama_kelas}</h2>
            <h2>{listMapel[0].nama_guru}</h2>
            <h2>{listMapel[0].time_create}</h2>
            <h2>{listMapel[0].type}</h2>
            <h2>{listMapel[0].file}</h2>
          </>
        )}
      </div>
    </>
  ) : (
    <Redirect to="/auth" />
  );
};

export default DetailMapel;
