import Link from 'next/link.js'
import React from 'react'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.jsx'

export default function layout({children}) {
   
   return (
      <ProtectedRoute allowedRoles={["admin"]}>
         <div className='row'>
            <div className="col-md-2 bg-body-secondary">
               <ul>
                  <li>
                     <Link href="/dashboard/users">Users</Link>
                  </li>

                  <li>
                     <Link href="/dashboard/products">Products</Link>
                  </li>

                  <li>
                     <Link href="/dashboard/categories">Categories</Link>
                  </li>
               </ul>
            </div>
            <div className="col-md-10 text-center">
               {children}
            </div>
            
         </div>
      </ProtectedRoute>
   )
}
