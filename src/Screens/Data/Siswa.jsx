import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import {
  getPageSiswa,
  addSiswa,
  editSiswa,
  deleteSiswa,
} from "../../redux/actions/siswa";
import { getKelas } from "../../redux/actions/kelas";
import Loading from "../Loading";
import swal from "sweetalert";

const DataSiswa = (props) => {
  const { dataSiswa, errMsg } = useSelector((state) => state.siswa);
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [nis, setNis] = useState("");
  const [id_kelas, setKelas] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [modal, setModal] = useState("");
  const [msg, setMsg] = useState(errMsg);
  const [show, setShow] = useState(false);
  const [dataKelas, setDataKelas] = useState([]);
  const [page, setPage] = useState(1);
  const [key, setKey] = useState("");

  const clear = () => {
    setNis("");
    setName("");
    setEmail("");
    setKelas("");
    setMsg("");
  };

  const prevPage = async () => {
    const newPage = page - 1;
    setPage(newPage);

    setLoading2(true);
    await dispatch(getPageSiswa(newPage, key)).then(() => {
      setLoading2(false);
    });
  };
  const nextPage = async () => {
    const newPage = page + 1;
    setPage(newPage);

    setLoading2(true);
    await dispatch(getPageSiswa(newPage, key)).then(() => {
      setLoading2(false);
    });
  };
  const getPage = async (newPage) => {
    setPage(newPage);

    setLoading2(true);
    await dispatch(getPageSiswa(newPage, key)).then(() => {
      setLoading2(false);
    });
  };

  const getKey = async (e) => {
    if (e) {
      if (e.key === "Enter") {
        setPage(1);
        setLoading2(true);
        await dispatch(getPageSiswa(1, key)).then(() => {
          setLoading2(false);
        });
      }
    } else {
      setPage(1);
      setLoading2(true);
      await dispatch(getPageSiswa(1, "")).then(() => {
        setLoading2(false);
      });
    }
  };

  const handleClose = () => {
    clear();
    setShow(false);
  };

  const validName = (data) => {
    // eslint-disable-next-line
    let Regex = /^[a-zA-Z][a-zA-Z ]*$/;
    return Regex.test(data);
  };

  const validEmail = (data) => {
    // eslint-disable-next-line
    let Regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
    return Regex.test(data);
  };

  const validNip = (data) => {
    // eslint-disable-next-line
    let Regex = /^[0-9\d]{4,}$/;
    return Regex.test(data);
  };

  useEffect(() => {
    document.getElementById("title").innerText = "Data Guru";
  }, []);

  const getData = async () => {
    setLoading2(true);
    await dispatch(getPageSiswa(page, key)).then(() => {
      setLoading2(false);
    });
  };

  const handlePost = async () => {
    if ((!name, !nis, !id_kelas, !email)) {
      setMsg("Semua data harus diisi!");
    } else if (!validNip(nis)) {
      setMsg("Nis terdiri dari angka dan minimal 4 karakter !");
    } else if (!validName(name)) {
      setMsg("Nama tidak boleh mengandung karakter unik atau angka !");
    } else if (!validEmail(email)) {
      setMsg("Format email salah !");
    } else {
      setLoading2(true);
      setShow(false);
      const data = {
        nis,
        nama: name,
        id_kelas,
        email,
        password: nis,
      };
      await dispatch(addSiswa(data)).then((res) => {
        setLoading2(false);
        const result = res.value.data.result;
        if (result) {
          getData();
          swal("Berhasil!", "Data Siswa Ditambahkan", "success");
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
        await dispatch(deleteSiswa(id)).then(() => {
          getData();
          setLoading2(false);
          swal("Berhasil!", "Data Siswa Dihapus", "success");
        });
      }
    });
  };

  const handleEdit = () => {
    if ((!name, !nis, !id_kelas, !email)) {
      setMsg("Semua data harus diisi!");
    } else if (!validNip(nis)) {
      setMsg("Nis terdiri dari angka dan minimal 4 karakter !");
    } else if (!validName(name)) {
      setMsg("Nama tidak boleh mengandung karakter unik atau angka !");
    } else if (!validEmail(email)) {
      setMsg("Format email salah !");
    } else {
      setShow(false);
      const data = {
        nis,
        nama: name,
        id_kelas,
        email,
        password: password,
      };
      swal({
        title: "Yakin ?",
        text: "Edit Data Siswa",
        buttons: true,
      }).then(async (willEdit) => {
        if (willEdit) {
          setLoading2(true);
          await dispatch(editSiswa(id, data)).then((res) => {
            setLoading2(false);
            const result = res.value.data.result;
            if (result) {
              getData();
              swal("Berhasil!", "Data Siswa Diedit", "success");
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
    setNis(data.nis);
    setKelas(data.id_kelas);
    setName(data.nama);
    setEmail(data.email);
    setPassword(data.password);
  };

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
      await dispatch(getPageSiswa(1, "")).then(() => {
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
      <Header page="siswa" logout={logout} />
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
                Tambah Data Siswa
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
                        <th scope="col">NIS</th>
                        <th scope="col">NAMA</th>
                        <th scope="col">EMAIL</th>
                        <th scope="col">ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataSiswa[2].map((data, i) => {
                        return (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{data.nis}</td>
                            <td>{data.nama}</td>
                            <td className="email">{data.email}</td>
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
              {dataSiswa[0] === 1 ? null : (
                <nav>
                  <ul className="pagination  justify-content-center">
                    {page <= 1 ? null : (
                      <li className="page-item" onClick={prevPage}>
                        <p className="page-link">Previous</p>
                      </li>
                    )}

                    {dataSiswa[3].map((page, i) => {
                      return (
                        <li
                          key={i}
                          className={
                            page.page === dataSiswa[1]
                              ? "page-item active"
                              : "page-item"
                          }
                          onClick={
                            page.page === dataSiswa[1]
                              ? null
                              : () => getPage(page.page)
                          }
                        >
                          <p className="page-link">{page.page}</p>
                        </li>
                      );
                    })}

                    {parseInt(page) < parseInt(dataSiswa[0]) ? (
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
                NIS
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control shadow-sm border-0"
                  name="nis"
                  required
                  value={nis}
                  onChange={(e) => setNis(e.target.value)}
                  autoFocus
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-3 col-form-label font-weight-bold">
                Nama
              </label>
              <div className="col-sm-9">
                <input
                  type="text"
                  className="form-control shadow-sm border-0"
                  name="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="form-group row">
              <label className="col-sm-3 col-form-label font-weight-bold">
                Kelas
              </label>
              <div className="col-sm-9">
                <select
                  className="custom-select shadow-sm border-0"
                  name="kelas"
                  id="kelas"
                  required
                  value={id_kelas}
                  onChange={(e) => setKelas(e.target.value)}
                >
                  <option value="">Choose...</option>
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

            <div className="form-group row">
              <label className="col-sm-3 col-form-label font-weight-bold">
                Email
              </label>
              <div className="col-sm-9">
                <input
                  type="email"
                  className="form-control shadow-sm border-0"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
            Batal
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

export default DataSiswa;
