import { useState } from "react";
import Jumbotron from "../../components/cards/Jumbotron";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { useNavigate, useLocation } from "react-router-dom";
import './login.css';

export default function Login() {
  // state
  const [email, setEmail] = useState("alex@gmail.com");
  const [password, setPassword] = useState("rrrrrr");
  // hook
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // console.log("location => ", location);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/login`, {
        email,
        password,
      });
      // console.log(data);
      if (data?.error) {
        toast.error(data.error);
      } else {
        localStorage.setItem("auth", JSON.stringify(data));
        setAuth({ ...auth, token: data.token, user: data.user });
        toast.success("Sesion iniciada con exito");
        navigate(
          location.state ||
            `/dashboard/${data?.user?.role === 1 ? "admin" : "user"}`
        );
      }
    } catch (err) {
      console.log(err);
      toast.error("Fallo al iniciar sesion, intente de nuevo.");
    }
  };

  return (
    <div>
      <Jumbotron title="Login" />

      <div className="container-mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form onSubmit={handleSubmit}>
            <label for="email">Correo Electronico</label>
              <input
                type="email"
                className="form-control-mb-4-p-2"
                placeholder="Ingresa tu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
<label for="password">Contraseña</label>
              <input
                type="password"
                className="form-control-mb-4-p-2"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button className="btn-btn-primary" type="submit">
                Iniciar Sesión
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
