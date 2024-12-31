import React, { useContext, useEffect, useState } from 'react'
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { Slide, toast, ToastContainer } from 'react-toastify';
import { server_Url } from '../Services/serverUrl';
import { updateProjectApi } from '../Services/allApi';
import { editProjectResponseContext } from '../contextApi/ContextShare';



function EditProject({project}) {
  const{editProjectResponse,setEditProjectResponse}=useContext(editProjectResponseContext)
    const[show, setShow] = useState(false);

    const handleClose = () => setShow(false)
    const handleShow = () => {setShow(true);
        setprojectData({
            id: project?._id ,title:project?.title,laguages:project?.laguages,overview:project?.overview,github:project?.github,website:project?.website,projectImage:""

        })
}
     const[projectData,setprojectData]=useState({
      id: project?._id ,title:project?.title,laguages:project?.laguages,overview:project?.overview,github:project?.github,website:project?.website,projectImage:""
      })
      const[preview,setPreview]=useState("")    

      useEffect(()=>{
        if(projectData?.projectImage){
            setPreview(URL.createObjectURL(projectData.projectImage))
        }else{
            setPreview("")
        }
      },[projectData.projectImage])


      const handeleUpdate=async()=>{
        const{id,title,laguages,overview,github,website,projectImage}=projectData
            if(!title || !laguages || !overview || !github || !website ){
              toast.info("please add missing fields")
            }else{
               //form data
      const reqBody=new FormData()
      reqBody.append("title",title)
      reqBody.append("laguages",laguages)
      reqBody.append("overview",overview)
      reqBody.append("github",github)
      reqBody.append("website",website)
      preview?reqBody.append("projectImage",projectImage):reqBody.append("projectImage",project.projectImage)
  
      const token=sessionStorage.getItem('token')
  
      if(token){
        const reqHeader={
          "Content-Type":"multipart/form-data",
          "Authorization":`Bearer ${token}`
        }
  
        // Api call
        try {
          const result=await updateProjectApi(id,reqBody,reqHeader)
          console.log(result)
          if(result.status==200){
            handleClose()
            setEditProjectResponse(result.data)
          }else{
            toast.warning(result.response.data)
          }

        } catch (error) {
          console.log(error)
          
        }
            }
          }
      }
    return (
        <div>
            <a className='me-3 btn text-dark' onClick={handleShow}><i class="fa-regular fa-pen-to-square "></i></a>
            <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
      >
        <Modal.Header closeButton>
          <Modal.Title>Project title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-6">
              <label>
                <input type="file" style={{ display: 'none' }} onChange={e=>setprojectData({...projectData,projectImage:e.target.files[0]})}/>
                <img style={{ height: '350px', width: '100%' }} src={preview?preview:`${server_Url}/uploads/${project?.projectImage}`} alt="" />
              </label>
            </div>
            <div className="col-6">
              <Form>
               <div className="mb-2">
               <FloatingLabel controlId="floatingTitle" label="Project-Title">
                  <Form.Control  type="text" placeholder="Enter Your Project Title" value={projectData.title} onChange={e=>setprojectData({...projectData,title:e.target.value})}/>
                </FloatingLabel>
               </div>
               <div className="mb-2">
               <FloatingLabel controlId="floatingLanguage" label="language-used">
                  <Form.Control type="text" placeholder="Enter Language used"  value={projectData.laguages} onChange={e=>setprojectData({...projectData,laguages:e.target.value})}/>
                </FloatingLabel>
               </div>
               <div className="mb-2">
               <FloatingLabel controlId="floatingOverview" label="project-overview">
                  <Form.Control  type="text" placeholder="Overview"  value={projectData.overview} onChange={e=>setprojectData({...projectData,overview:e.target.value})}/>
                </FloatingLabel>
               </div>
               <div className="mb-2">
               <FloatingLabel controlId="floatingGit" label="Github">
                  <Form.Control  type="text" placeholder="Github Link"  value={projectData.github} onChange={e=>setprojectData({...projectData,github:e.target.value})}/>
                </FloatingLabel>
               </div>
               <div className="mb-2">
               <FloatingLabel controlId="floatingWeb" label="Website">
                  <Form.Control  type="text" placeholder="Website Link"  value={projectData.website} onChange={e=>setprojectData({...projectData,website:e.target.value})}/>
                </FloatingLabel>
               </div>
              </Form>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            cancel
          </Button>
          <Button variant="success" onClick={handeleUpdate}>Update</Button>
        </Modal.Footer>
        <ToastContainer autoClose={2000} theme='colored' transition={Slide}/>
      </Modal>

        </div>
    )
}

export default EditProject
