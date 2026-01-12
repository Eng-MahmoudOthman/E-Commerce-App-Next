'use client'

import { useFormik } from "formik";
import { Fragment, useContext, useState } from "react";
import * as Yup from 'yup';
import style from "./login.module.css";
import Link from "next/link";
import { AuthContext } from "../../../context/AuthProvider.jsx";
import { useRouter } from "next/navigation";

export default function Login() {
   const router = useRouter();
   const {user, login , error , loading } = useContext(AuthContext) ;
   const [loadingGoogle , setLoadingGoogle] = useState(false);
   const [showPassword, setShowPassword] = useState(false);


   async function submitLogin (values , { resetForm }){
      const data = await login(values) ;
      resetForm() ; // Reset Form
      if(data.user?.role === "user"){
         router.push('/') ; // Client Side Redirect
      }else if(data.user?.role === "admin"){
         router.push('/dashboard/users') ; // Client Side Redirect
      }
   }

   const validationSchema = Yup.object({
      userAccount:Yup.string().required("Email or Phone Number is Required").trim() ,
      password:Yup.string().required("Password is Required").matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%&*]).{8,}$/,"Password must contain at least 8 characters, including uppercase, lowercase, a number, and a special character (@#$%&*)") ,
      rememberMe:Yup.boolean().oneOf([true , false]).default(false)
   });

   const formik = useFormik({
      initialValues: {
         userAccount: "",
         password: "",
         rememberMe: false,
      },
      validationSchema,
      onSubmit: submitLogin
   });

   const handleClick = () => {
      setLoadingGoogle(true);
   };

   return (
      <Fragment>
         <div className={`container-fluid ${style.login_container}`}>
         <div className="row">
            <div className="col-lg-8 offset-lg-2 p-0">
               <div className=" w-100 p-3">
               
               <h1 className="main-header">تسجيل الدخول</h1>
               <p className="sub-title text-center">
                  برجاء إدخال البريد الألكترونى او رقم التليفون وكلمة المرور
               </p>

               <form onSubmit={formik.handleSubmit}>

                  {error ? <p className="text-danger">{error}</p> : ""}

                  <div className="my-4 position-relative">
                     <i className="fas fa-user icon-input-field"></i>
                     <label htmlFor="userAccount" className="form-label required">
                        يرجى إدخال البريد الالكترونى او رقم التليفون
                     </label>

                     <input
                        type="text"
                        id="userAccount"
                        name="userAccount"
                        className="form-control"
                        value={formik.values.userAccount}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="البريد الالكترونى او رقم التليفون"
                        autoComplete="username"
                        required
                     />

                     {formik.errors.userAccount && formik.touched.userAccount ?
                        <p className="text-danger">{formik.errors.userAccount}</p>
                        :
                        <p className="text-success m-0 p-0">يرجى إدخال البيانات الصحيحة</p>
                     }
                  </div>


                  <div className="my-4 position-relative">
                     <i className="fas fa-lock icon-input-field"></i>
                     <label htmlFor="password" className="form-label required">
                        إدخال كلمة المرور للمستخدم
                     </label>

                     <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        name="password"
                        className="form-control"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="كلمة المرور"
                        autoComplete="current-password"
                        required
                        onCopy={(e)=>e.preventDefault()}
                        onPaste={(e)=>e.preventDefault()}
                        onCut={(e)=>e.preventDefault()}
                        onContextMenu={(e)=>e.preventDefault()}
                     />

                     {formik.errors.password && formik.touched.password ?
                        <p className="text-danger">{formik.errors.password}</p>
                        :
                        <p className="text-success m-0 p-0">يرجى إدخال البيانات الصحيحة</p>
                     }

                     {showPassword ?
                        <i className="fas fa-eye toggle-password" onClick={()=>setShowPassword(false)}></i>
                        :
                        <i className="fas fa-eye-slash toggle-password" onClick={()=>setShowPassword(true)}></i>
                     }
                  </div>


                  <div className="form-check my-4 d-flex justify-content-end">
                     <input
                     type="checkbox"
                     id="rememberMe"
                     name="rememberMe"
                     className="form-check-input ms-2"
                     checked={formik.values.rememberMe}
                     onChange={formik.handleChange}
                     onBlur={formik.handleBlur}
                     />
                     <label htmlFor="rememberMe" className="form-check-label mx-4 main-color">
                     Remember Me
                     </label>
                  </div>


                  <div className="d-grid gap-2 col-8 mx-auto">

                     {loading ?
                     <button className="btn bg-main text-white mt-2">
                        <i className="fa-solid fa-spinner fa-spin fa-xl"></i>
                     </button>
                     :
                     <button
                        disabled={!(formik.isValid && formik.dirty)}
                        type="submit"
                        className="btn bg-main mt-2"
                     >
                        تسجيل الدخول
                     </button>
                     }

                     <div className="row">
                     <div className="col-md-6">
                        <p className={`${style.register_text} text-center mt-1`}>
                           Create your account?
                           <Link className="m-1 main-color" href="/auth/register">
                              إنشاء حساب
                           </Link>
                        </p>
                     </div>

                     <div className="col-md-6">
                        <p className={`${style.register_text} text-center mt-1`}>
                           <Link className="m-1 main-color" href="/ForgetPassword">
                              <i className="fa-solid fa-lock me-2"></i>
                              نسيت كلمة المرور ؟
                           </Link>
                        </p>
                     </div>
                     </div>
                  </div>

               </form>

               <div className="position-relative">
                  <hr/>
                  <span className={style.separator}>OR</span>
               </div>

               <div className="row">
                  <div className="col-md-6 offset-md-3">

                     {loadingGoogle ?
                     <button className="btn bg-main w-100">
                        <i className="fa-solid fa-spinner fa-spin fa-xl"></i>
                     </button>
                     :
                     <button
                        onClick={handleClick}
                        className={style.btnLoginGoogle}
                     >
                        Login With Google
                     </button>
                     }

                  </div>
               </div>

               </div>
            </div>
         </div>
         </div>
      </Fragment>
   );
}
