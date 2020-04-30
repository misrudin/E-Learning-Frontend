import React, { useEffect, useState } from "react";
import "./style.css";
import Header from "../../Components/Header";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getPageListMapel } from "../../redux/actions/list_mapel";
import Loading from "../Loading";
import { Link } from "react-router-dom";

const ListMapel = (props) => {
  const { listMapel } = useSelector((state) => state.listmapel);
  const dispatch = useDispatch();
  const rule = localStorage.getItem("Rule");

  const [loading1, setLoading1] = useState(true);
  const [page, setPage] = useState(1);
  const [key, setKey] = useState("");

  const prevPage = async () => {
    const newPage = page - 1;
    setPage(newPage);

    setLoading1(true);
    await dispatch(getPageListMapel(newPage, key)).then(() => {
      setLoading1(false);
    });
  };
  const nextPage = async () => {
    const newPage = page + 1;
    setPage(newPage);

    setLoading1(true);
    await dispatch(getPageListMapel(newPage, key)).then(() => {
      setLoading1(false);
    });
  };
  const getPage = async (newPage) => {
    setPage(newPage);

    setLoading1(true);
    await dispatch(getPageListMapel(newPage, key)).then(() => {
      setLoading1(false);
    });
  };

  const getKey = async (e) => {
    if (e) {
      if (e.key === "Enter") {
        setPage(1);
        setLoading1(true);
        await dispatch(getPageListMapel(1, key)).then(() => {
          setLoading1(false);
        });
      }
    } else {
      setPage(1);
      setLoading1(true);
      await dispatch(getPageListMapel(1, "")).then(() => {
        setLoading1(false);
      });
    }
  };

  useEffect(() => {
    document.getElementById("title").innerText = "List Mata Pelajaran dan Soal";
  }, []);

  const logout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("Guru");
    props.history.push("/");
  };

  useEffect(() => {
    const getData = async () => {
      setLoading1(true);
      await dispatch(getPageListMapel(1, "")).then(() => {
        setLoading1(false);
      });
    };
    getData();
  }, [dispatch]);

  const RenderItem = ({ index, data }) => {
    return (
      <>
        <div
          className={
            data.type === "soal" ? "item-mapel soal" : "item-mapel materi"
          }
          // onClick={() => props.history.push("mapel/detail")}
        >
          <div className="judul">
            <h4 className="mr-1 text-white">{index}.</h4>
            <h4 className="text-white">
              {data.nama_mapel} - {data.nama_kelas}
            </h4>
          </div>
          <p className="text-white mb-0 oleh">Oleh : {data.nama_guru}</p>
          <p className="text-white oleh">Pada : {data.time_create}</p>
          <div className="detail">
            <p className="text-white">
              ({data.type}) : {data.description}
            </p>
          </div>
          <Link to={`mapel/detail/${data.id}`}>
            <button className="btn btn-primary buton m-1 px-5">Buka</button>
          </Link>
        </div>
      </>
    );
  };

  return localStorage.getItem("Token") ? (
    <>
      <Header page="list-mapel" logout={logout} />
      <div className="wrapper">
        {loading1 ? (
          <Loading />
        ) : rule === "guru" ? (
          <>
            <div className="head">
              <div className="button">
                <button
                  className="btn btn-primary mb-3 mr-2 px-4 buton"
                  onClick={() => props.history.push("mapel/tambah-mapel")}
                >
                  Tambah Mapel
                </button>
                <button
                  className="btn btn-primary mb-3 mr-2 px-4 buton"
                  onClick={() => props.history.push("mapel/tambah-soal")}
                >
                  Tambah Soal
                </button>
              </div>
              <div className="cari">
                <input
                  type="text"
                  className="form-control shadow-sm cariinput border-0"
                  name="search"
                  required
                  value={key}
                  placeholder="Enter Untuk Cari ..."
                  onChange={(e) => setKey(e.target.value)}
                  onKeyPress={getKey}
                />
                {key.length > 0 ? (
                  <p
                    className="bersih"
                    onClick={() => {
                      setKey("");
                      getKey();
                    }}
                  >
                    x
                  </p>
                ) : null}
              </div>
            </div>

            <div className="items">
              {listMapel[2].map((data, i) => {
                return <RenderItem key={i} index={i + 1} data={data} />;
              })}
            </div>
            <div className="col-md-12 my-3">
              {listMapel[0] === 1 ? null : (
                <nav>
                  <ul className="pagination  justify-content-center">
                    {page <= 1 ? null : (
                      <li className="page-item" onClick={prevPage}>
                        <p className="page-link">Previous</p>
                      </li>
                    )}

                    {listMapel[3].map((page, i) => {
                      return (
                        <li
                          key={i}
                          className={
                            page.page === listMapel[1]
                              ? "page-item active"
                              : "page-item"
                          }
                          onClick={
                            page.page === listMapel[1]
                              ? null
                              : () => getPage(page.page)
                          }
                        >
                          <p className="page-link">{page.page}</p>
                        </li>
                      );
                    })}

                    {parseInt(page) < parseInt(listMapel[0]) ? (
                      <li className="page-item" onClick={nextPage}>
                        <p className="page-link">Next</p>
                      </li>
                    ) : null}
                  </ul>
                </nav>
              )}
            </div>
          </>
        ) : rule === "siswa" || rule === "admin" ? (
          <>
            <div className="cari">
              <input
                type="text"
                className="form-control col-sm-4 shadow-sm mb-3 cariinput border-0"
                name="search"
                required
                value={key}
                placeholder="Enter Untuk Cari ..."
                onChange={(e) => setKey(e.target.value)}
                onKeyPress={getKey}
              />
              {key.length > 0 ? (
                <p
                  className="bersih"
                  onClick={() => {
                    setKey("");
                    getKey();
                  }}
                >
                  x
                </p>
              ) : null}
            </div>
            <div className="items">
              {listMapel[2].map((data, i) => {
                return <RenderItem key={i} index={i + 1} data={data} />;
              })}
            </div>
            <div className="col-md-12 my-3">
              {listMapel[0] === 1 ? null : (
                <nav>
                  <ul className="pagination  justify-content-center">
                    {page <= 1 ? null : (
                      <li className="page-item" onClick={prevPage}>
                        <p className="page-link">Previous</p>
                      </li>
                    )}

                    {listMapel[3].map((page, i) => {
                      return (
                        <li
                          key={i}
                          className={
                            page.page === listMapel[1]
                              ? "page-item active"
                              : "page-item"
                          }
                          onClick={
                            page.page === listMapel[1]
                              ? null
                              : () => getPage(page.page)
                          }
                        >
                          <p className="page-link">{page.page}</p>
                        </li>
                      );
                    })}

                    {parseInt(page) < parseInt(listMapel[0]) ? (
                      <li className="page-item" onClick={nextPage}>
                        <p className="page-link">Next</p>
                      </li>
                    ) : null}
                  </ul>
                </nav>
              )}
            </div>
          </>
        ) : null}
      </div>
    </>
  ) : (
    <Redirect to="/auth" />
  );
};

export default ListMapel;
