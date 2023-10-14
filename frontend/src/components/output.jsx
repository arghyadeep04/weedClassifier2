import React from 'react'
import LoadSpinner from './loadspinner'
import { selectOutput, selectOutputLoading } from '../redux/output/output.selector'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

const Output=({output,outputloading})=> {
  return (
    <div className='border-[2px] border-blue-400 p-3 rounded-2xl bg-blue-700'>
    <h1 className='text-white mt-5 text-3xl font-bold mb-3 bg-orange-600 p-3 rounded-full'>Output : </h1><br />
        <LoadSpinner loading={outputloading}/>
    <div className='flex justify-around mt-16'>
      <div className='w-[85vw] h-[40vh] md:w-[50vw] border-[4px] rounded-xl border-green-500 flex justify-around'>
        {
            output?
            <span className='text-lg text-white m-3'>{output}</span>:
            <span className='text-lg text-white m-3'>No output to show</span>
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

