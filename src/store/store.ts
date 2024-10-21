import { configureStore } from '@reduxjs/toolkit';
import { JWT_PERSISTENT_STATE, userSlice } from './user.slice';
import { saveState } from './storage';
import { basketSlice, CART_PERSISTENT_STATE } from './basket.slice';

export const store = configureStore({
	reducer: {
		user: userSlice.reducer,
		basket: basketSlice.reducer

	}
});

store.subscribe(() => {
	saveState({jwt: store.getState().user.jwt}, JWT_PERSISTENT_STATE);
	saveState(store.getState().basket, CART_PERSISTENT_STATE);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;