
import Image from 'next/image.js';
import { notFound } from 'next/navigation.js';
import React from 'react'

export default async function ProductDetails({params}) {

   const { productSlug } = await params ;
   const productDetails = await fetch(`https://store-app-back-end.vercel.app/api/v1/products/${productSlug}`) ;
   const { product } = await productDetails.json() ;
   if (!product) return notFound() ;


   return ( 
      <div className='container'>
         <div className="row">
            <div className="col-md-12 text-center">
               <Image src={product.imgCover?.secure_url} alt="product" width={300} height={300}/>
               <h4>{product.name}</h4>
               <h4>{product.slug}</h4>
               <h4>{product.quantity}</h4>
               <h4>{product.description}</h4>
            </div>
         </div>
      </div>
   )
}
