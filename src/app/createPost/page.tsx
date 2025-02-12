"use client";
import React , {useState} from 'react'
import Tiptap from './Editor';
const page = () => {
  const [value, setValue] = useState('');
  return (
    <div>
      <div className='mt-20 flex justify-center align-centre'>
      {/* <Tiptap/> */}
      </div>
    </div>
  )
}

export default page
