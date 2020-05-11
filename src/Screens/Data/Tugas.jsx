import React, { useEffect, useState } from "react";
import "./Tugas.css";
import Header from "../../Components/Header";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  getTugas,
  addTugas,
  editTugas,
  deleteTugas,
} from "../../redux/actions/tugas";
import Loading from "../Loading";
import { Link } from "react-router-dom";
import Search from "../Form/Search";
import { Modal } from "react-bootstrap";
import { getKelas } from "../../redux/actions/kelas";
import { getMapel } from "../../redux/actions/mapel";
import swal from "sweetalert";

const Tugas = (props) => {
  const dispatch = useDispatch();
  const [dataTugas, setDataTugas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [modal, setModal] = useState("tambah");
  const [msg, setMsg] = useState("");
  const [id, setId] = useState("");
  const [dataKelas, setKelas] = useState([]);
  const [dataMapel, setMapel] = useState([]);
  const [id_kelas, setIdKelas] = useState("");
  const [id_mapel, setIdMapel] = useState("");
  const [id_guru, setIdGuru] = useState("1");
  const [type, setType] = useState("");
  const [batas_waktu, setWaktu] = useState("");
  const rule = localStorage.getItem("Rule");

  const clear = () => {
    setIdKelas("");
    setIdMapel("");
    setType("");
    setWaktu("");
  };

  const handleClose = () => {
    clear();
    setShow(false);
  };

  useEffect(() => {
    const getData2 = async () => {
      setLoading(true);
      await dispatch(getKelas()).then(async (res) => {
        setKelas(res.value.data.result);
        await dispatch(getMapel()).then((res) => {
          setMapel(res.value.data.result);
          setLoading(false);
        });
      });
    };
    getData2();
  }, [dispatch]);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      await dispatch(getTugas("publish")).then((res) => {
        setDataTugas(res.value.data.result);
        setLoading(false);
      });
    };

    getData();
  }, [dispatch]);

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
    return decoded;
  };

  useEffect(() => {
    setIdGuru(parseJwt(localStorage.getItem("Token")).id);
  }, []);

  useEffect(() => {
    document.getElementById("title").innerText = "Tugas";
  }, []);

  const logout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("Rule");
    props.history.push("/");
  };

  const validTime = (data) => {
    // eslint-disable-next-line
    let Regex = /^[0-9\d]{1,}$/;
    return Regex.test(data);
  };

  const handlePost = async () => {
    if ((!id_kelas, !id_mapel, !type, !batas_waktu)) {
      setMsg("Semua data harus diisi!");
    } else if (!validTime(batas_waktu)) {
      setMsg("Input batas waktu dengan benar !");
    } else {
      const data = {
        id_kelas,
        id_mapel,
        id_guru,
        type,
        batas_waktu,
        status: "draft",
      };
      setLoading(true);
      await dispatch(addTugas(data)).then((res) => {
        setLoading(false);
        const tugas = res.value.data.result.id;
        props.history.push(`/addtugas/${tugas}`);
      });
    }
  };

  const getDataTugas = async () => {
    setLoading(true);
    await dispatch(getTugas("publish")).then((res) => {
      setDataTugas(res.value.data.result);
      setLoading(false);
    });
  };

  const EditTugas = async () => {
    if ((!id_kelas, !id_mapel, !type, !batas_waktu)) {
      setMsg("Semua data harus diisi!");
    } else if (!validTime(batas_waktu)) {
      setMsg("Input batas waktu dengan benar !");
    } else {
      const data = {
        id_kelas,
        id_mapel,
        id_guru,
        type,
        batas_waktu,
        status: "publish",
      };
      setLoading(true);
      await dispatch(editTugas(id, data)).then((res) => {
        setLoading(false);
        getDataTugas();
        handleClose();
      });
    }
  };

  const handleInputEdit = (data) => {
    setShow(true);
    setIdKelas(data.id_kelas);
    setIdMapel(data.id_mapel);
    setType(data.type);
    setWaktu(data.batas_waktu);
    setId(data.id);
    console.log(data);
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
        await dispatch(deleteTugas(id)).then(() => {
          setLoading(false);
          swal("Berhasil!", "Tugas Dihapus", "success");
          getDataTugas();
        });
      }
    });
  };

  const RenderItem = ({ index, data }) => {
    return (
      <div className="tugas">
        <div className="nomor">{/* <h3>{index}</h3> */}</div>
        <div className="tugas-body">
          <div className="tugas-title">
            <h3 className="text-uppercase">
              {data.nama_mapel} - {data.nama_kelas}
            </h3>
          </div>
          <div className="tugas-content">
            <p className="text-capitalize">Guru : {data.nama_guru}</p>
            <p>
              Batas Waktu :{" "}
              <span className="bold">{data.batas_waktu} Menit</span>
            </p>
            <p className="bg-warning p-1 d-inline text-white">
              {data.type === 0
                ? "Esay"
                : data.type === 1
                ? "Pilihan Ganda"
                : "Esay & Pilihan Ganda"}
            </p>
          </div>
          <div className="tugas-footer">
            <button
              className="btn btn-primary buton-a"
              onClick={() => {
                handleInputEdit(data);
                setModal("edit");
              }}
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
            <Link className="link" to={`/tes/${data.id}`}>
              <button
                className="btn btn-primary buton-a"
                onClick={() => {
                  // document.getElementById("root").requestFullscreen();
                }}
              >
                <i className="fa fa-hourglass-start fa-1x mr-1"></i>
                Mulai Tes
              </button>
            </Link>
            <Link
              className="link"
              to={
                rule === "siswa"
                  ? `/hasil-tes/${data.id}`
                  : `/status/${data.id}`
              }
            >
              <button className="btn btn-primary buton-a">
                <i className="fa fa-history fa-1x mr-1"></i>
                Lihat Hasil
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return localStorage.getItem("Token") ? (
    <>
      {loading ? <Loading /> : null}
      <Header page="tugas" logout={logout} />
      <div className="wrapper">
        <div className="buton-area d-flex">
          <button
            className="btn btn-primary px-3 mr-2 buton"
            onClick={() => {
              setShow(true);
              setModal("tambah");
            }}
          >
            <i className="fa fa-plus fa-1x mr-1"></i>
            Tambah
          </button>
          <Search search={(q) => console.log(q)} />
        </div>
        <div className="container-tugas">
          {!dataTugas
            ? null
            : dataTugas.map((data, index) => {
                return <RenderItem key={index} data={data} index={index + 1} />;
              })}
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
                  type !== "" ? "input-div one focus" : "input-div one"
                }
              >
                <div className="i">
                  <i className="fas fa-user"></i>
                </div>
                <div className="div">
                  <h5>Label</h5>
                  <select
                    className="input-select"
                    name="kelas"
                    id="kelas"
                    required
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value=""></option>
                    <option value="0">Esay</option>
                    <option value="1">Pilihan Ganda</option>
                    <option value="2">Esay & Pilihan Ganda</option>
                  </select>
                </div>
              </div>
              <div
                className={
                  batas_waktu ? "input-div one focus" : "input-div one"
                }
              >
                <div className="i">
                  <i className="fas fa-lock"></i>
                </div>
                <div className="div">
                  <h5>Batas Waktu (menit)</h5>
                  <input
                    type="text"
                    className="input-area"
                    value={batas_waktu}
                    onChange={(e) => setWaktu(e.target.value)}
                    maxLength={50}
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
            onClick={modal === "tambah" ? handlePost : EditTugas}
          >
            Simpan
          </button>
          {modal !== "edit" ? null : (
            <button
              className="btn btn-primary font-weight-bold px-4 buton"
              onClick={() => {
                EditTugas();
                props.history.push(`/addtugas/${id}`);
              }}
            >
              Edit Isi
            </button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  ) : (
    <Redirect to="/auth" />
  );
};

export default Tugas;
