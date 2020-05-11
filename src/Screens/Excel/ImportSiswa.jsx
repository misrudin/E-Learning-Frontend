import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImportSiswa, tampilData, excelSiswa } from "../../redux/actions/excel";
import Loading from "../Loading";
import { Redirect } from "react-router-dom";
import "./style.css";
import { getKelas } from "../../redux/actions/kelas";
import Header from "../../Components/Header";

const ImportDataSiswa = (props) => {
  const { dataExcel } = useSelector((state) => state.excel);
  const dispatch = useDispatch();
  const [msg, setMsg] = useState(
    "Format file (.xlsx), Pastikan format data sesuai !, *Per Kelas"
  );
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [id_kelas, setId] = useState("");
  const [kelas, setKelas] = useState([]);

  const post = async (file) => {
    let fd = new FormData();
    fd.append("file", file, file.name);
    setLoading(true);
    await dispatch(ImportSiswa(fd)).then((res) => {
      setData(res.value.data.result);
      setLoading(false);
    });
  };

  const save = async () => {
    if (!data) {
      setMsg("Tidak ada data untuk diimport!");
    } else if (!id_kelas) {
      setMsg("Pilih Kelas Untuk Semua Data Siswa Yang Akan Di Import !");
    } else {
      setMsg("");
      dispatch(tampilData());
      data.map(async (data) => {
        setLoading(true);
        const siswa = {
          nis: data.nis,
          nama: data.nama,
          email: data.email,
          password: data.nis,
          id_kelas,
        };
        await dispatch(excelSiswa(siswa)).then((res) => {
          setLoading(false);
        });
      });
    }
  };

  useEffect(() => {
    const getDataKelas = async () => {
      await dispatch(getKelas())
        .then((res) => {
          setKelas(res.value.data.result);
        })
        .catch((err) => console.log(err));
    };

    getDataKelas();
  }, [dispatch]);

  const handleUpload = (e) => {
    if (e.target.files[0]) {
      let fileName = e.target.files[0].name;
      if (/.(xlsx)/g.test(fileName)) {
        post(e.target.files[0]);
      } else {
        setMsg("Type File tidak diizinkan!");
        e.target.value = null;
      }
    }
  };

  const logout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("Guru");
    props.history.push("/");
  };

  return !localStorage.getItem("Token") ? (
    <Redirect to="/auth" />
  ) : localStorage.getItem("Rule") === "admin" ? (
    <>
      <Header page="siswa" logout={logout} />
      {loading ? <Loading /> : null}
      <div className="wrapper">
        <div className="card shadow-sm mb-3 border-0">
          <div className="d-flex card-body p-3 justify-content-center align-items-center flex-column">
            <div className="frm mb-2">
              <div className="import">
                <input
                  id="uploadFile"
                  type="file"
                  onChange={(e) => handleUpload(e)}
                />
              </div>

              <div className="import">
                <select
                  className="custom-select shadow-sm border-0 "
                  name="kelas"
                  id="kelas"
                  required
                  value={id_kelas}
                  onChange={(e) => setId(e.target.value)}
                >
                  <option value="">Pilih Kelas</option>
                  {kelas.map((kelas, i) => {
                    return (
                      <option key={i} value={kelas.id}>
                        {kelas.nama_kelas}
                      </option>
                    );
                  })}
                </select>
              </div>

              <button
                className={
                  dataExcel
                    ? "btn btn-primary px-4 buton"
                    : "btn btn-primary px-4 buton disabled"
                }
                onClick={dataExcel ? save : null}
              >
                <i className="fa fa-download fa-1x"></i> Import
              </button>
            </div>
            <p className="text-danger text-center m-0">{msg}</p>
          </div>
        </div>

        <div className="card shadow">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table text-center m-0">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">NIS</th>
                    <th scope="col">NAMA</th>
                    <th scope="col">EMAIL</th>
                    <th scope="col">STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {!dataExcel
                    ? null
                    : dataExcel.map((data, i) => {
                        return (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{data.nis}</td>
                            <td>{data.nama}</td>
                            <td>{data.email}</td>
                            <td>
                              {data.status === 0
                                ? "Gagal"
                                : data.status === 1
                                ? "Berhasil"
                                : "Belum Import"}
                            </td>
                          </tr>
                        );
                      })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Redirect to="/home" />
  );
};

export default ImportDataSiswa;
