import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='navbar w-[65%] h-14 mx-auto text-white flex flex-row px-4 bg-zinc-800 rounded-b-lg'>
      <div className="left w-[40%] flex flex-row justify-start items-center pl-3">
        <p className='text-2xl font-extrabold'>Notes</p>
      </div>
      <div className="right w-[60%] flex flex-row justify-end items-center gap-5 ">
        <NavLink  
        to="/"
        style={({ isActive, isPending, isTransitioning }) => {
          return {
            fontWeight: isActive ? "bold" : "",
            color: isActive ? "blue" : "White",
            viewTransitionName: isTransitioning ? "slide" : "",
          };
        }}
        >
          Home
        </NavLink>

        <NavLink
        to="/files"
        style={({ isActive, isPending, isTransitioning }) => {
          return {
            fontWeight: isActive ? "bold" : "",
            color: isActive ? "Blue" : "white",
            viewTransitionName: isTransitioning ? "slide" : "",
          };
        }}
        >
          Notes
        </NavLink>
      </div>
    </div>
  )
}

export default Navbar
