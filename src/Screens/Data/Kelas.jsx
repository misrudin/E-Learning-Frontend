import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import {
  getPageKelas,
  addKelas,
  editKelas,
  deleteKelas,
} from "../../redux/actions/kelas";
import Header from "../../Components/Header";
import Loading from "../Loading";
import swal from "sweetalert";

const DataKelas = (props) => {
  const { dataKelas, errMsg } = useSelector((state) => state.kelas);
  const dispatch = useDispatch();

  const [id, setId] = useState("");
  const [kelas, setKelas] = useState("");

  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [modal, setModal] = useState("");
  const [msg, setMsg] = useState(errMsg);
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);
  const [key, setKey] = useState("");

  const clear = () => {
    setKelas("");
    setMsg("");
  };

  const prevPage = async () => {
    const newPage = page - 1;
    setPage(newPage);

    setLoading2(true);
    await dispatch(getPageKelas(newPage, key)).then(() => {
      setLoading2(false);
    });
  };
  const nextPage = async () => {
    const newPage = page + 1;
    setPage(newPage);

    setLoading2(true);
    await dispatch(getPageKelas(newPage, key)).then(() => {
      setLoading2(false);
    });
  };
  const getPage = async (newPage) => {
    setPage(newPage);

    setLoading2(true);
    await dispatch(getPageKelas(newPage, key)).then(() => {
      setLoading2(false);
    });
  };

  const getKey = async (e) => {
    if (e) {
      if (e.key === "Enter") {
        setPage(1);
        setLoading2(true);
        await dispatch(getPageKelas(1, key)).then(() => {
          setLoading2(false);
        });
      }
    } else {
      setPage(1);
      setLoading2(true);
      await dispatch(getPageKelas(1, "")).then(() => {
        setLoading2(false);
      });
    }
  };

  const handleClose = () => {
    clear();
    setShow(false);
  };

  useEffect(() => {
    document.getElementById("title").innerText = "Data Guru";
  }, []);

  const getData = async () => {
    setLoading2(true);
    await dispatch(getPageKelas(page, key)).then(() => {
      setLoading2(false);
    });
  };

  const handlePost = async () => {
    if (!kelas) {
      setMsg("Data harus diisi!");
    } else {
      setLoading2(true);
      setShow(false);
      const data = {
        nama_kelas: kelas,
      };
      await dispatch(addKelas(data)).then((res) => {
        setLoading2(false);
        const result = res.value.data.result;
        if (result) {
          getData();
          swal("Berhasil!", "Data Kelas Ditambahkan", "success");
          handleClose();
        } else {
          setMsg(res.value.data);
          setShow(true);
        }
      });
    }
  };

  const handleDelete = (id) => {
    swal({
      title: "Yakin ?",
      text: "Setelah dihapus, data tidak bisa dipulihkan",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        setLoading2(true);
        await dispatch(deleteKelas(id)).then(() => {
          getData();
          setLoading2(false);
          swal("Berhasil!", "Data Kelas Dihapus", "success");
        });
      }
    });
  };

  const handleEdit = () => {
    if (!kelas) {
      setMsg("Semua data harus diisi!");
    } else {
      setShow(false);
      const data = {
        nama_kelas: kelas,
      };
      swal({
        title: "Yakin ?",
        text: "Edit Data Kelas",
        buttons: true,
      }).then(async (willEdit) => {
        if (willEdit) {
          setLoading2(true);
          await dispatch(editKelas(id, data)).then((res) => {
            setLoading2(false);
            const result = res.value.data.result;
            if (result) {
              getData();
              swal("Berhasil!", "Data Kelas Diedit", "success");
              handleClose();
            } else {
              setMsg(res.value.data);
              setShow(true);
            }
          });
        } else {
          setShow(true);
        }
      });
    }
  };

  const handleinputEdit = (data) => {
    setShow(true);
    setId(data.id);
    setKelas(data.nama_kelas);
  };

  useEffect(() => {
    const getData2 = async () => {
      setLoading1(true);
      await dispatch(getPageKelas(1, "")).then(() => {
        setLoading1(false);
      });
    };

    getData2();
  }, [dispatch]);

  const logout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("Guru");
    props.history.push("/");
  };

  return !localStorage.getItem("Token") ? (
    <Redirect to="/auth" />
  ) : localStorage.getItem("Rule") === "admin" ? (
    <>
      <Header page="kelas" logout={logout} />
      <div className="wrapper">
        {loading2 ? <Loading /> : null}
        {loading1 ? (
          <Loading />
        ) : (
          <>
            <div className="head">
              <button
                className="btn btn-primary px-4 buton"
                onClick={() => {
                  setModal("tambah");
                  setShow(true);
                }}
              >
                Tambah Data Kelas
              </button>
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

            <div className="card shadow">
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table text-center m-0">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">KELAS</th>
                        <th scope="col">ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataKelas[2].map((data, i) => {
                        return (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{data.nama_kelas}</td>
                            <td>
                              <button
                                type="button"
                                className="btn border-0"
                                onClick={() => handleDelete(data.id)}
                              >
                                <i className="fa fa-trash btn-trash"></i>
                              </button>
                              <button
                                type="button"
                                className="btn border-0"
                                data-toggle="modal"
                                onClick={() => {
                                  handleinputEdit(data);
                                  setModal("edit");
                                }}
                                data-target="#modalInput"
                              >
                                <i className="fa fa-edit btn-edit"></i>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="col-md-12 my-3">
              {dataKelas[0] === 1 ? null : (
                <nav>
                  <ul className="pagination  justify-content-center">
                    {page <= 1 ? null : (
                      <li className="page-item" onClick={prevPage}>
                        <p className="page-link">Previous</p>
                      </li>
                    )}

                    {dataKelas[3].map((page, i) => {
                      return (
                        <li
                          key={i}
                          className={
                            page.page === dataKelas[1]
                              ? "page-item active"
                              : "page-item"
                          }
                          onClick={
                            page.page === dataKelas[1]
                              ? null
                              : () => getPage(page.page)
                          }
                        >
                          <p className="page-link">{page.page}</p>
                        </li>
                      );
                    })}

                    {parseInt(page) < parseInt(dataKelas[0]) ? (
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

      {/* modal input */}
      <Modal
        show={show}
        onHide={() => handleClose()}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {modal === "tambah" ? "Tambah" : "Edit"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="msg text-danger">{msg}</p>
          <form>
            <div className="form-group row">
              <label className="col-sm-3 col-form-label font-weight-bold">
                Kelas
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control shadow-sm border-0"
                  name="kelas"
                  required
                  value={kelas}
                  onChange={(e) => setKelas(e.target.value)}
                  autoFocus
                />
              </div>
            </div>
          </form>
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
    <Redirect to="/home" />
  );
};

export default DataKelas;
