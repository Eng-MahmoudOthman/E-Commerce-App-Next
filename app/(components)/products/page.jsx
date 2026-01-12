import React, { Fragment } from 'react' ;
import { getProducts } from '../../lib/api/products.js';
import ProductCard from './ProductCard.jsx';


export const metadata = {
	title: "Products",
	description: "Get All Products From E-Commerce",
};

export default async function Products() {
   const res = await getProducts() ;
   const products = res.products ;
   
   return (
      <Fragment>
         <div className='container'>
            <div className="row">
               {products.map((ele)=> <ProductCard key={ele._id} product={ele}/>)}
            </div>
         </div>
      </Fragment>
   )
}
