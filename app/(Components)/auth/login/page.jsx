import React, { Fragment } from 'react' ;
import Login from './Login.jsx' ;



export const metadata = {
   title: 'Login',
   description: 'موقع تجريبي'
};

export default function page() {
   return (
      <Fragment>
         <Login/>
      </Fragment>
   )
}
