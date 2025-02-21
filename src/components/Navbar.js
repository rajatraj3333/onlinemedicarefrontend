import React,{useState} from 'react'
import './css/navbar.css'
import Availabilitycheck from './Availabilitycheck'
import { Link } from 'react-router'

export function Navbarlist (){

 const [checkavailbility,setcheckAvailbility]=useState(false)
  function onCheck(){
    const isOpen = document.getElementsByClassName('nav-menu')[0].classList.contains('open')
    const navclose = document.getElementsByClassName('nav-menu')[0]

    if(isOpen){
      navclose.classList.toggle('open')

     
 }
 else {
  navclose.setAttribute('class','nav-menu open')

 }
  }
  
  const closed = ()=> {
    return true;
  };
  return (
<>
<Availabilitycheck open={checkavailbility} onClose={setcheckAvailbility}/>
<div className='nav-menu-open' onClick={onCheck}>
<i class="ri-menu-line" ></i>

</div>
<div className='nav-menu'>
<div className='logo'></div>
<ul>

<i class="ri-close-line" onClick={onCheck}></i>
    <li>
      <Link to='/bookings'><button className='btn'>Book An Appointment </button></Link>
     </li>
    <li onClick={()=>setcheckAvailbility(!checkavailbility)}>Check Availability</li>
    <li>Services</li>
    <li>About us</li>
</ul>
 </div>
</>
  )
}

export function Navbar() {

    function openMenu(){
        const openmenu = document.getElementsByClassName('nav-menu');
        const icons = document.querySelector('i')
  
        openmenu[0].classList.toggle('open')
        const isOpen = openmenu[0].classList.contains('open')
        icons.setAttribute('class',isOpen?"ri-close-line":"ri-menu-line")
      }

  return (
 <div className='navbar'>
 <link
    href="https://cdn.jsdelivr.net/npm/remixicon@4.3.0/fonts/remixicon.css"
    rel="stylesheet"
/>
 <div className='logo' onClick={openMenu}>
 <Navbarlist/>
 </div>

 </div>

  )
}
