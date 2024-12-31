import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import ProjectCard from '../components/ProjectCard'
import { getAllProjectApi } from '../Services/allApi'

function Projects() {
      const[allProjects,setAllProjects]=useState([])
      const [searchKey,setSeachKey]=useState("")
      // console.log(searchKey)
      
    const getAllProjects=async()=>{

      const token=sessionStorage.getItem('token')

    if(token){
      const reqHeader={
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
      }
      const response=await getAllProjectApi(reqHeader,searchKey)
      if(response.status==200){
        setAllProjects(response.data)
      }else{
        console.log(response)
      }
      
    }
  }

    useEffect(()=>{
      getAllProjects()
    },[searchKey])
    // console.log(allProjects)

  return (
    <>
     <Header/> 
     <div className="projects mt-5">
      <h1 className="text-center mb-5">
        All Projects
      </h1>
      <div className="d-flex justify-content-center align-items-center">
        <div className="d-flex border w-50 rounded mb-3">
          <input onChange={e=>setSeachKey(e.target.value)} type="text" className='form-control' placeholder='search by technologies'/>
          <i style={{marginLeft:'-50px'}} class="fa-solid fa-magnifying-glass fa-rotate-90"></i>
        </div>
      </div>
     </div>


     <Row className="mt-5 container-fluid">
      {allProjects?.length>0?allProjects.map((project)=>(
<Col sm={12} md={8} lg={4}>
      <ProjectCard project={project}/>
      </Col>
      )):<p className='text-warning  '>Nothing to display</p>
    }
     </Row>
    </>
  )
}

export default Projects
