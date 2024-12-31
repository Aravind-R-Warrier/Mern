import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router'
import titleimg from '../assets/images/bio.png.avif'
import ProjectCard from '../components/ProjectCard'
import { toast, ToastContainer } from 'react-toastify'
import { getHomeProjectApi } from '../Services/allApi'

function Home() {
    const[isLoggedIn,setIsLoggedIn]=useState(false)
    const navigate=useNavigate()
    const[allProjects,setAllProjects]=useState([])
    useEffect(()=>{
        getHomeProjects()
        if(sessionStorage.getItem('token')){
            setIsLoggedIn(true)
        }else{
            setIsLoggedIn(false)
        }
    },[])

    const handleProjectPage=()=>{
        if(sessionStorage.getItem('token')){
            navigate('/projects')
        }else{
            toast.warning('please Login for,viewing projects')
        }
    }

    const getHomeProjects=async()=>{
        // api call
        const result=await getHomeProjectApi()
        console.log(result)
        if(result.status==200){
            setAllProjects(result.data)
        }else{
            console.log(result)
        }
    }
    // console.log(allProjects)
    return (
        <>
            <div style={{ height: '90vh', width: '100%' }} className="container-fuild rounded bg-info">
                <Row className='align-items-center p-4'>
                    <Col sm={12} md={6}>
                        <h1 style={{ fontSize: "80px" }} className='fw-bolder text-light mt-5'><i class="fa-solid fa-list-check me-2"></i>Project Fair</h1>
                        <p className='text-light'>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequuntur necessitatibus nostrum, incidunt fugiat ipsam dolorem laborum neque, voluptatibus dicta delectus
                            repellat obcaecati nemo officiis corrupti autem doloremque ad quis ducimus.</p>
                       {isLoggedIn?
                        <Link to={'/dashboard'} className='btn btn-warning'>Manage your projects</Link>:
                        <Link to={'/login'} className='btn btn-warning'>Start To Explore</Link>}
                    </Col>
                    <Col sm={12} md={6}>
                        <img src={titleimg} width={'500px'} className='mt-5' alt="" />
                    </Col>
                </Row>
            </div>

            {/* allprojects */}

            <div className="allproject mt-5">
                <h1 className='text-center text-warning fw-bolder'>Explore Your Projects</h1>
                
                <marquee scrollAmount={15}>
                    <Row>
                       {allProjects?.length>0?allProjects.map((project)=>(
                        <Col key={project.id} sm={12} md={6} lg={4}>
                            <ProjectCard project={project}/>
                        </Col>
                       )):null }
                    </Row>
                </marquee>
            </div>
            <div className='text-center' style={{marginBottom:'100px'}}>
                <p className="btn" onClick={handleProjectPage}>
                    view more projects
                </p>
            </div>
            <ToastContainer theme='colored' autoClose={2000} position='top-center'/> 
        </>
    )
}

export default Home
