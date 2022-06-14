import React, { useState } from 'react'
import { images } from '../../static/index'
import { motion } from 'framer-motion'
import './Contact.scss'
// import './contactThree'

function Contact() {
  return (
    <div className="app__contact-wrapper">
      <canvas className='app__contact-canvas'></canvas>
      <div className='app__contact' id='contact'>
        <div className='app__contact-footer'>
          <h3>+7-900-093-1479</h3>
          <h3>aiboldosonov@gmail.com</h3>
          <div className='contact-logo'>
            <a href="https://github.com/DosAb"><img src={images.github} alt="github" /></a>
            <a href="#!"><img src={images.linkedin} alt="linkedin" /></a>
            {/* <a href="#!"><img src={images.twitter} alt="twitter" /></a> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact