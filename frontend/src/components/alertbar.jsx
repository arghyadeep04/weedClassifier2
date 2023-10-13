import { Alert } from '@mui/material'
import React from 'react'
import { selectAlertMessage, selectAlertVisible } from '../redux/alert/alert.selector'
import { setVisible } from '../redux/alert/alert.action'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

const AlertBar=({message,visible,setVisible})=> {
  return (
    <div className={`${visible?"visible":"invisible"}`}>
            <Alert severity={message.type} onClose={()=>{setVisible(false)}}>{message.msg}</Alert>
    </div>
  )
}


const mapStateToProps=createStructuredSelector({
    message:selectAlertMessage,
    visible:selectAlertVisible
  
  })
  
  const mapDispatchToProps=(dispatch)=>({
    setVisible:(vis)=>dispatch(setVisible(vis)),

  
  })
  

  export default connect(mapStateToProps,mapDispatchToProps)(AlertBar)