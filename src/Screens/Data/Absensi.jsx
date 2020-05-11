import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";
import { getPageAbsen } from "../../redux/actions/absen";
import { getPageSiswa } from "../../redux/actions/siswa";
import { getKelas } from "../../redux/actions/kelas";
import Loading from "../Loading";
import Search from "../Form/Search";

const Absensi = (props) => {
  const { dataAbsen } = useSelector((state) => state.absen);
  const dispatch = useDispatch();
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [dataKelas, setDataKelas] = useState([]);
  const [page, setPage] = useState(1);
  const [key, setKey] = useState("");
  const [key2, setKey2] = useState("");
  const tanggal = [
    { t: 1 },
    { t: 2 },
    { t: 3 },
    { t: 4 },
    { t: 5 },
    { t: 6 },
    { t: 7 },
    { t: 8 },
    { t: 9 },
    { t: 10 },
    { t: 11 },
    { t: 12 },
    { t: 13 },
    { t: 14 },
    { t: 15 },
    { t: 16 },
    { t: 17 },
    { t: 18 },
    { t: 19 },
    { t: 20 },
    { t: 21 },
    { t: 22 },
    { t: 23 },
    { t: 24 },
    { t: 25 },
    { t: 26 },
    { t: 27 },
    { t: 28 },
    { t: 29 },
    { t: 30 },
    { t: 31 },
  ];

  const prevPage = async () => {
    const newPage = page - 1;
    setPage(newPage);

    setLoading2(true);
    await dispatch(getPageAbsen(newPage, key, key2)).then(() => {
      setLoading2(false);
    });
  };
  const nextPage = async () => {
    const newPage = page + 1;
    setPage(newPage);

    setLoading2(true);
    await dispatch(getPageAbsen(newPage, key, key2)).then(() => {
      setLoading2(false);
    });
  };
  const getPage = async (newPage) => {
    setPage(newPage);

    setLoading2(true);
    await dispatch(getPageAbsen(newPage, key, key2)).then(() => {
      setLoading2(false);
    });
  };

  const filterKelas = async (e) => {
    setKey2(e);
    setPage(1);
    setLoading2(true);
    await dispatch(getPageAbsen(1, key, e)).then(() => {
      setLoading2(false);
    });
  };

  const SearchData = async (q) => {
    setKey(q);
    setPage(1);
    setLoading2(true);
    await dispatch(getPageAbsen(1, q, key2)).then(() => {
      setLoading2(false);
    });
  };

  useEffect(() => {
    document.getElementById("title").innerText = "Data Absensi";
  }, []);

  useEffect(() => {
    const getDataKelas = async () => {
      await dispatch(getKelas())
        .then((res) => {
          setDataKelas(res.value.data.result);
        })
        .catch((err) => console.log(err));
    };

    getDataKelas();
    const getData2 = async () => {
      setLoading1(true);
      await dispatch(getPageAbsen(1, "", "")).then(() => {
        setLoading1(false);
      });
    };

    getData2();
  }, [dispatch]);

  const logout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("Rule");
    props.history.push("/");
  };

  return !localStorage.getItem("Token") ? (
    <Redirect to="/auth" />
  ) : localStorage.getItem("Rule") !== "siswa" ? (
    <>
      <Header page="absen" logout={logout} />
      <div className="wrapper">
        {loading2 ? <Loading /> : null}
        {loading1 ? (
          <Loading />
        ) : (
          <>
            <div className="head">
              <div className="cari">
                <div className="mr-1">
                  <select
                    className="custom-select shadow-sm border-0"
                    name="kelas"
                    value={key2}
                    onChange={(e) => filterKelas(e.target.value)}
                  >
                    <option value="">Tampilkan Semua</option>
                    {dataKelas.map((kelas, i) => {
                      return (
                        <option key={i} value={kelas.id}>
                          {kelas.nama_kelas}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <Search search={(q) => SearchData(q)} />
              </div>
            </div>
            <div className="tahun d-flex mb-2">
              <div className="mr-1">
                <input
                  type="text"
                  className="form-control shadow-sm cariinput2 border-0"
                  defaultValue={new Date().getFullYear()}
                />
              </div>
              <div className="mx-1">
                <input
                  type="text"
                  className="form-control shadow-sm cariinput2 border-0"
                  defaultValue={new Date().getMonth() + 1}
                />
              </div>
              <button className="btn btn-primary px-3 buton">
                <i className="fa fa-search"></i>
              </button>
            </div>

            <div className="card shadow">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table table-border table-hover m-0">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">NIS</th>
                        <th scope="col">NAMA</th>
                        {tanggal.map((data, i) => {
                          return (
                            <th key={i} scope="col">
                              {data.t}
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {!dataAbsen
                        ? console.log("Error 201!, try again")
                        : dataAbsen[2].map((data, i) => {
                            return (
                              <tr className="absen" key={i}>
                                <td className="tdkecil">{i + 1}</td>
                                <td className="tdkecil">{data.nis}</td>
                                <td className="tdkecil">{data.nama}</td>
                                <td className="tdkecil">{data.tgl_1}</td>
                                <td className="tdkecil">{data.tgl_2}</td>
                                <td className="tdkecil">{data.tgl_3}</td>
                                <td className="tdkecil">{data.tgl_4}</td>
                                <td className="tdkecil">{data.tgl_5}</td>
                                <td className="tdkecil">{data.tgl_6}</td>
                                <td className="tdkecil">{data.tgl_7}</td>
                                <td className="tdkecil">{data.tgl_8}</td>
                                <td className="tdkecil">{data.tgl_9}</td>
                                <td className="tdkecil">{data.tgl_10}</td>
                                <td className="tdkecil">{data.tgl_11}</td>
                                <td className="tdkecil">{data.tgl_12}</td>
                                <td className="tdkecil">{data.tgl_13}</td>
                                <td className="tdkecil">{data.tgl_14}</td>
                                <td className="tdkecil">{data.tgl_15}</td>
                                <td className="tdkecil">{data.tgl_16}</td>
                                <td className="tdkecil">{data.tgl_17}</td>
                                <td className="tdkecil">{data.tgl_18}</td>
                                <td className="tdkecil">{data.tgl_19}</td>
                                <td className="tdkecil">{data.tgl_20}</td>
                                <td className="tdkecil">{data.tgl_21}</td>
                                <td className="tdkecil">{data.tgl_22}</td>
                                <td className="tdkecil">{data.tgl_23}</td>
                                <td className="tdkecil">{data.tgl_24}</td>
                                <td className="tdkecil">{data.tgl_25}</td>
                                <td className="tdkecil">{data.tgl_26}</td>
                                <td className="tdkecil">{data.tgl_27}</td>
                                <td className="tdkecil">{data.tgl_28}</td>
                                <td className="tdkecil">{data.tgl_29}</td>
                                <td className="tdkecil">{data.tgl_30}</td>
                                <td className="tdkecil">{data.tgl_31}</td>
                              </tr>
                            );
                          })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="col-md-12 my-3">
              {!dataAbsen ? (
                console.log("Error 201!, try again")
              ) : dataAbsen[0] === 1 ? null : (
                <nav>
                  <ul className="pagination  justify-content-center">
                    {page <= 1 ? null : (
                      <li className="page-item" onClick={prevPage}>
                        <p className="page-link">Previous</p>
                      </li>
                    )}

                    {!dataAbsen
                      ? console.log("Error 201!, try again")
                      : dataAbsen[3].map((page, i) => {
                          return (
                            <li
                              key={i}
                              className={
                                page.page === dataAbsen[1]
                                  ? "page-item active"
                                  : "page-item"
                              }
                              onClick={
                                page.page === dataAbsen[1]
                                  ? null
                                  : () => getPage(page.page)
                              }
                            >
                              <p className="page-link">{page.page}</p>
                            </li>
                          );
                        })}

                    {parseInt(page) < parseInt(dataAbsen[0]) ? (
                      <li className="page-item" onClick={nextPage}>
                        <p className="page-link">Next</p>
                      </li>
                    ) : null}
                  </ul>
                </nav>
              )}
            </div>
          </>
        )}
      </div>
    </>
  ) : (
    <Redirect to="/home" />
  );
};

export default Absensi;
