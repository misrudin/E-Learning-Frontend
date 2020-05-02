import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  sortListMapel,
  sortListMapelKelas,
} from "../../redux/actions/list_mapel";
import { getDetailSiswa } from "../../redux/actions/siswa";
import Loading from "../Loading";
import "../Home/style.css";
import { Link } from "react-router-dom";

const Akses = (props) => {
  const { listMapel } = useSelector((state) => state.listmapel);
  // const [data, setData] = useState("");
  const dispatch = useDispatch();
  const rule = localStorage.getItem("Rule");
  // const tanggal = Date();
  const [loading, setLoading] = useState(true);

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
    // setData(parseJwt(localStorage.getItem("Token")));
    const getData = async () => {
      const id = parseJwt(localStorage.getItem("Token"));
      await dispatch(getDetailSiswa(id.id)).then(async (res) => {
        //   console.log(res.value.data.result[0].id_kelas);
        if (rule === "admin") {
          console.log("admin");
        } else if (rule === "guru") {
          const id = parseJwt(localStorage.getItem("Token"));
          setLoading(true);
          await dispatch(sortListMapel(id.id)).then(() => {
            setLoading(false);
          });
        } else if (rule === "siswa") {
          setLoading(true);
          await dispatch(
            sortListMapelKelas(res.value.data.result[0].id_kelas)
          ).then(() => {
            setLoading(false);
          });
        }
      });
    };

    getData();
  }, [dispatch, rule]);

  const RenderItem = ({ data, index }) => {
    // data.time_create === tanggal ? console.log("sama") : console.log("beda");
    return (
      <Link
        to={rule === "guru" ? `akses/${data.id}` : `mapel/detail/${data.id}`}
        className="link"
      >
        <div className="item-akses">
          <div className="judul-akses text-primary">
            <h6>
              {data.nama_mapel} {data.nama_kelas}
            </h6>
            <h6>Dibuat Pada : {data.time_create}</h6>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <>
      {rule === "admin" ? (
        <h1>admin</h1>
      ) : rule === "guru" ? (
        <>
          {loading ? (
            <Loading />
          ) : (
            <>
              <div className="card shadow-sm mb-3 border-0">
                <div className="card-body p-3">
                  <h5 className="text-secondary mb-2">Materi</h5>
                  <div className="items-akses">
                    {listMapel.map((mapel, i) => {
                      if (mapel.type === "materi") {
                        return (
                          <RenderItem key={i} data={mapel} index={i + 1} />
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              </div>
            </>
          )}

          {loading ? (
            <Loading />
          ) : (
            <>
              <div className="card shadow-sm mb-3 border-0">
                <div className="card-body p-3">
                  <h5 className="text-secondary mb -2">Soal</h5>
                  <div className="items-akses">
                    {listMapel.map((mapel, i) => {
                      if (mapel.type === "soal") {
                        return (
                          <RenderItem key={i} data={mapel} index={i + 1} />
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      ) : rule === "siswa" ? (
        <>
          {loading ? (
            <Loading />
          ) : (
            <>
              <div className="card shadow-sm mb-3 border-0">
                <div className="card-body p-3">
                  <h5 className="text-secondary mb-2">Materi</h5>
                  <div className="items-akses">
                    {listMapel.map((mapel, i) => {
                      if (mapel.type === "materi") {
                        return (
                          <RenderItem key={i} data={mapel} index={i + 1} />
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              </div>
            </>
          )}

          {loading ? (
            <Loading />
          ) : (
            <>
              <div className="card shadow-sm mb-3 border-0">
                <div className="card-body p-3">
                  <h5 className="text-secondary mb -2">Soal</h5>
                  <div className="items-akses">
                    {listMapel.map((mapel, i) => {
                      if (mapel.type === "soal") {
                        return (
                          <RenderItem key={i} data={mapel} index={i + 1} />
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      ) : null}
    </>
  );
};

export default Akses;
