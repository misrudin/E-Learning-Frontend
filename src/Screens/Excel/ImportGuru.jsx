import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImportGuru, tampilData, excelGuru } from "../../redux/actions/excel";
import Loading from "../Loading";
import { Redirect } from "react-router-dom";
import "./style.css";
import Header from "../../Components/Header";

const ImportDataGuru = (props) => {
  const { dataExcel } = useSelector((state) => state.excel);
  const dispatch = useDispatch();
  const [msg, setMsg] = useState(
    "Format file (.xlsx), Pastikan format data sesuai !"
  );
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const post = async (file) => {
    let fd = new FormData();
    fd.append("file", file, file.name);
    setLoading(true);
    await dispatch(ImportGuru(fd)).then((res) => {
      setData(res.value.data.result);
      setLoading(false);
    });
  };

  const save = async () => {
    if (!data) {
      setMsg("Tidak ada data untuk diimport!");
    } else {
      setMsg("");
      dispatch(tampilData());
      data.map(async (data) => {
        setLoading(true);
        const guru = {
          nip: data.nip,
          nama_guru: data.nama,
          email: data.email,
          password: data.nip,
        };
        await dispatch(excelGuru(guru)).then((res) => {
          setLoading(false);
        });
      });
    }
  };

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
    localStorage.removeItem("Rule");
    props.history.push("/");
  };

  return !localStorage.getItem("Token") ? (
    <Redirect to="/auth" />
  ) : localStorage.getItem("Rule") === "admin" ? (
    <>
      <Header page="guru" logout={logout} />
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
                    <th scope="col">NIP</th>
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
                            <td>{data.nip}</td>
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

export default ImportDataGuru;
