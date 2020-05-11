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

  const RenderItem = ({ index, data }) => {
    return (
      <div className="tugas">
        <div className="nomor">{/* <h3>{index}</h3> */}</div>
        <div className="tugas-body">
          <div className="tugas-title text-uppercase">
            <h3>
              {" "}
              {data.nama_mapel} - {data.nama_kelas}
            </h3>
          </div>
          <div className="tugas-content">
            <p className="text-capitalize">Guru : {data.nama_guru}</p>
            <p>Waktu : {data.time_create}</p>
            <p className="text-description text-capitalize">
              {data.description}
            </p>
          </div>
          <div className="tugas-footer">
            <button className="btn btn-primary buton-a">
              <i className="fa fa-edit fa-1x mr-1"></i>
              Edit
            </button>
            <button className="btn btn-primary buton-a">
              <i className="fa fa-trash fa-1x mr-1"></i>
              Hapus
            </button>
            <Link className="link" to={`mapel/detail/${data.id}`}>
              <button className="btn btn-primary buton-a">
                <i className="fa fa-hourglass-start fa-1x mr-1"></i>
                Mulai Belajar
              </button>
            </Link>
            <Link className="link" to={`akses/${data.id}`}>
              <button className="btn btn-primary buton-a">
                <i className="fa fa-history fa-1x mr-1"></i>
                Lihat Hasil
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      {rule === "guru" ? (
        <>
          {loading ? (
            <Loading />
          ) : (
            <>
              <h5 className="text-secondary my-4 judul">Materi</h5>
              <div className="container-tugas">
                {listMapel.map((mapel, i) => {
                  if (mapel.type === "materi") {
                    return <RenderItem key={i} data={mapel} index={i + 1} />;
                  }
                  return null;
                })}
              </div>
            </>
          )}

          {loading ? (
            <Loading />
          ) : (
            <>
              <h5 className="text-secondary my-4 judul">Soal</h5>
              <div className="container-tugas">
                {listMapel.map((mapel, i) => {
                  if (mapel.type === "soal") {
                    return <RenderItem key={i} data={mapel} index={i + 1} />;
                  }
                  return null;
                })}
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
              <h5 className="text-secondary my-4 judul">Materi</h5>
              <div className="container-tugas">
                {listMapel.map((mapel, i) => {
                  if (mapel.type === "materi") {
                    return <RenderItem key={i} data={mapel} index={i + 1} />;
                  }
                  return null;
                })}
              </div>
            </>
          )}

          {loading ? (
            <Loading />
          ) : (
            <>
              <h5 className="text-secondary my-4 judul">Soal</h5>
              <div className="container-tugas">
                {listMapel.map((mapel, i) => {
                  if (mapel.type === "soal") {
                    return <RenderItem key={i} data={mapel} index={i + 1} />;
                  }
                  return null;
                })}
              </div>
            </>
          )}
        </>
      ) : null}
    </>
  );
};

export default Akses;
