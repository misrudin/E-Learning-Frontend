import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import {
  getKelas,
  addKelas,
  editKelas,
  deleteKelas,
} from "../../redux/actions/kelas";
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

  const clear = () => {
    setKelas("");
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
    setLoading1(true);
    await dispatch(getKelas()).then(() => {
      setLoading1(false);
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
    alert(data.id);
    setKelas(data.nama_kelas);
  };

  useEffect(() => {
    getData();
  }, []);

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
            <button
              className="btn btn-primary mb-3 px-4 buton"
              onClick={() => {
                setModal("tambah");
                setShow(true);
              }}
            >
              Tambah Data Kelas
            </button>

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
                      {dataKelas.map((data, i) => {
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
                  name="nip"
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
