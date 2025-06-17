import styles from './css/usersidenav.module.css'
import { Link } from 'react-router'
function UsersideNav() {
  return (
    <div className={`${styles.container}`}>
        <li><Link to='/profile' style={{ textDecoration: 'none', color: '#333' }}>Profile</Link></li>
        <hr />
        <li><Link to='/clinic' style={{ textDecoration: 'none', color: '#333' }}>Clinic Details</Link></li>
    </div>
  )
}

export default UsersideNav