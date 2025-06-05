import React, { useEffect } from 'react';
import ProductService from '../services/ProductService';
import { useDispatch, useSelector } from 'react-redux';
import { saveAllProductAction } from '../store/productSlice';
import CardComponent from '../components/CardComponent';

function HomePage() {
  const {allProducts, isLoading} = useSelector ((state) => state.productStore)

	const dispatch = useDispatch();

	useEffect(() => {
		ProductService.getAllProductsService()
			.then((res) => {
				dispatch(saveAllProductAction(res.data.products));
			})
			.catch((err) => console.log(err));
	}, []);

	return <div>
    {isLoading ? <div>
      {allProducts.map((product) => {
        return <CardComponent key={product.id} product ={product}/>
      })

      }
    </div> : <div>Is Loading</div>}
  </div>;
}

export default HomePage;
