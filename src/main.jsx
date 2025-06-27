import React from 'react';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AppLayout from './AppLayout.jsx';


//router
import {
	createBrowserRouter,
	RouterProvider,
} from 'react-router-dom';
//redux
import { Provider } from 'react-redux';
import store from './store/store.js';
//pages
import HomePage from './pages/HomePage.jsx';
import SingleProductPage from './pages/SingleProductPage.jsx';
import CartPage from './pages/CartPage.jsx';
//clerk
import { ClerkProvider } from '@clerk/clerk-react';
// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;


if (!PUBLISHABLE_KEY) {
	throw new Error('Add your Clerk Publishable Key to the .env file');
}

const router = createBrowserRouter([
	{
		path: '/',
		element: <AppLayout />,
		children: [
			{
				path: '/',
				element: <HomePage />,
			},
			{
				path: '/singleProduct/:id',
				element: <SingleProductPage />
			},
			{
				path:'/cart',
				element: <CartPage />
			}

		],
	},
]);

createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<ClerkProvider
				publishableKey={PUBLISHABLE_KEY}>
				<RouterProvider router={router} />
			</ClerkProvider>
		</Provider>
	</React.StrictMode>
);
