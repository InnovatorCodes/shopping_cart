import { supabase } from "../components/supabaseClient";
import emptyCartImg from "../assets/emptyCart.webp";
import Header from "../components/Header";
import PropTypes from "prop-types";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useState, useEffect } from "react";

export default function CartPage() {
  const { cart, setCart, products, user, setUser, images } = useOutletContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (user == null) {
      navigate("/login");
    }
  }, [user, navigate]);
  CartSummary.propTypes = {
    cart: PropTypes.array.isRequired,
    products: PropTypes.object.isRequired,
    images: PropTypes.object.isRequired,
  };
  return (
    <div className="cart-page">
      <Header active="cart" user={user} setUser={setUser}></Header>
      <h2>My Cart</h2>
      <CartSummary cart={cart} products={products} images={images} />
    </div>
  );
  function CartSummary({ cart, products, images }) {
    let subTotal = 0;
    async function placeOrder() {
      setCart({ items: [] });
      navigate("/order-placed");
      if (user.user_id != -1) {
        const { error } = await supabase
          .from("User Carts")
          .update({ cart_items: { items: [] } })
          .eq("user_id", user.user_id)
          .select();
        if (error) console.log(error);
      }
    }
    if (cart.items.length > 0) {
      const itemCards = cart.items.map((cartItem) => {
        const product = products[cartItem.id - 1];
        const total = product.price * cartItem.quantity;
        subTotal += total;
        return <CartItem key={cartItem.id} cartItem={cartItem} />;
      });
      return (
        <div className="cart-summary">
          <div className="cart-items">
            <div className="heading">
              <h3 className="product">Product</h3>
              <h3 className="price">Price</h3>
              <h3 className="quantity">Quantity</h3>
              <h3 className="total">Total</h3>
            </div>
            {itemCards}
          </div>
          <div className="order-summary">
            <div className="totals">
              <div className="subtotal">
                <p>Subtotal</p>
                <p>&#8377; {new Intl.NumberFormat("en-IN").format(subTotal)}</p>
              </div>
              <div className="shipping-charge">
                <p>Shipping Charges</p>
                <p>&#8377; {new Intl.NumberFormat("en-IN").format(100)}</p>
              </div>
              <hr />
              <div className="total">
                <p>Total</p>
                <p>
                  &#8377;{" "}
                  {new Intl.NumberFormat("en-IN").format(subTotal + 100)}
                </p>
              </div>
            </div>
            <button className="place-order" onClick={placeOrder}>
              Place Order
            </button>
          </div>
        </div>
      );
    }

    function CartItem({ cartItem }) {
      let product = products[cartItem.id - 1];
      const [isEditing, setIsEditing] = useState(false);
      const [inputQty, setInputQty] = useState(cartItem.quantity);

      useEffect(() => {
        setInputQty(cartItem.quantity); // Keep input in sync when cart updates from outside
      }, [cartItem.quantity]);

      const quantityCounter = (
        <div className="quantity">
          <button
            className="decrement"
            onClick={() => updateCart(cartItem.id, cartItem.quantity - 1)}
          >
            -
          </button>
          {isEditing ? (
            <input
              className="quantity-count"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={inputQty}
              onChange={(event) => {
                const value = event.target.value;
                if (/^\d*$/.test(value)) {
                  setInputQty(value);
                }
              }}
              onBlur={() => {
                const finalQty = parseInt(inputQty);
                updateCart(
                  cartItem.id,
                  isNaN(finalQty) || finalQty < 1 ? 1 : finalQty,
                );
                setIsEditing(false);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.target.blur(); // triggers onBlur
                }
              }}
              autoFocus
            />
          ) : (
            <div className="quantity-count" onClick={() => setIsEditing(true)}>
              {cartItem.quantity}
            </div>
          )}
          <button
            className="increment"
            onClick={() => updateCart(cartItem.id, cartItem.quantity + 1)}
          >
            +
          </button>
        </div>
      );
      const total = cartItem.quantity * product.price;
      return (
        <div className="cart-item" key={cartItem.id}>
          <img src={getImage(product.image_file)} alt="" />
          <div className="fixed">
            <h3>{product.name}</h3>
            <div className="price">
              &#8377; {new Intl.NumberFormat("en-IN").format(product.price)}
            </div>
          </div>
          {quantityCounter}
          <div className="total">
            &#8377; {new Intl.NumberFormat("en-IN").format(total)}
          </div>
        </div>
      );

      async function updateCart(prodID, qty) {
        let newCart = { ...cart };
        const prodIndex = newCart.items.findIndex((p) => p.id === prodID);
        if (qty < 1) {
          if (prodIndex !== -1) newCart.items.splice(prodIndex, 1);
        } else if (prodIndex !== -1) {
          newCart.items[prodIndex].quantity = qty;
        }
        setCart(newCart);
        const { error } = await supabase
          .from("User Carts")
          .upsert(
            { user_id: user.user_id, cart_items: newCart },
            { onConflict: ["user_id"] },
          );
        if (error) console.log(error);
      }
      function getImage(imageName) {
        const entry = Object.entries(images).find(([path]) =>
          path.endsWith(`/${imageName}`),
        );
        return entry ? entry[1] : undefined;
      }
    }

    CartItem.propTypes = {
      cartItem: PropTypes.object.isRequired,
    };

    return (
      <div className="empty-cart">
        <img src={emptyCartImg} alt="Empty Cart" />
        <h3>Your Cart is feeling a little light!</h3>
        <div>
          <p>Looks like you haven’t added anything to your Cart just yet.</p>
          <p>
            Browse our collection and find something you love — your next
            favorite product might be just a click away!{" "}
          </p>
        </div>
        <button onClick={() => navigate("/shop")}>Continue Shopping</button>
      </div>
    );
  }
}
