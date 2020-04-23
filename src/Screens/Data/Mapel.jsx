import React, { useEffect } from "react";
import Header from "../../Components/Header";
import { Redirect } from "react-router-dom";

const DataMapel = (props) => {
  useEffect(() => {
    document.getElementById("title").innerText = "Data Mapel";
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
      <Header page="mapel" logout={logout} />
      <div className="wrapper">
        <button
          className="btn btn-primary mb-3 px-4 buton"
          data-toggle="modal"
          data-target="#modalInput"
        >
          Tambah Data Mapel
        </button>

        <div className="card shadow">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table text-center m-0">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">NAME</th>
                    <th scope="col">IMAGE</th>
                    <th scope="col">DESCRIPTION</th>
                    <th scope="col">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Saya Siapa</td>
                    <td>Image</td>
                    <td>Bukan Apa Apa</td>
                    <td>
                      <i className="fa fa-trash mr-3 btn-trash"></i>
                      <i className="fa fa-edit ml-3 btn-edit"></i>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Saya Siapa</td>
                    <td>Image</td>
                    <td>Bukan Apa Apa</td>
                    <td>
                      <i className="fa fa-trash mr-3 btn-trash"></i>
                      <i className="fa fa-edit ml-3 btn-edit"></i>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* modal input */}
      <div
        className="modal fade"
        id="modalInput"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="categoriesModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header border-0">
              <h5 className="modal-title font-weight-bold">Tambah Data</h5>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group row">
                  <label className="col-sm-3 col-form-label font-weight-bold">
                    Name
                  </label>
                  <div className="col-sm-9 mb-3">
                    <input
                      type="text"
                      className="form-control shadow-sm border-0"
                      name="name"
                      required
                    />
                  </div>
                  <label className="col-sm-3 col-form-label font-weight-bold">
                    Name
                  </label>
                  <div className="col-sm-9 mb-2">
                    <input
                      type="text"
                      className="form-control shadow-sm border-0"
                      name="name"
                      required
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer border-0">
              <button
                type="button"
                className="btn btn-secondary font-weight-bold px-3 mr-2 buton-sec"
                data-dismiss="modal"
              >
                Cancel
              </button>
              <button
                value="Submit"
                type="button"
                className="btn btn-primary font-weight-bold px-4 buton"
                data-dismiss="modal"
              >
                Tambah
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Redirect to="/home" />
  );
};

export default DataMapel;
