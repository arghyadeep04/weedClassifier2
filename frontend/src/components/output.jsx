import React from 'react'
import LoadSpinner from './loadspinner'
import { selectOutput, selectOutputLoading } from '../redux/output/output.selector'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

const Output=({output,outputloading})=> {
  return (
    <div>
    <h1 className='text-blue-800 mt-8 text-2xl mb-3'>Output : </h1><br />
        <LoadSpinner loading={output}/>
    <div className='flex justify-around mt-7'>
      <div className='w-[85vw] h-[40vh] md:w-[50vw] border-[2px] rounded-xl border-blue-800'>
        {
            output?
            <span className='text-lg text-blue-600'>{output}</span>:
            <span className='text-lg text-blue-600'>No output to show</span>
        }
      </div>
    </div></div>
  )
}

const mapStateToProps=createStructuredSelector({
    output:selectOutput,
    outputloading:selectOutputLoading
  
  })
  
//   const mapDispatchToProps=(dispatch)=>({
//     setUserToken:(token)=>dispatch(setuserToken(token)),
//     setMessage:(obj)=>dispatch(setMessage(obj)),
//     setHistory:(arr)=>dispatch(setHistory(arr)),
//     setAlertVisible:(bool)=>dispatch(setVisible(bool))
  
  
//   })
  
export default connect(mapStateToProps)(Output)

