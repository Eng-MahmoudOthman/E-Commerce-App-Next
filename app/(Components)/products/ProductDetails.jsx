'use client' ;


import Image from 'next/image.js';
import React, { Fragment } from 'react';


export default function ProductDetails({product}) {


   return (
      <Fragment>
         <div className="col-md-12 text-center">
            <Image src={product.imgCover?.secure_url} alt="product" width={300} height={300}/>
            <h4>{product.name}</h4>
            <h4>{product.slug}</h4>
            <h4>{product.quantity}</h4>
            <h4>{product.description}</h4>
         </div>
      </Fragment>
   )
}
