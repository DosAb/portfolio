import React from 'react'
import { images } from '../../static/index'
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
            {/* <a href="#!"><img src={images.linkedin} alt="linkedin" /></a> */}
            <a href="https://t.me/dossab"><img src={images.telegram} alt="telegram" /></a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact