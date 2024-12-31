import { MDBFooter } from 'mdb-react-ui-kit'
import React from 'react'


function Footer() {
  return (
    <div>
     <MDBFooter  bgColor='light'style={{marginTop:'280px'}} className=' fixed-bottom  text-center text-lg-left'>
      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        &copy; {new Date().getFullYear()} Copyright:{' '}
        <a className='text-dark' href='https://mdbootstrap.com/'>
          MDBootstrap.com
        </a>
      </div>
    </MDBFooter>
    </div>
  )
}

export default Footer
