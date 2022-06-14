import React from 'react'
import { motion } from 'framer-motion'
import './About.scss'

function About() {
  return (
    <motion.div className='app__about' id='about' whileInView={{opacity: [0, 1], y: [50, 0]}} transition={{duration: .8, type: 'tween'}}>
        <h1 className="app__about-title">ABOUT ME</h1>
        <div className="app__about-container">
          <div>
            <p className='app__about-container-p'>I'm creative web developer and desiner, i specialize in 3D. I love abstract and sci-fi design , and love to create new amazing projects, always ready to work and learn more.</p>
          </div>
            <button href='#contact' className="contact-btn">CONTACT ME</button>
        </div>
        <div className="app__about-skils">
          <h1>SKILLS</h1>
          <div className="marquee-container">
            <div className='marquee-title'>
              <p> JS | REACT | FIGMA | SPLINE | 3D DEVELOPMENT | CREATIVE DESIGN | THREE.JS | BLENDER | GLSL |</p>
            </div>
            <div className='marquee-title  marquee-title2'>
              <p> JS | REACT | FIGMA | SPLINE | 3D DEVELOPMENT | CREATIVE DESIGN | THREE.JS | BLENDER | GLSL |</p>
            </div>
          </div>
        </div>
    </motion.div>
  )
}

export default About
