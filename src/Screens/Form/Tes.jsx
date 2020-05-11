import React, { useEffect, useState } from "react";
import "./Tes.css";
import Header from "../../Components/Header";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  getEsay,
  getPg,
  typeTugas,
  jawabEsay,
  jawabPg,
} from "../../redux/actions/tugas";
import { getDetailSiswa } from "../../redux/actions/siswa";
import Loading from "../Loading";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import InputDebounce from "./InputDebounce";

const Tes = (props) => {
  const [tugas, setTugas] = useState(props.match.params.tugas);
  const dispatch = useDispatch();
  const [data, setData] = useState("");
  const [siswa, setSiswa] = useState("");
  const [pg, setPg] = useState([]);
  const [esay, setEsay] = useState([]);

  useEffect(() => {
    const getTypeTugas = async () => {
      await dispatch(typeTugas(tugas)).then((res) => {
        setData(res.value.data.result[0]);
      });
    };

    getTypeTugas();
  }, [dispatch, tugas]);

  useEffect(() => {
    const getData = async () => {
      await dispatch(getPg(tugas)).then((res) => {
        setPg(res.value.data.result);
      });
    };

    getData();
  }, [dispatch, tugas]);

  useEffect(() => {
    const getData = async () => {
      await dispatch(getEsay(tugas)).then((res) => {
        setEsay(res.value.data.result);
      });
    };

    getData();
  }, [dispatch, tugas]);

  useEffect(() => {
    const getData = async () => {
      await dispatch(
        getDetailSiswa(parseJwt(localStorage.getItem("Token")))
      ).then((res) => {
        setSiswa(res.value.data.result[0]);
      });
    };

    getData();
  }, [dispatch, tugas]);

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

  const RenderItem = ({ index, data }) => {
    const [jwb, setJwb] = useState("");
    const siswaJawabPg = async (jawaban, id) => {
      const data = {
        id,
        id_siswa: siswa.id,
        jawaban,
      };
      await dispatch(jawabPg(data)).then((res) => {
        console.log(res.value.data.result);
      });
      setJwb(jawaban);
    };
    return (
      <div className="container-soal">
        <div className="header-soal">
          <div className="nomor-soal">
            <h4>{index}</h4>
          </div>
          <div className="soal-area">
            <p>{data.soal}</p>
          </div>
        </div>
        <div className="abc">
          <div className="jawab">
            <p
              className={jwb === "A" ? "pilih" : null}
              onClick={() => siswaJawabPg("A", data.id)}
            >
              A
            </p>
            <p>{data.A}</p>
          </div>
          <div className="jawab">
            <p
              className={jwb === "B" ? "pilih" : null}
              onClick={() => siswaJawabPg("B", data.id)}
            >
              B
            </p>
            <p>{data.B}</p>
          </div>
          <div className="jawab">
            <p
              className={jwb === "C" ? "pilih" : null}
              onClick={() => siswaJawabPg("C", data.id)}
            >
              C
            </p>
            <p>{data.C}</p>
          </div>
          <div className="jawab">
            <p
              className={jwb === "D" ? "pilih" : null}
              onClick={() => siswaJawabPg("D", data.id)}
            >
              D
            </p>
            <p>{data.D}</p>
          </div>
          <div className="jawab">
            <p
              className={jwb === "E" ? "pilih" : null}
              onClick={() => siswaJawabPg("E", data.id)}
            >
              E
            </p>
            <p>{data.E}</p>
          </div>
        </div>
      </div>
    );
  };

  const onChange = async (e, id) => {
    const data = {
      id: id,
      id_siswa: siswa.id,
      jawaban: e,
    };

    await dispatch(jawabEsay(data)).then((res) => {
      console.log(res.value.data.result);
    });

    // console.log(data);
  };

  const RenderEsay = ({ data, index }) => {
    return (
      <div className="container-soal">
        <div className="header-soal">
          <div className="nomor-soal">
            <h4>{index}</h4>
          </div>
          <div className="soal-area">
            <p>{data.soal}</p>
          </div>
        </div>
        <div className="abc">
          <div className="jawab">
            <InputDebounce input={(q) => onChange(q, data.id)} />
          </div>
        </div>
      </div>
    );
  };

  const Siswa = () => {
    return (
      <div className="siswa-container">
        <div className="detail-container">
          <div className="detail-siswa">
            <p>Nis</p>
            <p>{siswa.nis}</p>
          </div>
          <div className="detail-siswa">
            <p>Nama</p>
            <p>{siswa.nama}</p>
          </div>
        </div>
        <div className="detail-container">
          <div className="detail-siswa">
            <p>Kelas</p>
            <p>{data.nama_kelas}</p>
          </div>
          <div className="detail-siswa">
            <p>Mapel</p>
            <p>{data.nama_mapel}</p>
          </div>
        </div>
      </div>
    );
  };

  const Timer = () => {
    return (
      <>
        <h2 className="timer">Sisa Waktu : {data.batas_waktu}:00</h2>
      </>
    );
  };

  return localStorage.getItem("Token") ? (
    <>
      <div className="wrapper tes">
        <Alert variant="warning" className="mb-3">
          Jangan Refresh Halaman !
        </Alert>
        <div className="card shadow-sm border-0">
          <div className="card-body p-2 header-timer">
            <Siswa />
            <Timer />
          </div>
        </div>
        {data.type !== 0 ? <h3 className="judul">Pilihan Ganda</h3> : null}
        {!pg
          ? null
          : pg.map((data, i) => {
              return <RenderItem key={i} data={data} index={i + 1} />;
            })}
        {data.type !== 1 ? <h3 className="judul">Esay</h3> : null}
        {!esay
          ? null
          : esay.map((data, i) => {
              return <RenderEsay key={i} data={data} index={i + 1} />;
            })}
        <div className="d-flex justify-content-end mt-4">
          <button className="btn btn-primary buton" onClick={null}>
            <i className="fa fa-share fa-1x mr-1"></i>
            Selesai
          </button>
        </div>
      </div>
    </>
  ) : (
    <Redirect to="/auth" />
  );
};

export default Tes;
