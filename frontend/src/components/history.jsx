import React, { useEffect, useState } from 'react'
import HistoryTable from './historyTable'
import HistoryCard from './historyCard'
import { getHistory } from '../apis'
import { createStructuredSelector } from 'reselect'
import { setMessage, setVisible } from '../redux/alert/alert.action'
import { selectuserToken } from '../redux/user/user.selector'
import LoadSpinner from './loadspinner'
import { connect } from 'react-redux'

const History=({usertoken,setAlertMessage,setAlertVisible})=> {
    const [loading,setLoading]=useState(false)
    const [history,setHistory]=useState([{date:Date("13/10/2023"),imageUrl:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Stairs_with_weed.jpg/1200px-Stairs_with_weed.jpg",output:"No weeds found No weeds found No weeds found No weeds found No weeds found No weeds found No weeds found No weeds found"}])
    useEffect(()=>{
      setLoading(true)
      getHistory(usertoken).then((json)=>{
        if(json.networkerror){
          setAlertMessage({msg:"Can't get history , Network Error",type:"error"})
          setAlertVisible(true)
        }else{
          setHistory(json.history)
        }
        setLoading(false)
      }).catch(err=>{
        setAlertMessage({msg:"Can't get history , Network Error",type:"error"})
        setAlertVisible(true)
        setLoading(false)
      })
    },[])
  return (
    <>
    <div className='text-3xl text-center text-blue-500 my-4'>Your Past Searches</div><hr className='h-3 border-y-blue-950'/>
    <LoadSpinner loading={loading}/>
    <div>
      <HistoryTable items={history}/>
      {
        history.map(e=>{
            return <div className='flex justify-around'><HistoryCard date={e.date} imageUrl={e.imageUrl} output={e.output}/></div>
        })
      }
    </div>
    </>
  )
}

const mapStateToProps=createStructuredSelector({
  usertoken:selectuserToken,


})

const mapDispatchToProps=(dispatch)=>({

  setAlertMessage:(obj)=>dispatch(setMessage(obj)),

  setAlertVisible:(bool)=>dispatch(setVisible(bool))


})

export default connect(mapStateToProps,mapDispatchToProps)(History)