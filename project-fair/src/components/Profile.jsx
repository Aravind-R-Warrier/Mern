import React, { useState } from 'react'
import { Collapse } from 'react-bootstrap';

function Profile() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div style={{marginTop:'50px'}}>
        <div className="card mt-5 p-4 me-2">
          <div className="d-flex justify-content-between">
            <h1 style={{color:'black'}}>profile</h1>
            <button className='btn btn-outline-info'  onClick={() => setOpen(!open)}><i class="fa-solid fa-angle-down"></i></button>
          </div>

         <Collapse in={open}>
         <div className="row justify-content-center p-5">
          <label>
                <input type="file" style={{ display: 'none' }} />
                <img style={{ height: '200px', width: '70%' }} src="https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg" alt="" />
              </label>
              <div className="mt-5">
                <input type="text" placeholder='GitHub-Link' className='form-control'/>
                <br />
                <input type="text" placeholder='Linkidin-Link' className='form-control'/>
                <div className="d-grid mt-4">
                  <button className='text-success fw-bolder'>Update</button>
                </div>
              </div>
          </div>
         </Collapse>
        </div>
      </div>
    </>
  )
}

export default Profile
