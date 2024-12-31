import React, { useState } from 'react'
import { Card, Col, Modal, Row } from 'react-bootstrap'
import propic from '../assets/images/pro.webp'
import { server_Url } from '../Services/serverUrl';

function ProjectCard({project}) {
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Card style={{ width: '18rem' }}className='shadow rounded mt-3 mb-5'>
      <Card.Img variant="top" src={`${server_Url}/uploads/${project?.projectImage}`} width={'100%'}  onClick={handleShow}/>
      <Card.Body>
        <Card.Title className='text-black text-center'>{project?.title}</Card.Title>
      </Card.Body>
    </Card>

    <Modal 
    show={show} 
    onHide={handleClose}
    size='lg'
    backdrop={'static'}
    keyboard={false}
    >
        <Modal.Header closeButton>
          <Modal.Title>{project?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
           <img  src={`${server_Url}/uploads/${project?.projectImage}`} width={'100%'} />
            </Col>
            <Col>
            <h2 className='fw-bolder text-light'>{project?.title}/</h2>
            <h5><span className='text-warning'>Languages Used</span>:{project?.laguages}</h5>
            <p className='fw-bolder'>
              <span className='text-info'>OverView:</span>
              {project?.overview}
            </p>
            </Col>
            <div className='mt-3'>
              <a href={project?.github} target='_blank' className='me-3 btn text-dark'><i class="fa-brands fa-github fs-2"></i></a>
              <a href={project?.website} target='_blank' className='me-3 btn text-dark'><i class="fa-solid fa-link fs-2"></i></a>
            </div>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default ProjectCard
