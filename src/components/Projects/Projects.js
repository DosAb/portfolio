import React, { useState } from 'react'
import './Projects.scss'
import { images } from '../../static/index'
import { motion } from 'framer-motion'

function Projects() {
  return (
    <div className='app__projects' id='projects'>
      <h1>PROJECTS</h1>
      <div className='projects-container'>
        <div className='project'>
            <div className='project-content'>
                <span>(01)</span><a href='' className='katana-title'>KATANA</a>
            </div>
        </div>
        <div className='project'>
            <div className='project-content'>
                <span>(02)</span><a href='https://ecommerce-app-livid.vercel.app' className='ecomerce-title'>HEADPHONES SHOP</a>
            </div>
        </div>
        <div className='project'>
            <div className='project-content'>
                <span>(04)</span><a href='' className='retro-title'>RETRO</a>
            </div>
        </div>
        <div className='project'>
            <div className='project-content'>
                <span>(05)</span><a href='' className='shoe-title'>SHOE</a>
            </div>
        </div>

        <div className='project-image katana-image'><img src={images.katana} alt="katana" /></div>
        <div className='project-image retro-image'><img src={images.retro} alt="retro" /></div>
        <div className='project-image shoe-image'><img src={images.shoe} alt="shoe" /></div>
        <div className='project-image ecomerce-image'><img src={images.ecomerce} alt="ecomerce" /></div>
      </div>
    </div>
  )
}

export default Projects

const onload = ()=>{
  const image = document.querySelectorAll('.project-image')
  const container = document.querySelector('.projects-container')
  let mouseX = 0
  let mouseY = 0
  let inContainer

  window.addEventListener('mousemove', (event) =>{
    mouseX = (((event.clientX) / window.innerWidth)) * 100
    mouseY = (((event.clientY)) / window.innerHeight) * 100
    // inContainer = 
    
    // console.log(event);

    if(event.target.className === 'katana-title'){
      // console.log(event.target.parentElement);
      image[0].style.opacity = '1'
    }else{
      image[0].style.opacity = '0'
    }

    if(event.target.className === 'retro-title'){
      image[1].style.opacity = '1'
    }else{
      image[1].style.opacity = '0'
    }

    if(event.target.className === 'shoe-title'){
      image[2].style.opacity = '1'
    }else{
      image[2].style.opacity = '0'
    }

    if(event.target.className === 'ecomerce-title'){
      image[3].style.opacity = '1'
    }else{
      image[3].style.opacity = '0'
    }

    image.forEach((item)=>{
      item.style.left = `${mouseX}%`
      item.style.top = `${mouseY}%`
    })
  })

}

window.addEventListener("load", onload)