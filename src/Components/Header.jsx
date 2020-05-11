import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const Header = ({ page, logout }) => {
  const rule = localStorage.getItem("Rule");

  const confirmLogout = () => {
    swal({
      text: "Are you sure to logout?",
      dangerMode: true,
      buttons: ["Cancel", "Yes"],
    }).then((logoutOk) => {
      if (logoutOk) {
        logout();
      }
    });
  };
  return (
    <div className="navbar navbar-expand-md fixed-top navbar-dark py-3 header">
      <button
        className="navbar-toggler "
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i className="fa fa-bars fa-1x"></i>
      </button>
      <div className="collapse navbar-collapse menu" id="navbarNav">
        <ul className="navbar-nav text-uppercase">
          <li className={page === "home" ? "nav-item active" : "nav-item"}>
            <Link to="/home" className="nav-link link">
              <i className="fa fa-home fa-1x"></i> Home
            </Link>
          </li>
          {rule === "admin" ? (
            <>
              <li className={page === "guru" ? "nav-item active" : "nav-item"}>
                <Link to="/data-guru" className="nav-link link">
                  <i className="fa fa-smile fa-1x"></i> Guru
                </Link>
              </li>

              <li className={page === "siswa" ? "nav-item active" : "nav-item"}>
                <Link to="/data-siswa" className="nav-link link">
                  <i className="fa fa-smile fa-1x"></i> Siswa
                </Link>
              </li>

              <li className={page === "kelas" ? "nav-item active" : "nav-item"}>
                <Link to="/data-kelas" className="nav-link link">
                  <i className="fa fa-school fa-1x"></i> Kelas
                </Link>
              </li>

              <li className={page === "mapel" ? "nav-item active" : "nav-item"}>
                <Link to="/data-mapel" className="nav-link link">
                  <i className="fa fa-book-open fa-1x"></i> Mapel
                </Link>
              </li>

              <li
                className={
                  page === "list-mapel" ? "nav-item active" : "nav-item"
                }
              >
                <Link to="/mapel" className="nav-link link">
                  <i className="fa fa-book-open fa-1x"></i> Mapel dan Soal
                </Link>
              </li>
              <li className={page === "absen" ? "nav-item active" : "nav-item"}>
                <Link to="/absen" className="nav-link link">
                  <i className="fa fa-book-open fa-1x"></i> Absensi
                </Link>
              </li>
            </>
          ) : rule === "siswa" ? (
            <>
              <li
                className={
                  page === "list-mapel" ? "nav-item active" : "nav-item"
                }
              >
                <Link to="/mapel" className="nav-link link">
                  <i className="fa fa-book-open fa-1x"></i> Mapel dan Soal
                </Link>
              </li>
              <li className={page === "tugas" ? "nav-item active" : "nav-item"}>
                <Link to="/tugas" className="nav-link link">
                  <i className="fa fa-book-open fa-1x"></i> Tugas
                </Link>
              </li>
            </>
          ) : rule === "guru" ? (
            <>
              <li
                className={
                  page === "list-mapel" ? "nav-item active" : "nav-item"
                }
              >
                <Link to="/mapel" className="nav-link link">
                  <i className="fa fa-book-open fa-1x"></i> Mapel dan Soal
                </Link>
              </li>
              <li className={page === "tugas" ? "nav-item active" : "nav-item"}>
                <Link to="/tugas" className="nav-link link">
                  <i className="fa fa-book-open fa-1x"></i> Tugas
                </Link>
              </li>
              <li className={page === "absen" ? "nav-item active" : "nav-item"}>
                <Link to="/absen" className="nav-link link">
                  <i className="fa fa-book-open fa-1x"></i> Absensi
                </Link>
              </li>
            </>
          ) : null}
        </ul>
      </div>
      <div className="user mr-0" onClick={() => confirmLogout()}>
        <i className="fa fa-user fa-1x link"></i>
      </div>
    </div>
  );
};

export default Header;
