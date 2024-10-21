import { lazy, StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './Layout/MenuLayout/MenuLayout.tsx';
import Basket from './components/pages/Cart/Cart.tsx'; 
import axios from 'axios';
import { PREFIX } from './helpers/API.ts';
import ProductPage from './components/pages/Product/Product.tsx';
import AuthLayout from './Layout/Auth/AuthLayout.tsx';
import Register from './components/pages/Register/Register.tsx';
import Login from './components/pages/Login/Login.tsx';
import { RequireAuth } from './helpers/RequireAuth.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import Success from './components/pages/Success/Success.tsx';

// eslint-disable-next-line react-refresh/only-export-components
const Menu = lazy(() => import('./components/pages/Menu/Menu.tsx'));

const router = createBrowserRouter([
	{
		path: '/',
		element: <RequireAuth><Layout/></RequireAuth>,
		children: [
			{
				path: '/',
				element: <Suspense><Menu/></Suspense>
			},
			{
				path: '/success',
				element: <Success/>
			},
			{
				path: '/basket',
				element: <Basket/>
			},
			{
				path: '/product/:id',
				element: <ProductPage/>,
				errorElement: <>Error 404</>,
				loader:  async ({ params }) => {
					const { data } = await axios.get(`${PREFIX}/products/${params.id}`);
					return data;
				}
			}
		]
	},
	{
		path: '/auth',
		element: <AuthLayout/>,
		children: [
			{
				path: 'login',
				element: <Login/>
			},
			{
				path: 'register',
				element: <Register/>
			}
		]
	}
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router}/>
		</Provider>
	</StrictMode>
);
