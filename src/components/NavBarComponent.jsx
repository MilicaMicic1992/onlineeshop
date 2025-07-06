import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

//icons
import { CiUser, CiHeart, CiShoppingCart } from 'react-icons/ci';

//clerk
import {
	SignedIn,
	SignedOut,
	SignInButton,
	UserButton,
} from '@clerk/clerk-react';
import { useEffect, useState } from 'react';

function NavBarComponent() {
	const [totalProductSL, setTotalProductSL] = useState(0);
	//let totalProduct = JSON.parse(localStorage.getItem('cart_total'))
	const { totalProduct} = useSelector((state) => state.cartStore);
	const {favoriteTotal} = useSelector ((state) => state.favoriteStore)


	useEffect(() => {
		let isTotal = JSON.parse(localStorage.getItem('cart_total'));

		if(isTotal){
			setTotalProductSL(isTotal)
		}else{
			setTotalProductSL(0);
		}
	}, [totalProduct]);

	return (
		<div className='bg-mainBlue h-full lg:h-[100px] flex items-center py-[10px]'>
			<div className='container mx-auto flex justify-between items-center flex-col lg:flex-row gap-[10px]'>
				<Link to='/'>
					<img src={logo} className='w-[100px]' alt='logo' />
				</Link>

				{/*seatrchbar */}
				<div className='bg-textWhite rounded-[20px]'>
					<input
						type='text'
						placeholder='Search..'
						className='bg-transparent outline-none px-[20px] py-[15px] rounded-[20px] placeholder:text-mainYellow text-mainBlue'
					/>
					<button className='bg-mainYellow text-textWhite px-[30px] py-[15px] rounded-[20px]'>
						Search
					</button>
				</div>

				{/*Login sistem, cart/favorite */}

				<div className='flex items-center gap-[10px]'>
					<div className='flex items-center gap-[5px]'>
						<CiUser color='white' size={25} />
						<SignedOut>
							<SignInButton />
						</SignedOut>
						<SignedIn>
							<UserButton showName />
						</SignedIn>
				</div>

					<div className='flex items-center gap-[5px]'>
						<CiHeart color='white' size={25} />
						<span className='bg-mainYellow text-textWhite rounded-full w-[20px] h-[20px] flex items-center justify-center'>
							{favoriteTotal}
						</span>
						<Link to='/favorite' className='text-textWhite text-[18px]'>
							Favourite
						</Link>
					</div>

					<div className='flex items-center gap-[5px]'>
						<CiShoppingCart color='white' size={25} />
						<span className='bg-mainYellow text-textWhite rounded-full w-[20px] h-[20px] flex items-center justify-center'>
							{totalProductSL}
						</span>
						<Link to='/cart' className='text-textWhite text-[18px]'>
							Cart
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default NavBarComponent;
