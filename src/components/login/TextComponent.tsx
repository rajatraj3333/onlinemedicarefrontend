
import React from 'react'
import { Link } from 'react-router'

function TextComponent(){
  return (
    
     <div className="footer">
        <span>Don't have Account?</span>
        <a href="/register" className="create">
          Create now
        </a>
        <span className=" create forgetpass">
          <Link to={"/forgetpassword"}>Forget Password</Link>
        </span>
      </div>
  )
}

export default TextComponent