import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import {
  getPageGuru,
  addGuru,
  editGuru,
  deleteGuru,
} from "../../redux/actions/guru";
import Loading from "../Loading";
import swal from "sweetalert";
import Search from "../Form/Search";

const DataGuru = (props) => {
  const { dataGuru, errMsg } = useSelector((state) => state.guru);
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [nip, setNip] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [modal, setModal] = useState("");
  const [msg, setMsg] = useState(errMsg);
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);
  const [key, setKey] = useState("");

  const clear = () => {
    setNip("");
    setName("");
    setEmail("");
    setMsg("");
  };

  const prevPage = async () => {
    const newPage = page - 1;
    setPage(newPage);

    setLoading2(true);
    await dispatch(getPageGuru(newPage, key)).then(() => {
      setLoading2(false);
    });
  };
  const nextPage = async () => {
    const newPage = page + 1;
    setPage(newPage);

    setLoading2(true);
    await dispatch(getPageGuru(newPage, key)).then(() => {
      setLoading2(false);
    });
  };
  const getPage = async (newPage) => {
    setPage(newPage);

    setLoading2(true);
    await dispatch(getPageGuru(newPage, key)).then(() => {
      setLoading2(false);
    });
  };

  const SearchData = async (q) => {
    setKey(q);
    setPage(1);
    setLoading2(true);
    await dispatch(getPageGuru(1, q)).then(() => {
      setLoading2(false);
    });
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
    await dispatch(getPageGuru(page, key)).then(() => {
      setLoading2(false);
    });
  };

  const handlePost = async () => {
    if ((!name, !nip, !email)) {
      setMsg("Semua data harus diisi!");
    } else if (!validNip(nip)) {
      setMsg("Nip terdiri dari angka dan minimal 4 karakter !");
    } else if (!validName(name)) {
      setMsg("Nama tidak boleh mengandung karakter unik atau angka !");
    } else if (!validEmail(email)) {
      setMsg("Format email salah !");
    } else {
      setLoading2(true);
      setShow(false);
      const data = {
        nip,
        nama_guru: name,
        email,
        password: nip,
      };
      await dispatch(addGuru(data)).then((res) => {
        setLoading2(false);
        const result = res.value.data.result;
        // eslint-disable-next-line
        if (result.status == 1) {
          getData();
          swal("Berhasil!", "Data Guru Ditambahkan", "success");
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
        await dispatch(deleteGuru(id)).then(() => {
          getData();
          setLoading2(false);
          swal("Berhasil!", "Data Guru Dihapus", "success");
        });
      }
    });
  };

  const handleEdit = () => {
    if ((!name, !nip, !email)) {
      setMsg("Semua data harus diisi!");
    } else if (!validNip(nip)) {
      setMsg("Nip terdiri dari angka dan minimal 4 karakter !");
    } else if (!validName(name)) {
      setMsg("Nama tidak boleh mengandung karakter unik atau angka !");
    } else if (!validEmail(email)) {
      setMsg("Format email salah !");
    } else {
      setShow(false);
      const data = {
        nip,
        nama_guru: name,
        email,
        password: password,
      };
      swal({
        title: "Yakin ?",
        text: "Edit Data Guru",
        buttons: true,
      }).then(async (willEdit) => {
        if (willEdit) {
          setLoading2(true);
          await dispatch(editGuru(id, data)).then((res) => {
            setLoading2(false);
            const result = res.value.data.result;
            if (result) {
              getData();
              swal("Berhasil!", "Data Guru Diedit", "success");
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
    setNip(data.nip);
    setName(data.nama_guru);
    setEmail(data.email);
    setPassword(data.password);
  };

  useEffect(() => {
    const getData2 = async () => {
      setLoading1(true);
      await dispatch(getPageGuru(1, "")).then(() => {
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
  ) : localStorage.getItem("Rule") === "admin" ? (
    <>
      <Header page="guru" logout={logout} />
      <div className="wrapper">
        {loading2 ? <Loading /> : null}
        {loading1 ? (
          <Loading />
        ) : (
          <>
            <div className="head">
              <div className="flex">
                <button
                  className="btn btn-primary px-3 buton m-1"
                  onClick={() => {
                    setModal("tambah");
                    setShow(true);
                  }}
                >
                  <i className="fa fa-plus fa-1x"></i> Tambah
                </button>
                <button
                  className="btn btn-primary px-4 buton m-1"
                  onClick={() => {
                    props.history.push("/ig");
                  }}
                >
                  <i className="fa fa-download fa-1x"></i> Import
                </button>
              </div>
              <div className="cari">
                <Search search={(q) => SearchData(q)} />
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
                        <th scope="col">ACTION</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dataGuru[2].map((data, i) => {
                        return (
                          <tr key={i}>
                            <td>{i + 1}</td>
                            <td>{data.nip}</td>
                            <td>{data.nama_guru}</td>
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
              {dataGuru[0] === 1 ? null : (
                <nav>
                  <ul className="pagination  justify-content-center">
                    {page <= 1 ? null : (
                      <li className="page-item" onClick={prevPage}>
                        <p className="page-link">Previous</p>
                      </li>
                    )}

                    {dataGuru[3].map((page, i) => {
                      return (
                        <li
                          key={i}
                          className={
                            page.page === dataGuru[1]
                              ? "page-item active"
                              : "page-item"
                          }
                          onClick={
                            page.page === dataGuru[1]
                              ? null
                              : () => getPage(page.page)
                          }
                        >
                          <p className="page-link">{page.page}</p>
                        </li>
                      );
                    })}

                    {parseInt(page) < parseInt(dataGuru[0]) ? (
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
          <div className="sekolah-content">
            <div className="form-input">
              <p className="text-danger">{msg}</p>
              <div className={nip ? "input-div one focus" : "input-div one"}>
                <div className="i">
                  <i className="fas fa-user"></i>
                </div>
                <div className="div">
                  <h5>NIP</h5>
                  <input
                    type="text"
                    className="input"
                    name="nip"
                    value={nip}
                    onChange={(e) => setNip(e.target.value)}
                    autoFocus
                  />
                </div>
              </div>

              <div className={name ? "input-div one focus" : "input-div one"}>
                <div className="i">
                  <i className="fas fa-user"></i>
                </div>
                <div className="div">
                  <h5>Nama</h5>
                  <input
                    type="text"
                    className="input"
                    name="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              <div className={email ? "input-div one focus" : "input-div one"}>
                <div className="i">
                  <i className="fas fa-user"></i>
                </div>
                <div className="div">
                  <h5>Email</h5>
                  <input
                    type="email"
                    className="input"
                    name="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
    <Redirect to="/home" />
  );
};

export default DataGuru;
