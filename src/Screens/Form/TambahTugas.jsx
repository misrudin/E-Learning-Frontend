import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import Loading from "../Loading";
import swal from "sweetalert";
import Search from "../Form/Search";
import {
  getEsay,
  getPg,
  addEsay,
  addPg,
  editEsay,
  editPg,
  deleteEsay,
  deletePg,
  editTugas,
  typeTugas,
} from "../../redux/actions/tugas";

const TambahTugas = (props) => {
  const [dataEsay, setEsay] = useState([]);
  const [dataPg, setPg] = useState([]);
  const dispatch = useDispatch();
  const [modal, setModal] = useState("");
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  // input
  const [soal, setSoal] = useState("");
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [c, setC] = useState("");
  const [d, setD] = useState("");
  const [e, setE] = useState("");
  const [benar, setBenar] = useState("");
  const [id, setId] = useState("");

  // tugas
  const [tugas, setTugas] = useState(props.match.params.tugas);
  const [type, setType] = useState("");

  const clear = () => {
    setSoal("");
    setB("");
    setC("");
    setD("");
    setE("");
    setA("");
    setBenar("");
  };

  const handleClose = () => {
    clear();
    setShow(false);
  };

  useEffect(() => {
    document.getElementById("title").innerText = "Tambah Tugas";
  }, []);

  useEffect(() => {
    const getTypeTugas = async () => {
      await dispatch(typeTugas(tugas)).then((res) => {
        setType(res.value.data.result[0].type);
      });
    };

    getTypeTugas();
  }, [dispatch, tugas]);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      await dispatch(getEsay(tugas)).then(async (res) => {
        setEsay(res.value.data.result);
        await dispatch(getPg(tugas)).then((res) => {
          setPg(res.value.data.result);
          setLoading(false);
        });
      });
    };

    getData();
  }, [dispatch, tugas]);

  const getDataEsay = async () => {
    setLoading2(true);
    await dispatch(getEsay(tugas)).then(async (res) => {
      setEsay(res.value.data.result);
      setLoading2(false);
    });
  };
  const getDataPg = async () => {
    setLoading2(true);
    await dispatch(getPg(tugas)).then(async (res) => {
      setPg(res.value.data.result);
      setLoading2(false);
    });
  };

  const postEsay = async () => {
    const data = {
      id_tugas: tugas,
      soal,
    };
    if (!soal) {
      setMsg("Soal harus di isi !");
    } else {
      setLoading2(true);
      setShow(false);
      await dispatch(addEsay(data)).then(() => {
        setLoading2(false);
        handleClose();
        getDataEsay();
      });
    }
  };
  const EditEsay = async () => {
    const data = {
      id_tugas: tugas,
      soal,
    };
    if (!soal) {
      setMsg("Soal harus di isi !");
    } else {
      setLoading2(true);
      setShow(false);
      await dispatch(editEsay(id, data)).then(() => {
        setLoading2(false);
        handleClose();
        getDataEsay();
      });
    }
  };
  const postPg = async () => {
    const data = {
      id_tugas: tugas,
      soal,
      A: a,
      B: b,
      C: c,
      D: d,
      E: e,
      benar,
    };
    if ((!soal, !a, !b, !c, !d, !e, !benar)) {
      setMsg("Lengkapi semua Data !");
    } else {
      setLoading2(true);
      setShow(false);
      await dispatch(addPg(data)).then(() => {
        setLoading2(false);
        handleClose();
        getDataPg();
      });
    }
  };
  const EditPg = async () => {
    const data = {
      id_tugas: tugas,
      soal,
      A: a,
      B: b,
      C: c,
      D: d,
      E: e,
      benar,
    };
    if ((!soal, !a, !b, !c, !d, !e, !benar)) {
      setMsg("Lengkapi semua Data !");
    } else {
      setLoading2(true);
      setShow(false);
      await dispatch(editPg(id, data)).then(() => {
        setLoading2(false);
        handleClose();
        getDataPg();
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("Rule");
    props.history.push("/");
  };

  const handleinputEdit = (data) => {
    setSoal(data.soal);
    setId(data.id);
    setShow(true);
  };
  const handleinputPg = (data) => {
    setSoal(data.soal);
    setId(data.id);
    setA(data.A);
    setB(data.B);
    setC(data.C);
    setD(data.D);
    setE(data.E);
    setBenar(data.benar);
    setShow(true);
  };

  const hapusEsay = async (id) => {
    swal({
      title: "Hapus Esay ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        setLoading2(true);
        await dispatch(deleteEsay(id)).then(() => {
          getDataEsay();
          setLoading2(false);
        });
      }
    });
  };
  const hapusPg = async (id) => {
    swal({
      title: "Hapus Pg ?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (willDelete) => {
      if (willDelete) {
        setLoading2(true);
        await dispatch(deletePg(id)).then(() => {
          getDataPg();
          setLoading2(false);
        });
      }
    });
  };

  const publish = async () => {
    const data = {
      status: "publish",
    };
    setLoading2(true);
    await dispatch(editTugas(tugas, data)).then(() => {
      setLoading2(false);
      props.history.push("/tugas");
    });
  };

  return !localStorage.getItem("Token") ? (
    <Redirect to="/auth" />
  ) : localStorage.getItem("Rule") === "guru" ? (
    <>
      <Header page="tugas" logout={logout} />
      <div className="wrapper">
        {loading2 ? <Loading /> : null}
        {loading ? null : (
          <>
            {type === "" ? null : type !== 1 ? (
              <>
                <div className="head">
                  <div className="flex">
                    <button
                      className="btn btn-primary px-3 buton m-1"
                      onClick={() => {
                        setModal("tambah-esay");
                        setShow(true);
                      }}
                    >
                      <i className="fa fa-plus fa-1x mr-1"></i>Tambah
                    </button>
                    <button
                      className="btn btn-primary px-3 buton m-1"
                      onClick={() => {
                        setModal("tambah-esay");
                        setShow(true);
                      }}
                    >
                      <i className="fa fa-download fa-1x mr-1"></i>Import
                    </button>
                  </div>
                  <div className="cari">
                    <Search />
                  </div>
                </div>

                <div className="card shadow">
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table text-justify m-0">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">SOAL</th>
                            <th scope="col">ACTION</th>
                          </tr>
                        </thead>
                        <tbody>
                          {!dataEsay
                            ? null
                            : dataEsay.map((data, i) => {
                                return (
                                  <tr key={i}>
                                    <td className="td-soal">{i + 1}</td>
                                    <td className="td-soal">{data.soal}</td>
                                    <td className="action">
                                      <button
                                        type="button"
                                        className="btn border-0 p-0 mx-2"
                                        onClick={() => hapusEsay(data.id)}
                                      >
                                        <i className="fa fa-trash btn-trash fa-1x"></i>
                                      </button>
                                      <button
                                        type="button"
                                        className="btn border-0 p-0 mx-2"
                                        data-toggle="modal"
                                        onClick={() => {
                                          handleinputEdit(data);
                                          setModal("edit-esay");
                                        }}
                                        data-target="#modalInput"
                                      >
                                        <i className="fa fa-edit btn-edit fa-1x"></i>
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
            ) : null}

            {type === "" ? null : type !== 0 ? (
              <>
                <div className="head">
                  <div className="flex">
                    <button
                      className="btn btn-primary px-3 buton m-1"
                      onClick={() => {
                        setModal("tambah-pg");
                        setShow(true);
                      }}
                    >
                      <i className="fa fa-plus fa-1x mr-1"></i>Tambah
                    </button>
                    <button
                      className="btn btn-primary px-3 buton m-1"
                      onClick={() => {
                        setModal("tambah-pg");
                        setShow(true);
                      }}
                    >
                      <i className="fa fa-download fa-1x mr-1"></i>Import
                    </button>
                  </div>
                  <div className="cari">
                    <Search />
                  </div>
                </div>

                <div className="card shadow">
                  <div className="card-body p-0">
                    <div className="table-responsive">
                      <table className="table text-justify m-0">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">SOAL</th>
                            <th scope="col">A</th>
                            <th scope="col">B</th>
                            <th scope="col">C</th>
                            <th scope="col">D</th>
                            <th scope="col">E</th>
                            <th scope="col">
                              <i className="fa fa-key fa-1x"></i>
                            </th>
                            <th scope="col">ACTION</th>
                          </tr>
                        </thead>
                        <tbody>
                          {!dataPg
                            ? null
                            : dataPg.map((data, i) => {
                                return (
                                  <tr key={i}>
                                    <td className="td-soal">{i + 1}</td>
                                    <td className="td-soal-pg">{data.soal}</td>
                                    <td className="td-soal-a">{data.A}</td>
                                    <td className="td-soal-a">{data.B}</td>
                                    <td className="td-soal-a">{data.C}</td>
                                    <td className="td-soal-a">{data.D}</td>
                                    <td className="td-soal-a">{data.E}</td>
                                    <td className="td-soal-a">{data.benar}</td>
                                    <td className="action">
                                      <button
                                        type="button"
                                        className="btn border-0 p-0 mx-2"
                                        onClick={() => hapusPg(data.id)}
                                      >
                                        <i className="fa fa-trash btn-trash fa-1x"></i>
                                      </button>
                                      <button
                                        type="button"
                                        className="btn border-0 p-0 mx-2"
                                        data-toggle="modal"
                                        onClick={() => {
                                          handleinputPg(data);
                                          setModal("edit-pg");
                                        }}
                                        data-target="#modalInput"
                                      >
                                        <i className="fa fa-edit btn-edit fa-1x"></i>
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
            ) : null}

            <div className="d-flex justify-content-end mt-4">
              <button
                className="btn btn-primary buton-sec mr-2"
                onClick={() => props.history.push("/tugas")}
              >
                <i className="fa fa-reply fa-1x mr-1"></i>
                Batal
              </button>
              <button className="btn btn-primary buton" onClick={publish}>
                <i className="fa fa-share fa-1x mr-1"></i>
                Publish
              </button>
            </div>
          </>
        )}
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
            {modal === "tambah-esay"
              ? "Tambah Esay"
              : modal === "tambah-pg"
              ? "Tambah PG"
              : modal === "edit-esay"
              ? "Edit Esay"
              : "Edit PG"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="sekolah-content">
            <div className="form-input">
              <p className="text-danger">{msg}</p>

              {modal === "tambah-esay" || modal === "edit-esay" ? (
                <div className={soal ? "input-div one focus" : "input-div one"}>
                  <div className="i">
                    <i className="fas fa-user"></i>
                  </div>
                  <div className="div">
                    <h5>Soal</h5>
                    <input
                      type="text"
                      className="input"
                      name="esay"
                      required
                      value={soal}
                      onChange={(e) => setSoal(e.target.value)}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div
                    className={soal ? "input-div one focus" : "input-div one"}
                  >
                    <div className="i">
                      <i className="fas fa-user"></i>
                    </div>
                    <div className="div">
                      <h5>Soal</h5>
                      <input
                        type="text"
                        className="input"
                        name="esay"
                        required
                        value={soal}
                        onChange={(e) => setSoal(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className={a ? "input-div one focus" : "input-div one"}>
                    <div className="i">
                      <i className="fas fa-user"></i>
                    </div>
                    <div className="div">
                      <h5>A</h5>
                      <input
                        type="text"
                        className="input"
                        name="esay"
                        required
                        value={a}
                        onChange={(e) => setA(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className={b ? "input-div one focus" : "input-div one"}>
                    <div className="i">
                      <i className="fas fa-user"></i>
                    </div>
                    <div className="div">
                      <h5>B</h5>
                      <input
                        type="text"
                        className="input"
                        name="esay"
                        required
                        value={b}
                        onChange={(e) => setB(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className={c ? "input-div one focus" : "input-div one"}>
                    <div className="i">
                      <i className="fas fa-user"></i>
                    </div>
                    <div className="div">
                      <h5>C</h5>
                      <input
                        type="text"
                        className="input"
                        name="esay"
                        required
                        value={c}
                        onChange={(e) => setC(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className={d ? "input-div one focus" : "input-div one"}>
                    <div className="i">
                      <i className="fas fa-user"></i>
                    </div>
                    <div className="div">
                      <h5>D</h5>
                      <input
                        type="text"
                        className="input"
                        name="esay"
                        required
                        value={d}
                        onChange={(e) => setD(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className={e ? "input-div one focus" : "input-div one"}>
                    <div className="i">
                      <i className="fas fa-user"></i>
                    </div>
                    <div className="div">
                      <h5>E</h5>
                      <input
                        type="text"
                        className="input"
                        name="esay"
                        required
                        value={e}
                        onChange={(e) => setE(e.target.value)}
                      />
                    </div>
                  </div>
                  <div
                    className={benar ? "input-div one focus" : "input-div one"}
                  >
                    <div className="i">
                      <i className="fas fa-user"></i>
                    </div>
                    <div className="div">
                      <h5>Kunci Jawaban</h5>
                      <select
                        className="input-select"
                        name="kelas"
                        id="kelas"
                        required
                        value={benar}
                        onChange={(e) => setBenar(e.target.value)}
                      >
                        <option value=""></option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="E">E</option>
                      </select>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-secondary font-weight-bold px-3 mr-2 buton-sec"
            onClick={handleClose}
          >
            <i className="fa fa-reply fa-1x mr-1"></i>
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary font-weight-bold px-4 buton"
            onClick={
              modal === "tambah-esay"
                ? postEsay
                : modal === "tambah-pg"
                ? postPg
                : modal === "edit-esay"
                ? EditEsay
                : EditPg
            }
          >
            <i className="fa fa-save fa-1x mr-1"></i>
            Simpan
          </button>
        </Modal.Footer>
      </Modal>
    </>
  ) : (
    <Redirect to="/home" />
  );
};

export default TambahTugas;
