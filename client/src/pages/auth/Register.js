import { useState } from "react";
import Jumbotron from "../../components/cards/Jumbotron";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import './login.css';

export default function Register() {
  // state
  const [name, setName] = useState("alex");
  const [email, setEmail] = useState("alex@gmail.com");
  const [password, setPassword] = useState("rrrrrr");
  // hooks
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/register`, {
        name,
        email,
        password,
      });
      console.log(data);
      if (data?.error) {
        toast.error(data.error);
      } else {
        localStorage.setItem("auth", JSON.stringify(data));
        setAuth({ ...auth, token: data.token, user: data.user });
        toast.success("Registration successful");
        navigate("/dashboard/user");
      }
    } catch (err) {
      console.log(err);
      toast.error("Registration failed. Try again.");
    }
  };

  return (
    <div>
      <Jumbotron title="Register" />
      <div className="container-mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <form onSubmit={handleSubmit}>
            <label for="name">Ingresa tu nombre</label>
              <input
                type="text"
                className="form-control-mb-4-p-2"
                placeholder="ingresa tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
<label for="email">Correo Electronico</label>
              <input
                type="email"
                className="form-control-mb-4-p-2"
                placeholder="ingresa tu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
<label for="password">Crea una Contraseña</label>
              <input
                type="password"
                className="form-control-mb-4-p-2"
                placeholder="ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button className="btn-btn-primary" type="submit">
                Registrarse
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
