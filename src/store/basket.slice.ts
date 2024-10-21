import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loadState } from './storage';

export const CART_PERSISTENT_STATE = 'cartData';

export interface BasketItem {
   id: number;
   count: number;
}


export interface CartState{
   items: BasketItem[]
}


const initialState: CartState = loadState<CartState>(CART_PERSISTENT_STATE) ?? {
	items: []
};

export const basketSlice = createSlice({
	name: 'basket',
	initialState,
	reducers: {

		cleanItemsAfterOrder: (state)=> {
			state.items = [];
		},

		deleteItem: (state, action: PayloadAction<number>) => {
			const indexOfItem = state.items.findIndex(i => i.id === action.payload);
			if (indexOfItem !== -1) {
				state.items.splice(indexOfItem, 1);
				return;
			}
			return;
		},

		remove: (state, action: PayloadAction<number>) => {
			state.items.map(i => {
				if (i.count  < 2) {
					const indexOfItem = state.items.findIndex(i => i.id === action.payload);
					if (indexOfItem !== -1) {
						state.items.splice(indexOfItem, 1);
					}
				}
				if (i.id === action.payload) {
					i.count--;
				}
				return i;
			});
		},

		add: (state, action: PayloadAction<number>) => {
         
			const existed = state.items.find(i => i.id === action.payload);
			if (!existed) {
				state.items.push({id: action.payload, count: 1});
				return;
			}
			state.items.map(i => {
				if (i.id === action.payload) {
					i.count++;
				}
				return i;
			});
		}
	}
});

export default basketSlice.reducer;
export const basketActions = basketSlice.actions;