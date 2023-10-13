import React from 'react'
import UploadImage from './UploadImage'
import Output from './output'

export default function Home() {
  return (
    <div className='md:flex md:justify-around  px-2'>
      <UploadImage/>
      <Output/>
    </div>
  )
}
