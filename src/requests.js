import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'

const baseURL = 'http://localhost:3001'

const loginRequest = async (address) => 
{
   const response = await axios.post(`${baseURL}/users`, {
       "userAcc" : address,
       "groupId" : "1",
       "scheme" : '5'
   } )
   return response.data
}

export default loginRequest

