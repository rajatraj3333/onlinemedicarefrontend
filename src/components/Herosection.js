import React from 'react'
import './css/hero.css'
import {Navbarlist} from  './Navbar'
import { Link } from 'react-router'
function Herosection() {
  return (
<>
<Navbarlist/>

<div className='herosection'>
        <div className='hero-heading'>
          <span className='heading-text'>Finding Doctor for checkup</span>
          <span className='heading-text'>
            Book Appointment  now</span>
         <Link to='bookings'>
           <button id='bkbtn'>Book Now</button>
         </Link> 
        </div>
    </div>
</>
  )
}

export default Herosection