import React, { useEffect } from 'react'
import UploadImage from './UploadImage'
import Output from './output'
import { createStructuredSelector } from 'reselect'
import { selectuserToken } from '../redux/user/user.selector'
import { setMessage, setVisible } from '../redux/alert/alert.action'
import { connect } from 'react-redux'
// import { connect } from 'mongoose'
// import { Home } from '@mui/icons-material'

const Home=({usertoken,setMessage,setAlertVisible})=> {
  useEffect(()=>{
    if(!usertoken){
      setMessage({msg:"Your history will not be saved as you are not logged in",type:"warning"})
      setAlertVisible(true)
    }
  })
  return (
    <div className='md:flex md:justify-around mt-2 px-2'>
      <UploadImage/>
      <Output/>
    </div>
  )
}

const mapStateToProps=createStructuredSelector({
  usertoken:selectuserToken,
})

const mapDispatchToProps=(dispatch)=>({
  setMessage:(obj)=>dispatch(setMessage(obj)),
  setAlertVisible:(bool)=>dispatch(setVisible(bool))


})

export default connect(mapStateToProps,mapDispatchToProps)(Home)