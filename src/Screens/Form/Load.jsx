import React, { useEffect, useState } from "react";
import "./style.css";
import { Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import Loading from "../Loading";
import { getSekolah } from "../../redux/actions/auth";
import { Link } from "react-router-dom";

const Load = (props) => {
  const dispatch = useDispatch();
  const [loading1, setLoading1] = useState(true);
  const [npsn, setNpsn] = useState("");
  const [nama, setNama] = useState("");
  const [alamat, setAlamat] = useState("");
  const [logo, setLogo] = useState(null);

  useEffect(() => {
    const getData = async () => {
      setLoading1(true);
      await dispatch(getSekolah()).then((res) => {
        const result = res.value.data.result[0];
        setNpsn(result.npsn);
        setNama(result.nama_sekolah);
        setAlamat(result.alamat);
        setLogo(result.logo);
        setLoading1(false);
      });
    };

    getData();
  }, [dispatch]);

  return !localStorage.getItem("Token") ? (
    <Redirect to="/auth" />
  ) : (
    <>
      <div className="card shadow-sm mb-3 border-0 minimal">
        <div className="card-body p-3">
          {loading1 ? (
            <Loading />
          ) : (
            <>
              <div className="container-profile">
                <div className="img-profile">
                  <img src={logo} alt="avatar user" width="200px" />
                </div>
                <div className="right">
                  <div className="detail-profile">
                    <div className="profile-area d-flex">
                      <p className="mt-3">Npsn</p>
                      <p className="mt-3">{npsn}</p>
                    </div>
                    <div className="profile-area d-flex">
                      <p className="mt-3">Nama</p>
                      <p className="mt-3">{nama}</p>
                    </div>
                    <p className="mt-2">{alamat}</p>
                  </div>
                  <div className="d-flex btn-profile">
                    <Link to="/config" className="link">
                      <button
                        type="button"
                        className="btn btn-danger px-3 buton mt-2"
                      >
                        <i className="fa fa-edit fa-1x"></i> Edit
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Load;
