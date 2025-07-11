import React, { useEffect, useState } from 'react';
import ProductService from '../services/ProductService';
import { useParams } from 'react-router-dom';
import { Rating } from '@mui/material';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'

//icons
import { IoCheckmark } from 'react-icons/io5';
import { RxCross2 } from 'react-icons/rx';
import { IoIosHeartEmpty } from 'react-icons/io';
import { FaTruckFast } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { saveInCartAction } from '../store/cartSlice';
import { updateFavoriteAction } from '../store/favoriteSlice';
import { FaHeart } from "react-icons/fa";

function SingleProductPage() {
	const [singleProduct, setSingleProduct] = useState({});
	const [isLoading, setIsLoading] = useState(false);
	const [currentImage, setCurrentImage] = useState(0);
	const [countProduct, setCountProduct] = useState(1);

	const [favoriteIdIcon, setFavoriteIdIcon] = useState(null);
	const { allFavorite } = useSelector((state) => state.favoriteStore);


	//dispatch for redux

	const dispatch = useDispatch();

	let { id } = useParams();

	useEffect(() => {
		ProductService.getSingleProduct(id)
			.then((res) => {
				setSingleProduct(res.data);
				setIsLoading(true);
			})
			.catch((err) => console.log(err));
	}, []);

	useEffect(() => {
		if (allFavorite.length > 0) {
			allFavorite.find((item) => {
				if (item.id === singleProduct.id) {
					setFavoriteIdIcon(item.id);
					return;
				}
			});
		} else {
			setFavoriteIdIcon(null);
		}
	}, [allFavorite]);

	function handleImage(index) {
		setCurrentImage(index);
	}

	// Function koja prosledjuje proizvod u cart redux

	function handleProductCart() {
		dispatch(saveInCartAction(singleProduct));
	}

	return (
		<div className='px-[20px]'>
			{isLoading ? (
				<div className='container mx-auto flex flex-col lg:flex-row gap-[40px] lg:gap-[20px]'>
					{/* Left side */}
					<div className='w-full lg:w-[50%] flex flex-col items-center'>
						<img
							src={singleProduct.images[currentImage]}
							alt=''
							className='max-h-[]'
						/>

						<div className='flex items-center justify-between gap-[5px]'>
							{singleProduct.images.map((el, index) => {
								return (
									<img
										src={el}
										alt=''
										key={index}
										className={
											currentImage === index
												? 'w-[100px] h-[100px] border border-mainBlue p-[10px] rounded-lg'
												: ' w-[100px] h-[100px] border border-grayColor p-[10px] rounded-lg cursor-pointer'
										}
										onClick={() => handleImage(index)}
									/>
								);
							})}
						</div>
					</div>

					{/* Right side */}
					<div className='w-full lg:w-[50%] flex flex-col gap-[10px]'>
						<h2 className='text-mainBlue text-[36px]'>
							{singleProduct.title}
						</h2>
						<h5 className='font-semibold text-[20px]'>
							${singleProduct.price}
						</h5>
						<Rating value={singleProduct.rating} readOnly />

						<div className='flex items-center gap-[10px]'>
							<span className='text-gray-500'>Aviability:</span>
							{singleProduct.stock > 0 ? (
								<h3 className='flex items-center text-[#30BD57] gap-[5px] font-semibold'>
									<IoCheckmark size={24} /> In stock
								</h3>
							) : (
								<h3 className='flex items-center text-[#FF0000] gap-[5px] font-semibold'>
									<RxCross2 size={24} /> Out of stock
								</h3>
							)}
						</div>

						<p className='text-grayColor'>
							Hurry up! only{' '}
							<span className='font-extrabold text-mainBlue'>
								{singleProduct.stock}{' '}
							</span>{' '}
							product left in stock!
						</p>

						<div className='flex items-center gap-[20px]'>
							<p className='text-gray-500'>Tags:</p>

							<ul className='flex items-center gap-[20px]'>
								{singleProduct.tags.map((tag, index) => {
									return (
										<li
											key={index}
											className='bg-lightGray px-[20px] py-[10px] rounded-lg text-gray-500'>
											#{tag}
										</li>
									);
								})}
							</ul>
						</div>

						<div className='flex items-center gap-[20px]'>
							<p className='text-gray-500'>Quantity: </p>
							<div className='flex items-center'>
								<button className='bg-lightGray text-gray-500 px-[10px] py-[4px] border border-gray-500'>
									-
								</button>
								<span className='bg-lightGray text-gray-500 px-[20px] py-[4px] border border-gray-500'>
									{countProduct}
								</span>
								<button className='bg-lightGray text-gray-500 px-[10px] py-[4px] border border-gray-500'>
									+
								</button>
							</div>
						</div>

						<div className='flex items-center mt-[30px gap-[20px]'>
							<Link
								to={'/cart'}
								className='bg-mainYellow text-textWhite px-[26px] py-[12px] rounded-lg
								'
								onClick={handleProductCart}>
								Add to chart
							</Link>
							<div className='bg-[#eee] p-[10px] rounded-full'>
								
								{favoriteIdIcon === parseInt(id) ? (
									<FaHeart
										color='red'
										size={30}
										onClick={() =>
											dispatch(updateFavoriteAction(singleProduct))
										}
									/>
								) : (
									<FaHeart
										size={30}
										onClick={() =>
											dispatch(updateFavoriteAction(singleProduct))
										}
									/>
								)}
							</div>
						</div>
						<hr className='my-[20px]' />
						<div className='flex items-center gap-[10px]'>
							<FaTruckFast />
							<span>{singleProduct.shippingInformation}</span>
						</div>

						<p className='font font-semibold text-gray-500'>
							{singleProduct.returnPolicy}
						</p>
					</div>
				</div>
			) : (
				<div>Is Loading</div>
			)}
		</div>
	);
}

export default SingleProductPage;
