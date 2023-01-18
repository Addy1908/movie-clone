import React from 'react'
import logo from '../images/logo.PNG'
import '../css/style.css'
import { Link } from 'react-router-dom'
export default function Navbar() {
  return (
    <>
        <div className="navbar bg-teal-50	">
        <nav id="navbar">
          {/* for logo */}
          <div id="logo">
            <img className="w-[50px] md:w-[60px]" src={logo} alt="" />
          </div>

          
          <ul>

          
            <li className="list">
           
           <Link to="/"><a href=" #">Movies</a></Link> 
  

             
            </li>

            <li className="list">
            <Link to="favourites"> <a href=" #">Favourites</a></Link> 
  
            </li>
           
           
          </ul>
        </nav>
      </div>

       </>
  )
}
// here md:property defines the media query for responsiveness  md means the screen size varies from medium to large
// media queries works firstly for mobile screen then goes to big screen(laptop,desktop)
