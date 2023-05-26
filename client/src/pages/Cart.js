import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import Jumbotron from "../components/cards/Jumbotron";
import { useNavigate } from "react-router-dom";
import UserCartSidebar from "../components/cards/UserCartSidebar";
import ProductCardHorizontal from "../components/cards/ProductCardHorizontal";

export default function Cart() {
  // context
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  // hooks
  const navigate = useNavigate();

  return (
    <>
      <Jumbotron
        title={`¡Hola! ${auth?.token && auth?.user?.name}`}
        subTitle={
          cart?.length
            ? `Hay ${cart.length} items en tu carrito. ${
                auth?.token ? "" : "Porfavor Inicia Sesion para pagar"
              }`
            : "Tu carrito esta vacio, vuelve a la tienda"
        }
      />

      <div className="generalContainerLol">
        <div className="row">
          <div className="col-md-12">
            <div className="text-center">
              {cart?.length ? (
                "Mi carrito"
              ) : (
                <div className="text-center">
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate("/")}
                  >
                    Volver a la tienda 
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {cart?.length && (
        <div className="container--carrito">
          <div className="row--cart">
            <div className="col-md-8">
              <div className="row--cart">
                {cart?.map((p, index) => (
                  <ProductCardHorizontal key={index} p={p} />
                ))}
              </div>
            </div>

            <UserCartSidebar />
          </div>
        </div>
      )}
    </>
  );
}
