import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
    // ─── React-Redux hooks ──────────────────────────────────────────────────────
    // useSelector reads the cart slice from Redux state
    const cart = useSelector(state => state.cart.items);
    // useDispatch gives us the dispatch() function to send actions
    const dispatch = useDispatch();

    // ─── Helpers ─────────────────────────────────────────────────────────────────
    /** Sum up (price × quantity) for every item in the cart */
    const calculateTotalAmount = () => {
        return cart
            .reduce((sum, item) => {
                // item.cost might be a string like "$12", so strip non-digits:
                const price = parseFloat(item.cost.toString().replace(/[^0-9.]/g, '')) || 0;
                return sum + price * item.quantity;
            }, 0)
            .toFixed(2); // format to two decimals
    };

    /** Calculate subtotal for one item */
    const calculateTotalCost = (item) => {
        const price = parseFloat(item.cost.toString().replace(/[^0-9.]/g, '')) || 0;
        return (price * item.quantity).toFixed(2);
    };

    // ─── Event handlers ─────────────────────────────────────────────────────────
    /** Calls the parent’s callback to hide the cart and go back to shopping */
    const handleContinueShopping = (e) => {
        e.preventDefault();
        if (onContinueShopping) onContinueShopping(e);
    };

    /** Increase quantity by 1 and dispatch an updateQuantity action */
    const handleIncrement = (item) => {
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
    };

    /** Decrease quantity by 1 (but not below 1) */
    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
        }
    };

    /** Remove this item entirely from the cart */
    const handleRemove = (item) => {
        dispatch(removeItem(item.name));
    };

    // ─── Render ─────────────────────────────────────────────────────────────────
    return (
        <div className="cart-container">
            <h2>Total Cart Amount: ${calculateTotalAmount()}</h2>

            {cart.map(item => (
                <div className="cart-item" key={item.name}>
                    <img className="cart-item-image" src={item.image} alt={item.name} />

                    <div className="cart-item-details">
                        <div className="cart-item-name">{item.name}</div>
                        <div className="cart-item-cost">{item.cost}</div>

                        <div className="cart-item-quantity">
                            <button
                                className="cart-item-button cart-item-button-dec"
                                onClick={() => handleDecrement(item)}
                            >
                                −
                            </button>
                            <span className="cart-item-quantity-value">{item.quantity}</span>
                            <button
                                className="cart-item-button cart-item-button-inc"
                                onClick={() => handleIncrement(item)}
                            >
                                +
                            </button>
                        </div>

                        <div className="cart-item-total">
                            Item Total: ${calculateTotalCost(item)}
                        </div>

                        <button
                            className="cart-item-delete"
                            onClick={() => handleRemove(item)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}

            <div className="continue_shopping_btn">
                <button
                    className="get-started-button"
                    onClick={handleContinueShopping}
                >
                    Continue Shopping
                </button>
                <button className="get-started-button1">Checkout</button>
            </div>
        </div>
    );
};

export default CartItem;
