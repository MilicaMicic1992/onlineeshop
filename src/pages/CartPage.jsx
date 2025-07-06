import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteFromCartAction,
	setPriceHandlerAction,
} from '../store/cartSlice';

function CartPage() {
	const { cart, totalPrice } = useSelector(
		(state) => state.cartStore
	);
	const dispatch = useDispatch();

	function handleRemoveProduct(product) {
		dispatch(deleteFromCartAction(product));
	}

	return (
		<div className='mt-[50px]'>
			<div className='container mx-auto flex flex-col lg:flex-row gap-[20px]'>
				<TableContainer component={Paper} className='w-full lg:70%'>
					<Table sx={{ minWidth: 250 }} aria-label='simple table'>
						<TableHead>
							<TableRow className='bg-mainBlue'>
								<TableCell style={{ color: 'white' }}>
									Products
								</TableCell>
								<TableCell style={{ color: 'white' }} align='left'>
									Price
								</TableCell>
								<TableCell style={{ color: 'white' }} align='left'>
									Quantity
								</TableCell>
								<TableCell style={{ color: 'white' }} align='right'>
									Subtotal
								</TableCell>
								<TableCell style={{ color: 'white' }} align='right'>
									Remove
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{cart.map((product) => (
								<TableRow
									key={product.id}
									sx={{
										'&:last-child td, &:last-child th': { border: 0 },
									}}>
									<TableCell component='th' scope='row'>
										<img
											src={product.thumbnail}
											alt=''
											className='w-[90px] h-[90px] border border-mainBlue rounded-lg object-cover'
										/>
									</TableCell>
									<TableCell align='left'>${product.price}</TableCell>
									<TableCell align='left'>
										<div className='flex items-center'>
											<button
												className='px-[8px] py-[16px] bg-slate-300 text-[18px]'
												onClick={() =>
													dispatch(
														setPriceHandlerAction({
															increment: -1,
															product,
														})
													)
												}>
												-
											</button>
											<span className='px-[8px] py-[16px] bg-slate-300 text-[18px]'>
												{product.count}
											</span>
											<button
												className='px-[8px] py-[16px] bg-slate-300 text-[18px]'
												onClick={() => {
													if (product.count < product.stock) {
														dispatch(
															setPriceHandlerAction({
																increment: 1,
																product,
															})
														);
													}
												}}>
												+
											</button>
										</div>
									</TableCell>
									<TableCell align='right'>
										${Math.floor(product.cartTotal)}
									</TableCell>
									<TableCell align='right'>
										<button
											className='text-red-400'
											onClick={() => handleRemoveProduct(product)}>
											Remove
										</button>
									</TableCell>
								</TableRow>
							))}
							{cart.length === 0 && (
								<TableRow>
									<TableCell colSpan={5} align='center'>
										Your cart is empty.
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>

				<div className='w-full lg:w-[30%]'>
					<h2>CART TOTAL</h2>
					<span>${Math.floor(totalPrice)}</span>
				</div>
			</div>
		</div>
	);
}

export default CartPage;
