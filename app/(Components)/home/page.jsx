'use client'
import React, { Fragment } from 'react'

function Home() {
   return (
      <Fragment>
         <section className='vh-100 bg-success'></section>
         <section className='vh-100 bg-danger'></section>
         <section className='vh-100 bg-primary'></section>
         <section className='vh-100 bg-warning'  id='mySec'>
            <h1> My Section Ya Mahmoud </h1>
         </section>
         <section className='vh-100 bg-secondary'></section>
      </Fragment>
   )
}

export default  Home 