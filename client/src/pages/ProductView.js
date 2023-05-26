import { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Badge } from "antd";
import {
  FaDollarSign,
  FaProjectDiagram,
  FaRegClock,
  FaCheck,
  FaTimes,
  FaTruckMoving,
  FaWarehouse,
  FaRocket,
} from "react-icons/fa";
import ProductCard from "../components/cards/ProductCard";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";
import './productView.css'

export default function ProductView() {
  // context
  const [cart, setCart] = useCart();
  // state
  const [product, setProduct] = useState({});
  const [related, setRelated] = useState([]);
  // hooks
  const params = useParams();

  useEffect(() => {
    if (params?.slug) loadProduct();
  }, [params?.slug]);

  const loadProduct = async (req, res) => {
    try {
      const { data } = await axios.get(`/product/${params.slug}`);
      setProduct(data);
      loadRelated(data._id, data.category._id);
    } catch (err) {
      console.log(err);
    }
  };

  const loadRelated = async (productId, categoryId) => {
    try {
      const { data } = await axios.get(
        `/related-products/${productId}/${categoryId}`
      );
      setRelated(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container--product--view">
      <div className="row--product">
        <div className="col-md-9">
          <div className="card-mb-3">
            <Badge.Ribbon text={`${product?.sold} Vendidas`} color="red">
              <Badge.Ribbon
                text={`${
                  product?.quantity >= 1
                    ? `${product?.quantity - product?.sold} in stock`
                    : "Out of stock"
                }`}
                placement="start"
                color="green"
              >
                <img
                  className="card-img-top"
                  src={`${process.env.REACT_APP_API}/product/photo/${product._id}`}
                  alt={product.name}
                  style={{ height: "500px", width: "100%", objectFit: "cover" }}
                />
              </Badge.Ribbon>
            </Badge.Ribbon>

            <div className="card-body">
              <h1 className="fw-bold">{product?.name}</h1>
              <p className="card-text lead">{product?.description}</p>
            </div>

            <div className="texto--product--page">
              <div className="texto--product--page-lol"> 
                <p className="preciooo">
                  <FaDollarSign /> Precio:{" "}
                  {product?.price?.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>

                <p>
                  <FaProjectDiagram /> Categoria: {product?.category?.name}
                </p>

                <p>
                  <FaRegClock /> Añadida: {moment(product.createdAt).fromNow()}
                </p>

                <p>
                  {product?.quantity > 0 ? <FaCheck /> : <FaTimes />}{" "}
                  {product?.quantity > 0 ? "In Stock" : "Out of Stock"}
                </p>

                <p>
                  <FaWarehouse /> Disponibles: {product?.quantity - product?.sold}
                </p>

                <p>
                  <FaRocket /> Vendidas: {product.sold}
                </p>
              </div>
            </div>

            <button
              className="btn-btn-outline-primary-col-card-button"
              style={{
                borderBottomRightRadius: "5px",
                borderBottomLeftRadius: "5px",
              }}
              onClick={() => {
                setCart([...cart, product]);
                toast.success("Agregada al carrito");
              }}
            >
              Agregar al carrito
            </button>
          </div>
        </div>
        <h2 className="text-center">Productos relacionados</h2>

        <div className="row">
          <hr />
          {related?.length < 1 && <p>Nada encontrado</p>}
          {related?.map((p) => (
            <div className="col--md" key={p._id}>
                  <ProductCard p={p} key={p._id}/>
                </div>
          ))}
        </div>
      </div>
    </div>
  );
}
