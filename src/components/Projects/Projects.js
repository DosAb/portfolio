import React from 'react'
import './Projects.scss'
import { images } from '../../static/index'

function Projects() {
  return (
    <div className='app__projects' id='projects'>
      <h1>PROJECTS</h1>
      <div className='projects-container'>
      <div className='project'>
            <div className='project-content'>
                <span>(01)</span><a href='https://project-retro.vercel.app' className='retro-title'>RETRO</a>
            </div>
        </div>
        <div className='project'>
            <div className='project-content'>
                <span>(02)</span><a href='https://ecommerce-app-livid.vercel.app' className='ecomerce-title'>HEADPHONES SHOP</a>
            </div>
        </div>
        <div className='project'>
            <div className='project-content'>
                <span>(03)</span><a href='https://project-katana.vercel.app' className='katana-title'>KATANA</a>
            </div>
        </div>

        <div className='project-image katana-image'><img src={images.katana} alt="katana" /></div>
        <div className='project-image retro-image'><img src={images.retro} alt="retro" /></div>
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

  container.addEventListener('mousemove', (event) =>{
    mouseX = (((event.clientX) / window.innerWidth)) * 100
    mouseY = (((event.clientY)) / window.innerHeight) * 100
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
    if(event.target.className === 'ecomerce-title'){
      image[2].style.opacity = '1'
    }else{
      image[2].style.opacity = '0'
    }
    image.forEach((item)=>{
      item.style.left = `${mouseX}%`
      item.style.top = `${mouseY}%`
    })
  })
}

window.addEventListener("load", onload)