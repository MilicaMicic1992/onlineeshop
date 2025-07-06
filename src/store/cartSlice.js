import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: JSON.parse(localStorage.getItem("cart_item")) || [],
        totalProduct: JSON.parse(localStorage.getItem("cart_total")) || 0,
        totalPrice: JSON.parse(localStorage.getItem("cart_price")) || 0,
    },
    reducers: {
        saveInCartAction: (state, action) => {
            const product = action.payload;
            const existing = state.cart.find((item) => item.id === product.id);

            if (!existing) {
                const newItem = {
                    ...product,
                    count: 1,
                    cartTotal: product.price,
                };
                state.cart.push(newItem);
                state.totalProduct++;
            } else {
                existing.count++;
                existing.cartTotal = existing.count * existing.price;
            }

            state.totalPrice = calculateTotal(state.cart);

            saveToLocalStorage(state);
        },

        deleteFromCartAction: (state, action) => {
            const id = action.payload.id;
            state.cart = state.cart.filter((item) => item.id !== id);
            state.totalProduct--;
            state.totalPrice = calculateTotal(state.cart);

            saveToLocalStorage(state);
        },

        setPriceHandlerAction: (state, action) => {
            const { increment, product } = action.payload;
            const item = state.cart.find((item) => item.id === product.id);
            if (!item) return;

            if (item.count === 1 && increment === -1) {
                state.cart = state.cart.filter((i) => i.id !== product.id);
                state.totalProduct--;
            } else {
                item.count += increment;
                item.cartTotal = item.count * item.price;
            }

            state.totalPrice = calculateTotal(state.cart);

            saveToLocalStorage(state);
        },
    },
});

function calculateTotal(cart) {
    return cart.reduce((acc, item) => acc + item.cartTotal, 0);
}

function saveToLocalStorage(state) {
    localStorage.setItem("cart_item", JSON.stringify(state.cart));
    localStorage.setItem("cart_total", JSON.stringify(state.totalProduct));
    localStorage.setItem("cart_price", JSON.stringify(state.totalPrice));
}

export const {
    saveInCartAction,
    deleteFromCartAction,
    setPriceHandlerAction,
} = cartSlice.actions;
export default cartSlice.reducer;
