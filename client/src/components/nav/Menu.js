import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import Search from "../forms/Search";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import './Menu.css';
import logoDD from '../../images/diabloDriven-logo-name.png';

export default function Menu() {
  // context
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  // hooks
  const categories = useCategory();
  const navigate = useNavigate();

  // console.log("categories in menu => ", categories);

  const logout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <nav>

      <img className="logo--DD" src={logoDD} alt="diablo driven logo cool"/>


      

      <ul className="item--container">

        <li className="nav--item">
          <NavLink className="nav-link" aria-current="page" to="/">
            Inicio
          </NavLink>
        </li>

        <li className="nav--item">
          <NavLink className="nav-link" aria-current="page" to="/shop">
            Tienda
          </NavLink>
        </li>

        <div className="item--dropdown">
          
            {/* <a
              className="nav-link pointer dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              Categorias
            </a> */}

            {/* <ul
              className="dropdown--menu"
              style={{ height: "300px", overflow: "scroll" }}
            >
              {categories?.map((c) => (
                <li key={c._id}>
                  <NavLink className="nav-link" to={`/category/${c.slug}`}>
                    {c.name}
                  </NavLink>
                </li>
              ))}
            </ul> */}
          
        </div>

        <li className="nav--item">
          <Badge
            count={cart?.length >= 1 ? cart.length : 0}
            offset={[-5, 11]}
            showZero={true}
          >
            <NavLink className="nav-link" aria-current="page" to="/cart">
              Carrito
            </NavLink>
          </Badge>
        </li>


        {!auth?.user ? (
          <>
            <li className="nav--item">
              <NavLink className="nav-link" to="/login">
                Iniciar Sesión
              </NavLink>
            </li>
            <li className="nav--item">
              <NavLink className="nav-link" to="/register">
                Registrarse
              </NavLink>
            </li>
          </>
        ) : (
          <div className="item--dropdown">
            <li>
              <a
                className="nav-link pointer dropdown-toggle"
                data-bs-toggle="dropdown"
              >
                {auth?.user?.name?.toUpperCase()}
              </a>

              <ul className="dropdown--menu">
                <li>
                  <NavLink
                    className="nav-link"
                    to={`/dashboard/${
                      auth?.user?.role === 1 ? "admin" : "user"
                    }`}
                  >
                    Panel de admin
                  </NavLink>
                </li>

                <li className="nav--item">
                  <a onClick={logout} className="nav--item">
                    Cerrar sesion
                  </a>
                </li>
              </ul>
            </li>
          </div>
        )}
      </ul>
    </nav>
  );
}
