import React, { useEffect, useState } from "react";
import "./Tugas.css";
import Header from "../../Components/Header";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  getPageListMapel,
  addListMapel,
  editListMapel,
  deleteListMapel,
} from "../../redux/actions/list_mapel";
import Loading from "../Loading";
import { Link } from "react-router-dom";
import Search from "../Form/Search";
import { Modal } from "react-bootstrap";
import { getKelas } from "../../redux/actions/kelas";
import { getMapel } from "../../redux/actions/mapel";
import swal from "sweetalert";

const DataListMapel = (props) => {
  const dispatch = useDispatch();
  const rule = localStorage.getItem("Rule");

  const [listMapel, setList] = useState([]);
  const [loading1, setLoading1] = useState(true);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [key, setKey] = useState("");
  const [modal, setModal] = useState("");
  const [show, setShow] = useState(false);

  // input
  const [dataKelas, setKelas] = useState([]);
  const [dataMapel, setMapel] = useState([]);
  const [id_kelas, setIdKelas] = useState("");
  const [id_mapel, setIdMapel] = useState("");
  const [id_guru, setIdGuru] = useState("");
  const [type, setType] = useState("");
  const [file, setFile] = useState(null);
  const [description, setDes] = useState("");
  const [msg, setMsg] = useState("");
  // edit
  const [id, setId] = useState("");

  const clear = () => {
    setMsg("");
    setDes("");
    setIdKelas("");
    setIdMapel("");
  };

  const handleClose = () => {
    clear();
    setShow(false);
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
    setIdGuru(parseJwt(localStorage.getItem("Token")));
  }, []);

  useEffect(() => {
    const getData = async () => {
      setLoading1(true);
      await dispatch(getKelas()).then(async (res) => {
        setKelas(res.value.data.result);
        await dispatch(getMapel()).then((res) => {
          setMapel(res.value.data.result);
          setLoading1(false);
        });
      });
    };
    getData();
  }, [dispatch]);

  const prevPage = async () => {
    const newPage = page - 1;
    setPage(newPage);

    setLoading(true);
    await dispatch(getPageListMapel(newPage, key)).then((res) => {
      setList(res.value.data.result);
      setLoading(false);
    });
  };
  const nextPage = async () => {
    const newPage = page + 1;
    setPage(newPage);

    setLoading(true);
    await dispatch(getPageListMapel(newPage, key)).then((res) => {
      setList(res.value.data.result);
      setLoading(false);
    });
  };
  const getPage = async (newPage) => {
    setPage(newPage);

    setLoading(true);
    await dispatch(getPageListMapel(newPage, key)).then((res) => {
      setList(res.value.data.result);
      setLoading(false);
    });
  };

  const SearchData = async (q) => {
    setKey(q);
    setPage(1);
    setLoading(true);
    await dispatch(getPageListMapel(1, q)).then((res) => {
      setList(res.value.data.result);
      setLoading(false);
    });
  };

  useEffect(() => {
    document.getElementById("title").innerText = "List Mata Pelajaran dan Soal";
  }, []);

  const logout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("Rule");
    props.history.push("/");
  };

  useEffect(() => {
    const getData = async () => {
      setLoading1(true);
      await dispatch(getPageListMapel(1, "")).then((res) => {
        setList(res.value.data.result);
        setLoading1(false);
      });
    };
    getData();
  }, [dispatch]);

  const handleUpload = (e) => {
    if (e.target.files[0]) {
      let fileName = e.target.files[0].name;
      if (/.(pdf)/g.test(fileName)) {
        setFile(e.target.files[0]);
      } else {
        setMsg("Type File tidak diizinkan!");
        e.target.value = null;
      }
    }
  };

  const getData2 = async () => {
    setLoading(true);
    await dispatch(getPageListMapel(page, key)).then((res) => {
      setList(res.value.data.result);
      setLoading(false);
    });
  };

  const handlePost = async () => {
    if ((!id_kelas, !id_mapel, !description)) {
      setMsg("Semua data harus diisi!");
    } else {
      if (file === null) {
        setMsg("File harus diisi!");
      } else {
        setLoading1(true);
        setShow(false);
        let fd = new FormData();
        fd.append("file", file, file.name);
        fd.set("id_kelas", id_kelas);
        fd.set("id_mapel", id_mapel);
        fd.set("id_guru", id_guru);
        fd.set("description", description);
        fd.set("type", type);
        await dispatch(addListMapel(fd)).then(() => {
          setLoading1(false);
          swal("Mapel Ditambahkan", "success");
          handleClose();
          getData2();
        });
      }
    }
  };

  const handleEdit = async () => {
    if ((!id_kelas, !id_mapel, !description)) {
      setMsg("Semua data harus diisi!");
    } else {
      setLoading1(true);
      setShow(false);
      let fd = new FormData();
      if (file !== null) {
        fd.append("file", file, file.name);
      }
      fd.set("id_kelas", id_kelas);
      fd.set("id_mapel", id_mapel);
      fd.set("id_guru", id_guru);
      fd.set("description", description);
      fd.set("type", type);
      await dispatch(editListMapel(fd, id)).then(() => {
        setLoading1(false);
        swal("Mapel Diedit", "success");
        handleClose();
        getData2();
      });
    }
  };

  const handleInputEdit = (data) => {
    setId(data.id);
    setIdMapel(data.id_mapel);
    setIdKelas(data.id_kelas);
    setDes(data.description);
    setType(data.type);
    setShow(true);
  };

  const handleDelete = async (id) => {
    swal({
      title: "Yakin ?",
      text: "Setelah dihapus, data tidak bisa dipulihkan",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        setLoading(true);
        await dispatch(deleteListMapel(id)).then(() => {
          getData2();
          setLoading(false);
          swal("Berhasil!", "Data Guru Dihapus", "success");
        });
      }
    });
  };

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
            <p className="bg-warning p-1 d-inline text-white">{data.type}</p>
            <p className="text-description text-capitalize">
              {data.description}
            </p>
          </div>
          <div className="tugas-footer">
            <button
              className="btn btn-primary buton-a"
              onClick={() => handleInputEdit(data)}
            >
              <i className="fa fa-edit fa-1x mr-1"></i>
              Edit
            </button>
            <button
              className="btn btn-primary buton-a"
              onClick={() => handleDelete(data.id)}
            >
              <i className="fa fa-trash fa-1x mr-1"></i>
              Hapus
            </button>
            <Link className="link" to={`mapel/detail/${data.id}`}>
              <button className="btn btn-primary buton-a">
                <i className="fa fa-hourglass-start fa-1x mr-1"></i>
                Mulai Belajar
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return localStorage.getItem("Token") ? (
    <>
      <Header page="list-mapel" logout={logout} />
      <div className="wrapper">
        {loading ? <Loading /> : null}
        <>
          <div className="head">
            {rule === "guru" ? (
              <>
                <div className="button">
                  <button
                    className="btn btn-primary mb-3 mr-2 px-2 buton"
                    onClick={() => {
                      setShow(true);
                      setModal("tambah");
                      setType("materi");
                    }}
                  >
                    <i className="fa fa-plus fa-1x mr-1"></i>
                    Mapel
                  </button>
                  <button
                    className="btn btn-primary mb-3 mr-2 px-2 buton"
                    onClick={() => {
                      setShow(true);
                      setModal("tambah");
                      setType("soal");
                    }}
                  >
                    <i className="fa fa-plus fa-1x mr-1"></i>
                    Soal
                  </button>
                </div>
              </>
            ) : null}
            <div className="cari">
              <Search search={(q) => SearchData(q)} />
            </div>
          </div>
          {loading1 ? (
            <Loading />
          ) : rule === "guru" ? (
            <>
              <div className="container-tugas">
                {!listMapel
                  ? null
                  : listMapel[2].map((data, i) => {
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
              <div className="container-tugas">
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
        </>
      </div>

      {/* modal input */}
      <Modal
        show={show}
        onHide={() => handleClose()}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {modal === "tambah" ? "Tambah" : "Edit"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="sekolah-content">
            <div className="form-input">
              <p className="text-danger">{msg}</p>

              <div
                className={id_kelas ? "input-div one focus" : "input-div one"}
              >
                <div className="i">
                  <i className="fas fa-user"></i>
                </div>
                <div className="div">
                  <h5>Pilih Kelas</h5>
                  <select
                    className="input-select"
                    name="kelas"
                    id="kelas"
                    required
                    value={id_kelas}
                    onChange={(e) => setIdKelas(e.target.value)}
                  >
                    <option value=""></option>
                    {dataKelas.map((kelas, i) => {
                      return (
                        <option key={i} value={kelas.id}>
                          {kelas.nama_kelas}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div
                className={id_mapel ? "input-div one focus" : "input-div one"}
              >
                <div className="i">
                  <i className="fas fa-user"></i>
                </div>
                <div className="div">
                  <h5>Pilih Mapel</h5>
                  <select
                    className="input-select"
                    name="kelas"
                    id="kelas"
                    required
                    value={id_mapel}
                    onChange={(e) => setIdMapel(e.target.value)}
                  >
                    <option value=""></option>
                    {dataMapel.map((mapel, i) => {
                      return (
                        <option key={i} value={mapel.id}>
                          {mapel.nama_mapel}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div
                className={
                  description ? "input-div one focus" : "input-div one"
                }
              >
                <div className="i">
                  <i className="fas fa-lock"></i>
                </div>
                <div className="div">
                  <h5>Description</h5>
                  <input
                    type="text"
                    className="input-area"
                    value={description}
                    onChange={(e) => setDes(e.target.value)}
                    maxLength={50}
                  />
                </div>
              </div>
              <p className="text-danger des">{description.length}/50</p>

              <div className="form-group row">
                <label className="col-sm-3 col-form-label font-weight-bold">
                  PDF File
                </label>
                <div className="col-sm-6">
                  <input
                    id="uploadFile"
                    type="file"
                    onChange={(e) => handleUpload(e)}
                  />
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-secondary font-weight-bold px-3 mr-2 buton-sec"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary font-weight-bold px-4 buton"
            onClick={modal === "tambah" ? handlePost : handleEdit}
          >
            Simpan
          </button>
        </Modal.Footer>
      </Modal>
    </>
  ) : (
    <Redirect to="/auth" />
  );
};

export default DataListMapel;
