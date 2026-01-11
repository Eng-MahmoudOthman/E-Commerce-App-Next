
import { notFound } from 'next/navigation.js';
import React from 'react'
import ProductDetails from '../ProductDetails.jsx';

export default async function page({params}) {

   const { productSlug } = await params ;
   const productDetails = await fetch(`https://store-app-back-end.vercel.app/api/v1/products/${productSlug}`) ;
   const { product } = await productDetails.json() ;
   if (!product) return notFound() ;


   return ( 
      <div className='container'>
         <div className="row">
            <ProductDetails product={product}/>
         </div>
      </div>
   )
}
