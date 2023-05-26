import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import Jumbotron from "../../components/cards/Jumbotron";
import AdminMenu from "../../components/nav/AdminMenu";
import axios from "axios";
import { Select } from "antd";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

export default function AdminProduct() {
  // context
  const [auth, setAuth] = useAuth();
  // state
  const [categories, setCategories] = useState([]);
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [shipping, setShipping] = useState("");
  const [quantity, setQuantity] = useState("");
  // hook
  const navigate = useNavigate();

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const { data } = await axios.get("/categories");
      setCategories(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("photo", photo);
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("category", category);
      productData.append("shipping", shipping);
      productData.append("quantity", quantity);

      const { data } = await axios.post("/product", productData);
      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`"${data.name}" fue creado`);
        navigate("/dashboard/admin/products");
      }
    } catch (err) {
      console.log(err);
      toast.error("Error al crear el producto. Intente de nuevo.");
    }
  };

  return (
    <>
      <Jumbotron
        title={`Hola ${auth?.user?.name}`}
        subTitle="Panel de Administrador"
      />

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="p-3 mt-2 mb-2 h4 bg-light">Agrega nuevos productos al catalogo</div>

            {photo && (
              <div className="text-center">
                <img
                  src={URL.createObjectURL(photo)}
                  alt="imagen del producto"
                  className="img img-responsive"
                  height="200px"
                />
              </div>
            )}

            <div className="pt-2">
              <label className="btn btn-outline-secondary col-12 mb-3">
                {photo ? photo.name : "Subir una foto"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                />
              </label>
            </div>

            <input
              type="text"
              className="form-control p-2 mb-3"
              placeholder="Escribe un nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <textarea
              type="text"
              className="form-control p-2 mb-3"
              placeholder="Escribe una descripcion"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <input
              type="number"
              className="form-control p-2 mb-3"
              placeholder="Ingresa el precio"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <Select
              // showSearch
              bordered={false}
              size="large"
              className="form-select mb-3"
              placeholder="Selecciona una categoria"
              onChange={(value) => setCategory(value)}
            >
              {categories?.map((c) => (
                <Option key={c._id} value={c._id}>
                  {c.name}
                </Option>
              ))}
            </Select>

            <Select
              bordered={false}
              size="large"
              className="form-select mb-3"
              placeholder="Selecciona el envio"
              onChange={(value) => setShipping(value)}
            >
              <Option value="0">No</Option>
              <Option value="1">Yes</Option>
            </Select>

            <input
              type="number"
              min="1"
              className="form-control p-2 mb-3"
              placeholder="Ingresar stock disponible"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />

            <button onClick={handleSubmit} className="btn btn-primary mb-5">
              Crear
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
