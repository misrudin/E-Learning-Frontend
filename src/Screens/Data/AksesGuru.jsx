import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAkses, getListMapelId } from "../../redux/actions/list_mapel";
import Header from "../../Components/Header";
import Loading from "../Loading";
import { Redirect } from "react-router-dom";
import { Alert } from "react-bootstrap";

const AksesGuru = (props) => {
  const dispatch = useDispatch();
  const { listAkses, listMapel } = useSelector((state) => state.listmapel);
  const [loading, setLoading] = useState(true);
  const id = props.match.params.id;

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      await dispatch(getListMapelId(id));
      await dispatch(getAkses(id)).then(() => {
        setLoading(false);
      });
    };
    getData();
  }, [dispatch, id]);

  const logout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("Guru");
    props.history.push("/");
  };

  useEffect(() => {
    document.getElementById("title").innerText = "Akses Materi Dan Soal";
  }, []);

  return !localStorage.getItem("Token") ? (
    <Redirect to="/auth" />
  ) : localStorage.getItem("Rule") === "guru" ? (
    <>
      <Header page="akses" logout={logout} />
      <div className="wrapper">
        {loading ? (
          <Loading />
        ) : (
          <>
            <div className="card shadow-sm mb-3">
              <div className="card-body p-3">
                <h4 className="text-uppercase">
                  {listMapel[0].type} : {listMapel[0].nama_mapel}{" "}
                  {listMapel[0].nama_kelas}
                </h4>
                <p className="text-secondary m-0">
                  Dibuat Oleh : {listMapel[0].nama_guru}
                </p>
                <p className="text-secondary m-0">
                  Pada : {listMapel[0].time_create}
                </p>
              </div>
            </div>

            <div className="card shadow-sm">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table text-center m-0">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">FIRST AKSES</th>
                        <th scope="col">SISWA</th>
                        <th scope="col">COUNT</th>
                        <th scope="col">LAST AKSES</th>
                      </tr>
                    </thead>
                    <tbody>
                      {listAkses.map((data, i) => {
                        return (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{data.time_akses}</td>
                            <td>{data.nama_siswa}</td>
                            <td>{data.count} X</td>
                            <td>{data.last_akses}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <>
              {listAkses.length > 0 ? (
                <Alert variant="warning" className="mt-3">
                  Perubahan Data Tidak Terkadi Secara Realtime!. Refresh Halaman
                  Untuk Melihat Perubaha Data!
                </Alert>
              ) : (
                <Alert variant="warning" className="mt-3">
                  Belum Ada Siswa Yang Mengakses Materi / Soal
                </Alert>
              )}
            </>
          </>
        )}
      </div>
    </>
  ) : (
    <Redirect to="/home" />
  );
};

export default AksesGuru;
