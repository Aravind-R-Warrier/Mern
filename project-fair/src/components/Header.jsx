import React, { useContext } from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router'
import { tokenAuthContext } from '../contextApi/TokenAuth'



function Header({insideDashboard}) {
    const{isAuthorised,setIsAuthorised}=useContext(tokenAuthContext)
  const navigate=useNavigate()
  const handelLogOut=()=>{
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('token')
    setIsAuthorised(false)
    navigate('/')
  }

  return (
    <div>
      <Container>
        <Navbar expand="lg" className="bg-body-info shadow">
          <Container>
            <Navbar.Brand >
              <Link to={'/'} style={{textDecoration:'none',color:'white'}}>
              <i className='fa-solid fa-list-check me-2'></i>
              Project Fair
              </Link>
            </Navbar.Brand>
            {insideDashboard&&<button onClick={handelLogOut} className='btn btn-warning rounded'>Logout</button>}
          </Container>
        </Navbar>
      </Container>
    </div>
  )
}

export default Header
