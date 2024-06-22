import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { 
    addItemToCart as apiAddItemToCart,
    getCartItems as apiGetCartItems,
    removeCartItems as apiRemoveCartItems,
} from '../../services/api';

export const addItemToCart = createAsyncThunk(
    'cart/addItemToCart',
    async (book, { getState }) => {
        const state = getState();
        const userId = state.auth.user.ID;  // Get the user_id from the auth state

        const response = await apiAddItemToCart({ ...book, user_id: userId });
        return response.data;
    }
);

export const fetchCartItems = createAsyncThunk(
    'cart/fetchCartItems',
    async (_, { getState }) => { // To include underscore to indicate no parameter is being used directly
        const state = getState();
        const userId = state.auth.user.ID;
        const response = await apiGetCartItems(userId);
        return response.data;
    }
);

export const removeItemFromCart = createAsyncThunk(
    'cart/removeItemFromCart',
    async (bookId) => {
        await apiRemoveCartItems(bookId);
        return bookId;
    }
);


const initialState = {
    items: [],
    totalQuantity: 0,
};

export const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(addItemToCart.fulfilled, (state, action) => {
            state.items.push(action.payload);
            state.totalQuantity += 1;
        });
        builder.addCase(fetchCartItems.fulfilled, (state, action) => {
            state.items = action.payload;
            state.totalQuantity = action.payload.length;
        });
        builder.addCase(removeItemFromCart.fulfilled, (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            state.totalQuantity -= 1;
        });
    },
    
})

// export const {addItemToCart, removeItemFromCart} = cartSlice.actions;

export default cartSlice.reducer;
//for export all reducer