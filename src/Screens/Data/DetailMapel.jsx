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
    localStorage.removeItem("Rule");
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
            {listMapel[0] ? (
              <>
                <div className="card shadow-sm mb-3 border-0">
                  <div className="card-body p-3">
                    <h2 className="text-uppercase m-0">
                      {listMapel[0].type} : {listMapel[0].nama_mapel} -{" "}
                      {listMapel[0].nama_kelas}
                    </h2>
                    <p className="text-capitalize text-secondary m-0">
                      {" "}
                      Oleh : {listMapel[0].nama_guru}
                    </p>
                    <p className="text-capitalize text-secondary m-0">
                      Pada : {listMapel[0].time_create}
                    </p>
                  </div>
                </div>
                <div className="card shadow-sm mb-3 border-0">
                  <div className="card-body p-3">
                    <iframe
                      title="pdf"
                      src={listMapel[0].file}
                      className="pdf"
                    ></iframe>
                  </div>
                </div>
              </>
            ) : (
              <h3>Tidak Ada Data Untuk Ditampilkan '{id_mapel}'</h3>
            )}
          </>
        )}
        <div className="d-flex justify-content-end mt-4">
          <button
            className="btn btn-primary buton"
            onClick={() => props.history.push("/mapel")}
          >
            <i className="fa fa-reply fa-1x mr-1"></i>
            Kembali
          </button>
        </div>
      </div>
    </>
  ) : (
    <Redirect to="/auth" />
  );
};

export default DetailMapel;
