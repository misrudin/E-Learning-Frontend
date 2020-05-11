import React, { useEffect, useState } from "react";
import "../Form/Tes.css";
import Header from "../../Components/Header";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getEsayJawab, getPgJawab, typeTugas } from "../../redux/actions/tugas";
import { getDetailSiswa } from "../../redux/actions/siswa";
import Loading from "../Loading";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import InputDebounce from "../Form/InputDebounce";

const HasilTes = (props) => {
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
      await dispatch(
        getPgJawab(tugas, parseJwt(localStorage.getItem("Token")))
      ).then((res) => {
        setPg(res.value.data.result);
      });
    };

    getData();
  }, [dispatch, tugas]);

  useEffect(() => {
    const getData = async () => {
      await dispatch(
        getEsayJawab(tugas, parseJwt(localStorage.getItem("Token")))
      ).then((res) => {
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
          <div className="jawab no-hover">
            <p className={data.benar === "A" ? "pilih" : null}>A</p>
            <p>{data.A}</p>
          </div>
          <div className="jawab no-hover">
            <p className={data.benar === "B" ? "pilih" : null}>B</p>
            <p>{data.B}</p>
          </div>
          <div className="jawab no-hover">
            <p className={data.benar === "C" ? "pilih" : null}>C</p>
            <p>{data.C}</p>
          </div>
          <div className="jawab no-hover">
            <p className={data.benar === "D" ? "pilih" : null}>D</p>
            <p>{data.D}</p>
          </div>
          <div className="jawab no-hover">
            <p className={data.benar === "E" ? "pilih" : null}>E</p>
            <p>{data.E}</p>
          </div>
        </div>
      </div>
    );
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
            <textarea
              name="jawab"
              className="input-text-area"
              value={data.jawaban}
              readOnly
            ></textarea>
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

  const logout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("Rule");
    props.history.push("/");
  };

  return localStorage.getItem("Token") ? (
    <>
      <Header page="tugas" logout={logout} />
      <div className="wrapper hasil">
        <div className="card shadow-sm border-0">
          <div className="card-body p-2 header-timer">
            <Siswa />
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
          <button
            className="btn btn-primary buton"
            onClick={() => props.history.push("/tugas")}
          >
            <i className="fa fa-reply fa-1x mr-1"></i>
            Kembali
          </button>
        </div>
      </div>
    </>
  ) : (
    <Redirect to="/auth" />
  );
};

export default HasilTes;
