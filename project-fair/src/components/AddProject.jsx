import React, { useContext, useEffect, useState } from 'react'
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { Bounce, Slide, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectApi } from '../Services/allApi';
import { addProjectResponseContext } from '../contextApi/ContextShare';

function AddProject() {
  const {addProjectResponse,setAddProjectResponse}=useContext(addProjectResponseContext)

  const [show, setShow] = useState(false);

  const handleClose = () => {setShow(false)
    setprojectData({
       title:"",laguages:"",overview:"",github:"",website:"",projectImage:""
    })
    setPreview("")
  }
  const handleShow = () => setShow(true);
  // state for adding projects
  const[projectData,setprojectData]=useState({
    title:"",laguages:"",overview:"",github:"",website:"",projectImage:""
  })
  const [preview,setPreview]=useState("")
  const [fileStatus,setFileStatus]=useState(false)

  useEffect(()=>{
    if(projectData.projectImage.type=='image/png'.toLocaleUpperCase() || projectData.projectImage.type=="image/jpg".toLocaleUpperCase() || projectData.projectImage.type=="image/jpeg"){
      // console.log('generate url')
      setFileStatus(false)
      setPreview(URL.createObjectURL(projectData.projectImage))
    }else{
      // console.log('provide image file img/jpg/jpeg')
      setFileStatus(true)
      setprojectData({...projectData,projectImage:""})
    }
  },[projectData.projectImage])

  // console.log(preview)

  // console.log(projectData)

  const handleAddProject=async()=>{
    const{title,laguages,overview,github,website,projectImage}=projectData
    if(!title || !laguages || !overview || !github || !website || !projectImage){
      toast.info("please add missing fields")
    }else{
      //form data
      const reqBody=new FormData()
    reqBody.append("title",title)
    reqBody.append("laguages",laguages)
    reqBody.append("overview",overview)
    reqBody.append("github",github)
    reqBody.append("website",website)
    reqBody.append("projectImage",projectImage)

    const token=sessionStorage.getItem('token')

    if(token){
      const reqHeader={
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
      }

      // Api call
      try {
        const result=await addProjectApi(reqBody,reqHeader)
        console.log(result)
        if(result.status==200){
          toast.success("project uploaded successfully")
          handleClose()
          setAddProjectResponse(result.data)
        }else{
          toast.warning(result.response.data)
        }
      } catch (error) {
        console.log(err)
      }
    }
    }
    
  }


  return (
    <>
      <Button variant="info me-2 rounded" onClick={handleShow}>
        Add Project
      </Button>

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
                <img style={{ height: '350px', width: '100%' }} src={preview?preview:
                  "https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg"} alt="" />
              </label>
             {fileStatus&& <div className="mb-3 text-danger">please upload png/jpg/jpeg</div>}
            </div>
            <div className="col-6">
              <Form>
               <div className="mb-2">
               <FloatingLabel controlId="floatingTitle" label="Project-Title">
                  <Form.Control onChange={e=>setprojectData({...projectData,title:e.target.value})} type="text" placeholder="Enter Your Project Title" />
                </FloatingLabel>
               </div>
               <div className="mb-2">
               <FloatingLabel controlId="floatingLanguage" label="language-used">
                  <Form.Control onChange={e=>setprojectData({...projectData,laguages:e.target.value})} type="text" placeholder="Enter Language used" />
                </FloatingLabel>
               </div>
               <div className="mb-2">
               <FloatingLabel controlId="floatingOverview" label="project-overview">
                  <Form.Control onChange={e=>setprojectData({...projectData,overview:e.target.value})} type="text" placeholder="Overview" />
                </FloatingLabel>
               </div>
               <div className="mb-2">
               <FloatingLabel controlId="floatingGit" label="Github">
                  <Form.Control onChange={e=>setprojectData({...projectData,github:e.target.value})} type="text" placeholder="Github Link" />
                </FloatingLabel>
               </div>
               <div className="mb-2">
               <FloatingLabel controlId="floatingWeb" label="Website">
                  <Form.Control onChange={e=>setprojectData({...projectData,website:e.target.value})} type="text" placeholder="Website Link" />
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
          <Button variant="success" onClick={handleAddProject}>Upload</Button>
        </Modal.Footer>
        <ToastContainer autoClose={2000} theme='colored' transition={Slide}/>
      </Modal>

      
    </>
  )
}

export default AddProject
