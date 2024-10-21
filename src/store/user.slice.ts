import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loadState } from './storage';
import axios, { AxiosError } from 'axios';
import { PREFIX } from '../helpers/API';
import { LoginResponse } from '../interfaces/authinterface';

export const JWT_PERSISTENT_STATE = 'userData';

export interface UserPersitentState {
   jwt: string | null;
}

export interface Profile {
	name: string;
	id: string;
	email: string;
	address: string;
	phone: string;
}

export interface UserState{
   jwt: string | null;
	statusError?: string;
	RegisterStatusError?: string;
	profile?: Profile;
}


const initialState: UserState = {
	jwt: loadState<UserPersitentState>(JWT_PERSISTENT_STATE)?.jwt ?? null
};

export const login = createAsyncThunk('user/login', 
	async(params: {email: string, password: string}) => {
		try {
			const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/login`, {
				email : params.email,
				password : params.password
	
			});
			return data;
		} catch (error) {
			if (error instanceof AxiosError) {
				throw new Error('Error: ' + error.response?.data.message);

				
			}
		}
		
	}
);

export const getProfile = createAsyncThunk('user/profile', 
	async(jwt: string | null) => {
		const { data } = await axios.get<Profile>(`${PREFIX}/user/profile`, {
			headers: {
				Authorization: `Bearer ${jwt}`
			}
		});
		return data;
	}
);

export const register = createAsyncThunk('user/register', 
	async(params: {email: string, password: string, name: string}) => {
		try {
			const { data } = await axios.post<LoginResponse>(`${PREFIX}/auth/register`, {
				email: params.email,
				name: params.name,
				password: params.password
			});
			return data;
		} catch (error) {
			if (error instanceof AxiosError) {
				throw new Error('Error: ' + error.response?.data.message);

				
			}
		}
		
	}
);

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		
		logOut: (state) => {
			state.jwt = null;
		},
		clearLoginError: (state) => {
			state.statusError = undefined;
		},
		clearRegisterError: (state) => {
			state.RegisterStatusError = undefined;
		}

	},
	extraReducers: (builder) => {
		builder.addCase(login.fulfilled, (state, action) => {
			if (!action.payload) {
				return;
			}
			state.jwt = action.payload.access_token;
		});
		builder.addCase(login.rejected, (state, action) => {
			state.statusError = action.error.message;
		});


		builder.addCase(getProfile.fulfilled, (state, action) => {
			state.profile = action.payload;
		});

		builder.addCase(register.fulfilled, (state, action) => {
			if (!action.payload) {
				return;
			}
			state.jwt = action.payload?.access_token;
		});
		builder.addCase(register.rejected, (state, action) => {
			state.RegisterStatusError = action.error.message;
		});
	}
});

export default userSlice.reducer;
export const userActions = userSlice.actions;