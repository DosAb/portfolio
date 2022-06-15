import React, { useState } from 'react'
import './Navbar.scss'
import { images } from '../../static/index'
import { motion } from 'framer-motion'
import '../../three'

function Navbar() {
  const [toggle, setToggle] = useState(false)

  const sections = ["home", 'works', 'projects', "about", 'contact']

  return (
    <div className='app__navbar'>
        <div>
            <img src={images.logo} alt="logo" />
        </div>
        <div className='app__navbar-links'>
          {sections.map((item)=>(
            <a key={`#${item}`} href={`#${item}`}>{item}</a>
          ))}
        </div>
        <div className='app__navbar-menu'>
            <button className='app__navbar-open' onClick={()=>setToggle(true)}>
                <div />
            </button>
            {toggle &&(
              <motion.div
                whileInView={{x: [150, 0]}} 
                transition={{duration: 0.82, ease:'easeInOut'}}
                className='app__navbar-sidebar'
              >
                <button onClick={()=>setToggle(false)} className='app__navbar-close'><div className='app__navbar-close-first' /> <div className='app__navbar-close-second' /></button>
                <div>
                  {sections.map((item)=>(
                    <a key={`#${item}`} href={`#${item}`} onClick={()=>setToggle(false)} >{item}</a>
                  ))}
                </div>
              </motion.div>
            )}
        </div>
    </div>
  )
}

export default Navbar