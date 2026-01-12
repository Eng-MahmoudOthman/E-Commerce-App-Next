
import React, { Fragment } from 'react' ;
import Register from './Register.jsx' ;



export const metadata = {
   title: 'Register',
   description: 'موقع تجريبي'
};

export default function page() {
   return (
      <Fragment>
         <Register/>
      </Fragment>
   )
}
