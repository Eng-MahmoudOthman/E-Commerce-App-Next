import Link from 'next/link.js'
import React from 'react'

export default function layout({children}) {
   
   return (
      <div className='row'>
         <div className="col-md-2 bg-body-secondary">
            <ul>
               <li>
                  <Link href="/categories/fashion">Fashion</Link>
               </li>

               <li>
                  <Link href="/categories/electronics">Electronics</Link>
               </li>
            </ul>
         </div>
         <div className="col-md-10 text-center">
            {children}
         </div>
         
      </div>
   )
}
