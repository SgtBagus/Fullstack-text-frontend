import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import update from "immutability-helper";
import { NotificationManager } from "react-notifications";

import InputText from "../../Components/Form/InputText";

import { getLogin } from "../../Data/Auth/Login";

import { CATCH_ERROR } from "../../Helper/Error";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const { email, password } = form;

	useEffect(() => {
    if(localStorage.getItem('currentUser')) {
       navigate('/');
    }
	}, [navigate]);

  const changeInputHandler = async (type, val) => {
    const newForm = update(form, {
      [type]: { $set: val },
    });

    await setForm(newForm);
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const { user: { id, name, image, role, email } , token }  = await getLogin(form);

			const currentUser = { id, name, email, image, role, token };

			await localStorage.setItem('currentUser', JSON.stringify(currentUser));

			window.location.href = "/";
    } catch (error) {
      NotificationManager.warning(CATCH_ERROR(error), "Terjadi Kesalahan", 5000);
    }
  };

  return (
    <div className="container" style={{ marginTop: "120px" }}>
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card border-0 rounded shadow-sm">
            <div className="card-body">
              <h4 className="fw-bold">HALAMAN LOGIN</h4>
              <hr />
              <form onSubmit={loginHandler}>
                <div className="mb-3">
                  <label className="form-label">ALAMAT EMAIL</label>
                  <InputText
                    type="email"
                    value={email}
                    placeholder="Masukkan Alamat Email"
                    changeEvent={(val, e) =>
                      changeInputHandler("email", val, e)
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">PASSWORD</label>
                  <InputText
                    type="password"
                    value={password}
                    placeholder="Masukkan Password"
                    changeEvent={(val, e) =>
                      changeInputHandler("password", val, e)
                    }
                  />
                </div>
                <div className="d-grid gap-2">
                  <button type="submit" className="btn btn-primary">
                    LOGIN
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
