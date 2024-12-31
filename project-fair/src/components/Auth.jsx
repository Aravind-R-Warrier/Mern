import React, { useContext, useState } from 'react'
import { Form } from 'react-bootstrap'
import {  Link, useNavigate } from 'react-router'
 import { Bounce, Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginApi, registerApi } from '../Services/allApi';
import { tokenAuthContext } from '../contextApi/TokenAuth';


function Auth({register}) {

    const isRegisterdForm=register?true:false
    const [userData,setUserData]=useState({
      username:"",email:"",password:""
    })
    const navigate=useNavigate()
    
    // context checking login trueOrfalse
    const{isAuthorised,setIsAuthorised}=useContext(tokenAuthContext)
   
    // register function
    const handleRegister=async(e)=>{
      e.preventDefault()
      const{username,email,password}=userData
      
      if(!username || !email || !password){
        toast.info('please fill missing fields')
      }else{
        // api call
        const result=await registerApi(userData)
        console.log(result)
        if(result.status==200){
          toast.success(`${result.data.username} successFully registered`)
          navigate('/login')
          setUserData({username:"",email:"",password:""})
        }else{
          toast(result.response.status)
        }
      }
    }
    // login function
    const handelLogin=async(e)=>{
      e.preventDefault()
      const {email,password}=userData
      if(!email || !password){
        toast.info("please fill missing fields")
      }else{
        try{
          //api call
          const result=await loginApi({email,password})
          if(result.status==200){
            sessionStorage.setItem("username",result.data.existingUser.username)
            sessionStorage.setItem("token",result.data.token)
            navigate('/')
            setUserData({username:"",email:"",password:""})
            setIsAuthorised(true)

          }else{
            toast.warning(result.response.data)
          }

        }catch(err){
          console.log(err)
        }
      }

    }



  return (
    <>
      <div className="d-flex justify-content-center align-items-center">
        <div className="w-75 container">
            <Link to={'/'} style={{color:'magenta', fontWeight:'bolder',textDecoration:'none'} }><i class="fa-solid fa-arrow-left me-2"></i> Back To Home</Link>
            <div className="card shadow p-5 bg-primary mt-5">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <img src="https://giveitgetit.org/wp-content/uploads/2024/01/Creating-Secure-Passwords.png" width={'100%'} className='rounded-start' />
                    </div>
                    <div className="col-6">
                        <div className="d-flex align-items-center flex-column">
                            <h1 className='fw-bolder text-light mt-2'>
                            <i class="fa-solid fa-list-check me-2"></i>Project Fair
                            </h1>
                            <h5 className='text-light fw-bolder text-center'>
                                {
                                    isRegisterdForm?'Sign Up To Your Account':'Sign In To Your Account'
                                }
                            </h5>
                        </div>
                        <Form className='text-light w-100'>
                            {
                                isRegisterdForm &&
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInputName">
                                <Form.Control type="text" placeholder="Enter Username" onChange={(e)=>setUserData({...userData,username:e.target.value})} value={userData.username}/>
                              </Form.Group>
                              
                            }
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInputemail">
                                <Form.Control type="email" placeholder="Enter Your Email"  onChange={(e)=>setUserData({...userData,email:e.target.value})} value={userData.email}/>
                              </Form.Group>

                              <Form.Group className="mb-3" controlId="exampleForm.ControlInputpswd">
                                <Form.Control type="password" placeholder="Enter password"  onChange={(e)=>setUserData({...userData,password:e.target.value})} value={userData.password}/>
                              </Form.Group>


                              {
                                isRegisterdForm?
                                <div className="mt-3">
                                    <button className='btn btn-warning text-light' onClick={handleRegister}>Register</button>
                                    <p className='mt-2 fw-bolder'>Already have An Account Click here to<Link style={{color:'red',textDecoration:'none'}} to={'/login'}> Login</Link></p>
                                </div>:
                                 <div className="mt-3">
                                 <button className='btn btn-warning text-light' onClick={handelLogin}>Login</button>
                                 <p className='mt-2 fw-bolder'>New User? Click here to <Link style={{color:'red',textDecoration:'none'}} to={'/register'}>Register</Link></p>
                             </div>

                              }
                        </Form>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <ToastContainer autoClose={2000} theme='colored' transition={Slide}/>
    </>
  )
}

export default Auth
