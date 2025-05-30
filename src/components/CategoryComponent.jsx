import React, { useEffect } from 'react';
import CategoryService from '../services/CategoryServices';
import { useState } from 'react';

function CategoryComponent() {
	const [allCategory, setAllCategory] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		CategoryService.getAllCategory()
			.then((res) => {
				setAllCategory(res.data);
				setIsLoading(true);
			})
			.catch((err) => console.log(err));
	});

	return (
		<div className='bg-lightGray flex items-center h-[70px]'>
			<div className='container mx-auto flex items-center gap-[20px]'>
				<button className='bg-mainBlue px-[20px] py-[10px] text-textWhite rounded-lg '>Show category</button>

				{isLoading ? <div>Category</div> : <div>Is Loading</div>}
			</div>
		</div>
	);
}

export default CategoryComponent;
