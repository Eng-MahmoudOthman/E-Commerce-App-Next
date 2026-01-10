'use client';
import Image from 'next/image.js';
import Link from 'next/link.js';
import React, { Fragment } from 'react'

export default function ProductCard({product}) {
   return (
      <Fragment>
         <div className="col-md-3">
            <div className='p-2'>
               <Link href={`/products/${product.slug}`}> 
                  <Image src={product.imgCover?.secure_url} alt="product" width={300} height={300}/>
                  <h5 className='text-center fw-bold my-2'>{product.name}</h5>
               </Link>
            </div>
         </div>
      </Fragment>
      
   )
}
