import React from 'react'
import styles from '../css/usersidenav.module.css'
import { Link } from 'react-router'
import permission from '../../utils/permission'
function UsersideNav() {
  const roles = localStorage.getItem('roles')
  console.log(roles)
  return (
    <div className={`${styles.container}`}>
        <li><Link to='/profile' style={{ textDecoration: 'none' }} className='Authlinks'>Profile</Link></li>
        <hr />
       {roles && permission.clinicdetails.includes(roles) && <li><Link to='/clinic' style={{ textDecoration: 'none'}} className='Authlinks'>Clinic Details</Link></li>}
    </div>
  )
}

export default UsersideNav