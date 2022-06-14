import React, { useState } from 'react'
import './Works.scss'
import { images } from '../../static/index'
import { motion } from 'framer-motion'

const gifAraay = [
  {img: images.donut, name: 'donut'},
  {img: images.whale, name: 'whale'},
  {img: images.dest, name: 'virus'},
  {img: images.building, name: 'Sci-Fi'},
  {img: images.galaxy, name: 'galaxy'},
  {img: images.sea, name: 'sea'},
]

function Works() {
  return (
    <div className='app__works' id='works'>
      <div className='app__works-title'>
        <h1 className='works-title'>WORKS</h1>
      </div>
      <motion.div
      className="app__works-container"
      whileInView={{opacity: [0, 1], y: [80, 0]}}
      transition={{duration: .8, type: 'tween'}}
      >
        {gifAraay.map((gif)=>(
          <div className='app__works-container-gif' key={gif.name}>
            <img src={gif.img} alt="works" />
            <div className='app__works-gif-description'>
              <h2>{gif.name}</h2>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}

export default Works