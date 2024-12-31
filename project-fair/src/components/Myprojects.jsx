import React, { useContext, useState } from 'react'
import AddProject from './AddProject'
import { useEffect } from 'react'
import { deleteProjectApi, getUserProjectApi } from '../Services/allApi'
import { addProjectResponseContext, editProjectResponseContext } from '../contextApi/ContextShare'
import EditProject from './EditProject'
import { ToastContainer } from 'react-bootstrap'
import { Slide, toast } from 'react-toastify'


function Myprojects() {
      const{editProjectResponse,setEditProjectResponse}=useContext(editProjectResponseContext)
      const {addProjectResponse,setAddProjectResponse}=useContext(addProjectResponseContext)
    const [allProjects, setAllProjects] = useState([])

    const getAllMyProjects = async () => {
       const token=sessionStorage.getItem('token')
       
           if(token){
             const reqHeader={
               "Content-Type":"multipart/form-data",
               "Authorization":`Bearer ${token}`
             }
             const response=await getUserProjectApi(reqHeader)
             
             if(response.status==200){
               setAllProjects(response.data)
             }else{
               console.log(response)
             }
             
           }

    }

    const handeleDelete=async (pid) => {
        const token=sessionStorage.getItem('token')
       
           if(token){
             const reqHeader={
               "Content-Type":"multipart/form-data",
               "Authorization":`Bearer ${token}`
             }

            //  api call
            try {
                const result=await deleteProjectApi(pid,reqHeader)
                if(result.status==200){
                     toast.success("project Deleted")
                     getAllMyProjects()
                }else{
                    toast.warning(result.response.data)
                }
            } catch (error) {
                console.log(error)
            }

            }

    }

    useEffect(() => {
        getAllMyProjects()
    }, [addProjectResponse,editProjectResponse])

   
   


    return (
        <div>
            <div className="card mt-5 shadow" style={{marginBottom:"60px"}}>
                <div className="container-fluid p-3">
                    <h1 className="fw-bolder text-black">
                        My-Projects
                    </h1>
                </div>
                <div className="ms-auto">
                    <AddProject />
                </div>
               {allProjects?.length>0?allProjects.map((project)=>(
                <div>
                <div className="mt-4 border p-3 ">
                    <h2 className='fw-bolder text-danger'>{project?.title}</h2>
                </div>
                <div className="ms-auto d-flex align-items-center ">
                    <EditProject project={project}/>
                    <a className='me-3 btn text-dark' href={project?.github}><i class="fa-brands fa-github "></i></a>
                    <button className='btn text-dark' onClick={()=>handeleDelete(project?._id)}><i className='fa-solid fa-trash'></i></button>
                </div>
                </div>
               )):<p className='text-danger'>Nothing To Display</p> }
            </div>
            <ToastContainer autoClose={2000} theme='colored' transition={Slide}/>

        </div>
    )
}

export default Myprojects
