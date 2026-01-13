
const reducer = (state, action) => {
    if (action.type === "LOADING") {
        return { ...state, loading: action.payload === true };
    } else if (action.type === "CLEAR_CART") {
        return { ...state, cart: [] };
    } else if (action.type === "REMOVE_ITEM") {
        return { ...state, cart: state.cart.filter((item) => item.id !== action.payload) };
    } else if (action.type === "TOGGLE_AMOUNT") {
        const tempCart = state.cart.map((item) => {
            if (item.id === action.payload.id) {
                if (action.payload.type === 'increase') {
                    return { ...item, amount: item.amount + 1 };
                }
                if (action.payload.type === 'decrease') {
                    return { ...item, amount: item.amount - 1 };
                }
            }
            return item;
        });
        return { ...state, cart: tempCart.filter((item) => item.amount !== 0) };
    } else if (action.type === "GET_TOTALS") {
        let { total, amount } = state.cart.reduce((cartTotal, cartItem) => {
            const { price, amount } = cartItem;
            const itemTotal = price * amount;
            cartTotal.total += itemTotal;
            cartTotal.amount += amount;
            return cartTotal;
        }, { total: 0, amount: 0 });
        total = parseFloat(total.toFixed(2));
        amount = parseInt(amount);
        return { ...state, total, amount };
    } else if (action.type === "SET_CART") {
        return { ...state, cart: action.payload };
    }
    throw new Error("No matching action type");
}

export default reducer
