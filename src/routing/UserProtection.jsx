import React from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'

function UserProtection() {

  const { isUserAuth } = useSelector((state) => state.user)
  const navigate = useNavigate()

  return isUserAuth ? <Outlet/> : navigate("/login")
}

export default UserProtection
