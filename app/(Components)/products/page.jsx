import React, { Fragment } from 'react'
import { getProducts } from '../../lib/api/products.js';
import ProductCard from '../productCard/productCard.jsx';



export default async function Products() {
   const res = await getProducts() ;
   console.log(res);
   
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
