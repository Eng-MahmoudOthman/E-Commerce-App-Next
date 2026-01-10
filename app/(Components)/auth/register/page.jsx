'use client' ;

import { useFormik } from "formik" ;
import { Fragment , useContext, useState } from "react";
import Link from "next/link.js";
import * as Yup from 'yup';
import { AuthContext } from "../../../context/AuthProvider.jsx";
import { useRouter } from "next/navigation";
import style from "./register.module.css" ;
import ToastProvider from "../../ToastProvider/ToastProvider.jsx";


export default function Register(){
   const router = useRouter();
   const {register , error , loading } = useContext(AuthContext) ;
   const [showPassword, setShowPassword] = useState(false);


   async function submitRegister(values, {resetForm}){
      await register(values) ;
      console.log(values) ;
      resetForm() ; // Reset Form
      router.push('/auth/login') ; // Client Side Redirect
   }


   const validationSchema = Yup.object().shape({
      name:Yup.string().min(2 , "Name Should be More than 2").max(50 , "Name less than 50").required("Name is Required").trim() ,
      email:Yup.string().email().required().trim() ,
      gender: Yup.string().oneOf(['male', 'female'], 'يجب أن يكون النوع male أو female').required('النوع مطلوب') ,
      phone:Yup.string().required().matches(/^01[0125][0-9]{8}$/).trim() ,
      birthDay:Yup.string().required().trim() ,
      password:Yup.string().required().matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]?).{8,}$/ , "Should be Password Start UpperCase And Contain 8 Character And Contain any (@#$%&*)") ,
      rePassword:Yup.string().oneOf([Yup.ref("password")]  , "rePassword Should be Same Password").required() ,
   })



   const formik = useFormik({
      initialValues:{
         name:"" ,
         email:"" ,
         gender:"" ,
         phone:"" ,
         birthDay:"" ,
         password:"" ,
         rePassword:"" ,
      } , validationSchema , 
      onSubmit:submitRegister
   })



   return (
      <Fragment>
         <div className={`${style.registerContainer} p-3 m-auto mt-5`}>

            <h1 className="main-header">إنشاء حساب جديد</h1>
            <div className="row">
               <div className="col-md-8 offset-md-2">
                  <form action="" onSubmit={formik.handleSubmit}>
                     {error?<div className="text-danger mt-2">{error}</div> :""}

                     <div className="my-4 position-relative">
                        <i className="fas fa-user icon-input-field"></i>
                        <label htmlFor="name" className="form-label required">Enter User Name</label>
                        <input type="text" 
                           value={formik.values.name}
                           onChange={formik.handleChange} 
                           onBlur={formik.handleBlur}
                           className="form-control inputFormStyle" id="name"  
                           name="name" 
                           required
                           placeholder="اسم المستخدم ثلاثى" />
                        {formik.errors.name && formik.touched.name?<div className="text-danger m-0 p-0">{formik.errors.name}</div> :""}
                     </div>


                     <div className="my-4 position-relative">
                        <i className="fa-solid fa-envelope-circle-check icon-input-field"></i>
                        <label htmlFor="email" className="form-label required">Enter User Email</label>
                        <input type="email" 
                           value={formik.values.email}
                           onChange={formik.handleChange} 
                           onBlur={formik.handleBlur}
                           className="form-control inputFormStyle" id="email"  
                           name="email" 
                           required
                           placeholder=" البريد الإلكترونى" />
                        {formik.errors.email  && formik.touched.email?<div className="text-danger m-0 p-0">{formik.errors.email}</div> :""}
                     </div>


                     <div className="my-4 position-relative">
                        <i className="fa-solid fa-mobile-screen-button icon-input-field"></i>
                        <label htmlFor="phone" className="form-label required">Enter User Phone</label>
                        {/* <input type="tel"  */}
                        <input type="text" 
                           value={formik.values.phone}
                           onChange={formik.handleChange} 
                           onBlur={formik.handleBlur}
                           className="form-control inputFormStyle" id="phone"  
                           name="phone" 
                           required
                           placeholder="01X XXX XXX XX" />
                        {formik.errors.phone && formik.touched.phone?<div className="text-danger m-0 p-0">{formik.errors.phone}</div> :""}
                     </div>


                     <div className="my-4 position-relative">
                        <i className="fa-solid fa-cake-candles icon-input-field"></i>
                        <label htmlFor="birthDay" className="form-label required">Enter User Birth date</label>
                        {/* <input type="tel"  */}
                        <input type="date" 
                           value={formik.values.birthDay}
                           onChange={formik.handleChange} 
                           onBlur={formik.handleBlur}
                           className="form-control inputFormStyle" id="birthDay"  
                           name="birthDay" 
                           required
                           placeholder="xxxx-xx-xx" />
                        {formik.errors.birthDay && formik.touched.birthDay?<div className="text-danger m-0 p-0">{formik.errors.birthDay}</div> :""}
                     </div>


                     <div >
                        <label className="form-check-label required" htmlFor="gender">Enter User Gender</label>
                        <div id="gender">
                           <div className="form-check form-check-inline">
                              <input className="form-check-input" type="radio" 
                                 onChange={formik.handleChange} 
                                 onBlur={formik.handleBlur}
                                 value="male"
                                 id="male"
                                 name="gender" />
                              <label className="form-check-label" htmlFor="male">ّذكر </label>
                                 {formik.errors.gender && formik.touched.gender?<div className="alert alert-danger mt-4 p-2">{formik.errors.gender}</div> :""}
                           </div>


                           <div className="form-check form-check-inline mx-5">
                              <input className="form-check-input" type="radio" 
                                 onChange={formik.handleChange} 
                                 onBlur={formik.handleBlur}
                                 value="female"
                                 id="female"
                                 name="gender" />
                              <label className="form-check-label" htmlFor="female">أنثى</label>
                                 {formik.errors.gender && formik.touched.gender?<div className="alert alert-danger mt-4 p-2">{formik.errors.gender}</div> :""}
                           </div>
                        </div>
                     </div>


                     <div className="my-4 position-relative">
                        <i className="fas fa-lock icon-input-field"></i>
                        <label htmlFor="password" className="form-label required">Enter Password</label>
                        <input type={showPassword ? "text" : "password"} 
                           value={formik.values.password}
                           onChange={formik.handleChange} 
                           onBlur={formik.handleBlur}
                           className="form-control inputFormStyle" id="password"  
                           name="password" 
                           required
                           autoComplete="new-password"
                           placeholder="كلمة المرور" 
                           
                           /** ==== Prevent Copy , Cut , paste , Right Click ==== */
                           onCopy={(e) => e.preventDefault()}
                           onPaste={(e) => e.preventDefault()}
                           onCut={(e) => e.preventDefault()}
                           onContextMenu={(e) => e.preventDefault()}
                        />
                        {formik.errors.password && formik.touched.password?<div className="text-danger m-0 p-0">{formik.errors.password}</div> :""}

                        {showPassword ? (
                              <i className="fas fa-eye toggle-password togglePasswordStyle" onClick={() => setShowPassword(false)}></i>
                           ) : (
                              <i className="fas fa-eye-slash toggle-password togglePasswordStyle" onClick={() => setShowPassword(true)}></i>
                           )
                        }
                     </div>

                     <div className="my-4 position-relative">
                        <i className="fa-solid fa-unlock-keyhole  icon-input-field"></i>
                        <label htmlFor="rePassword" className="form-label required">Enter Re-Password</label>
                        <input type={showPassword ? "text" : "password"} 
                           value={formik.values.rePassword}
                           onChange={formik.handleChange} 
                           onBlur={formik.handleBlur}
                           className="form-control inputFormStyle" id="rePassword"  
                           name="rePassword" 
                           required
                           autoComplete="new-password"
                           placeholder="تأكيد كلمة المرور" 
                           
                           /** ==== Prevent Copy , Cut , paste , Right Click ==== */
                           onCopy={(e) => e.preventDefault()}
                           onPaste={(e) => e.preventDefault()}
                           onCut={(e) => e.preventDefault()}
                           onContextMenu={(e) => e.preventDefault()}
                           />
                        {formik.errors.rePassword && formik.touched.rePassword?<div className="text-danger m-0 p-0">{formik.errors.rePassword}</div> :""}
                     </div>



                     <div className="d-grid gap-2 col-8 mx-auto">
                        {loading ? 
                              <button className="btn bg-main text-white mt-2"> <i className="fa-solid fa-spinner fa-spin fa-rotate-180 fa-xl"></i></button>
                           : 
                              <button disabled={!(formik.isValid && formik.dirty)} type="submit" className="btn bg-main text-white mt-2">إنشاء حساب</button>
                        }
                        <p className="login-text text-center mt-1">Log in to your account !<Link className="m-2 main-color" href="/">تسجيل الدخول</Link></p>
                     </div>
                     
                  </form>
               </div>
            </div>
         </div>
         <ToastProvider/>
      </Fragment>
   )
} 

