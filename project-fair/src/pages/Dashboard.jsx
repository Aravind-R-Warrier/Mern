import Header from '../components/Header'
import { Col, Row } from 'react-bootstrap'
import Myprojects from '../components/Myprojects'
import Profile from '../components/Profile'
import { useEffect, useState } from 'react'

function Dashboard() {

const [userName,setUserName]=useState("")

useEffect(()=>{
  if(sessionStorage.getItem('username')){
    setUserName(sessionStorage.getItem('username'))
  }else{
    setUserName('')
  }
},[])
  return (
    <>
      <Header insideDashboard/>

      <div style={{height:'90vh',width:'100%'}}>

        <Row>
          <Col sm={12} md={8}>
          <h1 className='mt-3'>Welcome <span className='text-warning fw-bolder'>{userName}</span></h1>
          <Myprojects/>
          </Col>

          <Col sm={12} md={4}>
          <Profile/>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Dashboard
