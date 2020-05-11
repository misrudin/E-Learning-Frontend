import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import {
  getPageAdmin,
  addAdmin,
  editAdmin,
  deleteAdmin,
} from "../../redux/actions/admin";
import Loading from "../Loading";
import swal from "sweetalert";
import Search from "../Form/Search";

const DataAdmin = (props) => {
  const [dataAdmin, setData] = useState([]);
  const dispatch = useDispatch();
  const [id, setId] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [loading1, setLoading1] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [modal, setModal] = useState("");
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);
  const [key, setKey] = useState("");

  const clear = () => {
    setName("");
    setEmail("");
    setMsg("");
    setPassword("");
    setPassword2("");
  };

  const prevPage = async () => {
    const newPage = page - 1;
    setPage(newPage);

    setLoading2(true);
    await dispatch(getPageAdmin(newPage, key)).then((res) => {
      setData(res.value.data.result);
      setLoading2(false);
    });
  };
  const nextPage = async () => {
    const newPage = page + 1;
    setPage(newPage);

    setLoading2(true);
    await dispatch(getPageAdmin(newPage, key)).then((res) => {
      setData(res.value.data.result);
      setLoading2(false);
    });
  };
  const getPage = async (newPage) => {
    setPage(newPage);

    setLoading2(true);
    await dispatch(getPageAdmin(newPage, key)).then((res) => {
      setData(res.value.data.result);
      setLoading2(false);
    });
  };

  const SearchData = async (q) => {
    setKey(q);
    setPage(1);
    setLoading2(true);
    await dispatch(getPageAdmin(1, q)).then((res) => {
      setData(res.value.data.result);
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

  useEffect(() => {
    document.getElementById("title").innerText = "Data Guru";
  }, []);

  const getData = async () => {
    setLoading2(true);
    await dispatch(getPageAdmin(page, key)).then((res) => {
      setData(res.value.data.result);
      setLoading2(false);
    });
  };

  const handlePost = async () => {
    if ((!name, !email)) {
      setMsg("Semua data harus diisi!");
    } else if (!validName(name)) {
      setMsg("Nama tidak boleh mengandung karakter unik atau angka !");
    } else if (!validEmail(email)) {
      setMsg("Format email salah !");
    } else if (password !== password2) {
      setMsg("Password tidak sama !");
    } else {
      setLoading2(true);
      setShow(false);
      const data = {
        nama: name,
        email,
        password,
      };
      await dispatch(addAdmin(data)).then((res) => {
        setLoading2(false);
        const result = res.value.data.result;
        if (result) {
          getData();
          swal("Berhasil!", "Admin Ditambahkan", "success");
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
        await dispatch(deleteAdmin(id)).then(() => {
          getData();
          setLoading2(false);
          swal("Berhasil!", "Admin Dihapus", "success");
        });
      }
    });
  };

  const handleEdit = () => {
    if ((!name, !email)) {
      setMsg("Semua data harus diisi!");
    } else if (!validName(name)) {
      setMsg("Nama tidak boleh mengandung karakter unik atau angka !");
    } else if (!validEmail(email)) {
      setMsg("Format email salah !");
    } else {
      setShow(false);
      const data = {
        nama: name,
        email,
      };
      swal({
        title: "Yakin ?",
        text: "Edit Data Admin",
        buttons: true,
      }).then(async (willEdit) => {
        if (willEdit) {
          setLoading2(true);
          await dispatch(editAdmin(id, data)).then((res) => {
            setLoading2(false);
            const result = res.value.data.result;
            if (result) {
              getData();
              swal("Berhasil!", "Admin Diedit", "success");
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
    setName(data.nama);
    setEmail(data.email);
  };

  useEffect(() => {
    const getData2 = async () => {
      setLoading1(true);
      await dispatch(getPageAdmin(1, ""))
        .then((res) => {
          setData(res.value.data.result);
          setLoading1(false);
        })
        .catch((err) => console.log(err));
    };
    getData2();
  }, [dispatch]);

  return (
    <>
      <div className="card shadow-sm mb-3 border-0 minimal">
        <div className="card-body p-3">
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
                </div>
                <div className="cari">
                  <Search search={(q) => SearchData(q)} />
                </div>
              </div>

              <div className="card shadow-none border-1">
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table text-center m-0">
                      <thead>
                        <tr>
                          <th scope="col">#</th>

                          <th scope="col">NAMA</th>
                          <th scope="col">EMAIL</th>
                          <th scope="col">ACTION</th>
                        </tr>
                      </thead>
                      <tbody>
                        {!dataAdmin
                          ? console.log("error")
                          : dataAdmin[2].map((data, i) => {
                              return (
                                <tr key={i}>
                                  <td>{i + 1}</td>

                                  <td>{data.nama}</td>
                                  <td className="email">{data.email}</td>
                                  <td>
                                    {data.id === props.id ? null : (
                                      <>
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
                                      </>
                                    )}
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
                {!dataAdmin ? (
                  () => getData()
                ) : dataAdmin[0] === 1 ? null : (
                  <nav>
                    <ul className="pagination  justify-content-center">
                      {page <= 1 ? null : (
                        <li className="page-item" onClick={prevPage}>
                          <p className="page-link">Previous</p>
                        </li>
                      )}

                      {dataAdmin[3].map((page, i) => {
                        return (
                          <li
                            key={i}
                            className={
                              page.page === dataAdmin[1]
                                ? "page-item active"
                                : "page-item"
                            }
                            onClick={
                              page.page === dataAdmin[1]
                                ? null
                                : () => getPage(page.page)
                            }
                          >
                            <p className="page-link">{page.page}</p>
                          </li>
                        );
                      })}

                      {parseInt(page) < parseInt(dataAdmin[0]) ? (
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
              <div className={name ? "input-div one focus" : "input-div one"}>
                <div className="i">
                  <i className="fas fa-user"></i>
                </div>
                <div className="div">
                  <h5>Nama</h5>
                  <input
                    type="text"
                    className="input"
                    name="nama"
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {modal === "tambah" ? (
                <>
                  <div
                    className={
                      password ? "input-div one focus" : "input-div one"
                    }
                  >
                    <div className="i">
                      <i className="fas fa-user"></i>
                    </div>
                    <div className="div">
                      <h5>Password</h5>
                      <input
                        type="password"
                        className="input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div
                    className={
                      password2 ? "input-div one focus" : "input-div one"
                    }
                  >
                    <div className="i">
                      <i className="fas fa-user"></i>
                    </div>
                    <div className="div">
                      <h5>Repeat Password</h5>
                      <input
                        type="password"
                        className="input"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                      />
                    </div>
                  </div>
                </>
              ) : null}
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
  );
};

export default DataAdmin;
