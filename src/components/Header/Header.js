import React from 'react'
import './Header.scss'
// import { images } from '../../static/index'
import { motion } from 'framer-motion'

function Header() {
  return (
    <motion.div id='home' className='app__header' whileInView={{opacity: [0, 1], x: [-100, 0]}} transition={{duration: .8, type: 'tween'}}>
        <div className="app__header-title">
            <h3>creative</h3>
            <h1 className='app__header-first'>DESIGNER <span>&</span></h1>
            <h1 className='app__header-second'>DEVELOPER</h1>
        </div>
    </motion.div>
  )
}

export default Header
