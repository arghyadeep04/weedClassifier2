import React, { useEffect, useState } from 'react'

export default function NavigateTopButton() {
    const [visible,setIsVisible]=useState(false)
    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        });
     }, []);
    const handleClick=()=>{
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    }
  return (
    <div>
        <button className={`fixed top-[90vh]  p-3 bg-blue-500 rounded-full ${(visible)?"visible":"invisible"} opacity-20 hover:opacity-80`} onClick={handleClick}>
            <i class="fa-solid fa-arrow-up"></i></button>
    </div>
  )
}
