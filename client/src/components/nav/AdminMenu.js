import { NavLink } from "react-router-dom";
import './adminmenu.css'

export default function AdminMenu() {
  return (
    <div className="panelAdmin--container">
      <div className="p-3 mt-2 mb-2 h4 bg-light">Accesos directos del administrador</div>

      <ul className="list-group list-unstyled">
        <li>
          <NavLink className="list-group-item" to="/dashboard/admin/category">
            Crear Categoria
          </NavLink>
        </li>

        <li>
          <NavLink className="list-group-item" to="/dashboard/admin/product">
            Crear Producto
          </NavLink>
        </li>

        <li>
          <NavLink className="list-group-item" to="/dashboard/admin/products">
            Todos Los Productos
          </NavLink>
        </li>

        <li>
          <NavLink className="list-group-item" to="/dashboard/admin/orders">
            Administrar Ordenes
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
